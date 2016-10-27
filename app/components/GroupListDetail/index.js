import React, { Component } from 'react';
import { StyleSheet, View, Platform, Dimensions, ListView, ScrollView, RefreshControl, TouchableHighlight, } from 'react-native';
import { Button, Text, SearchBar, List, ListItem } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import styles from '../Styles/shared';
import layoutStyles from '../Styles/layout';
import colorStyles from '../Styles/colors';
import LoadingView from '../LoadingIndicator/LoadingView';
import { onLayoutUpdate, setLayoutHandler } from '../../util/dimension';
import EmptyDisplay from '../EmptyDisplay';
import ConfirmModal from './ConfirmModal';
import MenuBar, { ActionBar, } from '../MenuBar';
import Icons from '../Icons';
import moment from 'moment';
import numeral from 'numeral';
import capitalize from 'capitalize';
import pluralize from 'pluralize';
import debounce from 'debounce';
import { request, } from '../../util/request';
import querystring from 'querystring';
import * as Animatable from 'react-native-animatable';

const GROUP_LIST_MASTER_WIDTH = 350;

function getScenePath(groupName, context) {
  return context.props.GroupListDetail.baseURL+(context.props.GroupListDetail.entities[ groupName ].path || '/' + groupName).toLowerCase();
}

function getDataSource() {
  return new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    // sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
  });
}

function getBlankDefaultHeader() {
  return {
    title: 'n/a',
    createdat: new Date(),
    primaryasset: {
      fileurl:'https://facebook.github.io/react/img/logo_og.png',
    },
  };
}

function getListStateFromProps(props) {
  // console.log('getListStateFromProps', { props });
  let ds = getDataSource();
  let returnProps = {
    pages: props.pages || 1,
    rows: ds.cloneWithRows(Object.assign([], props.rows)),
    rowscount: (props.rows) ? props.rows.length : 0,
    totalcount: props.totalcount || (props.rows) ? props.rows.length : 0,
    selectedGroup: props.selectedGroup,
  };
  if (typeof props.dataError !== 'undefined') {
    returnProps.dataError = props.dataError;
    returnProps.dataLoaded = props.dataLoaded;
    returnProps.dataTimestamp = props.dataTimestamp;

  }
  return returnProps;
}

function getInitialListStateFromProps(props) {
  // console.log('getInitialListStateFromProps', { props });
  return Object.assign({
    isRefreshing: false,
    dataError: false,
    dataLoaded: false,
  }, 
  getListStateFromProps(props));
}

function getDefaultRenderRowData(data) {
  let rowData = Object.assign({}, getBlankDefaultHeader(), data);
  return {
    content: Object.assign({
      key: rowData._id,
      title: rowData.title,
      subtitle: moment(rowData.createdat).format('llll'),
    }, rowData),
    action: {
      icon: {
        name:'ios-arrow-forward',
      },
    },
    image: {
      uri: rowData.primaryasset.fileurl,
    },
  };
}

function getRefreshData() {
  this.setState({ isRefreshing: true, });
  this.props.getGroupListDetailFunctions.getListData()
    .then(() => { 
      this.setState({ isRefreshing: false, });
    })
    .catch(() => { 
      this.setState({ isRefreshing: false, });
    });

  // setTimeout(() => {
  //   console.log('now refreshing!');
  //   this.setState({
  //     // loaded: this.state.loaded + 10,
  //     isRefreshing: false,
  //     // rowData: rowData,
  //   });
  // }, 1000);
}

function getDataForLists(config, options = {}) {
  // console.log('getDataForLists CALLDED this.props',this.props,'this.state',this.state,{config})
  let stateData = {
    dataError: false,
    dataLoaded: false,
    dataTimestamp: new Date(),
  };
  let stateDataProp = {
    isRefreshing: false,
  };
  let selectedGroupListProp = this.props[ config.componentPropsName ].entities[ this.state.GroupListDetailStateData.selectedGroup ];
  let querystringPrefix = (selectedGroupListProp.list.fetchUrl.indexOf('?')!==-1) ? '&' : '?';
  let queryString = querystringPrefix+querystring.stringify(Object.assign({}, options.query, {
    format: 'json',
  }));
  // request(this.props.GroupListDetail.list.fetchUrl, {
  // console.log('selectedGroupListProp.list.fetchUrl+queryString',selectedGroupListProp.list.fetchUrl+queryString)
  return new Promise((resolve, reject) => {
    request(selectedGroupListProp.list.fetchUrl+queryString, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.user.jwt_token,
      },
    })
    .then(responseData => {
      // console.log({responseData},'config.componentDataName',config.componentDataName,'selectedGroupListProp[config.componentDataName]',selectedGroupListProp[config.componentDataName])
      stateData.isRefreshing = false;
      stateData.dataLoaded = true;
      stateData.dataError = false;
      stateData.pages = responseData[ selectedGroupListProp[config.componentDataName].listProps.pagesProp ];
      stateData.rows = responseData[ selectedGroupListProp[config.componentDataName].listProps.dataProp ];
      stateData.totalcount = responseData[ selectedGroupListProp[config.componentDataName].listProps.countProp ];
      // stateData  
      stateData.selectedGroup = this.state.GroupListDetailStateData.selectedGroup;
      stateDataProp[ config.componentStateDataName ] = stateData;
      
      this.setState({
        GroupListDetailStateData: Object.assign(this.state.GroupListDetailStateData, stateDataProp),
      });
      resolve(responseData);
    })
    .catch(error => {
      // console.log({error})
      stateData.isRefreshing = false;
      stateData.dataLoaded = true;
      stateData.dataError = error;
      stateData.selectedGroup = this.state.GroupListDetailStateData.selectedGroup;
      stateDataProp[config.componentStateDataName] = stateData;

      this.setState({
        GroupListDetailStateData: Object.assign(this.state.GroupListDetailStateData, stateDataProp),
      });
      reject(error);
      this.props.handleErrorNotification({ message:'Could not update '+pluralize(stateData.selectedGroup)+'. '+error, }, error);

    });
  });
}

function getDetailState(context, nextProps) {
  // console.log('getDetailState', { nextProps, });
  let passProps = {
    GroupListDetailStateData: Object.assign({},
      nextProps.GroupListDetailStateData, { detailData: {}, }),
  };
  // console.log('goBackToExtension',{passProps})
  return Object.assign({},
    nextProps.GroupListDetailStateData.detailData, {
      goBackToExtension: nextProps.onChangeExtension.bind(context, '/pipelines', {
        passProps,
        config: {
          transitionDirection: 'left',
        },
      }),
    });
}

class Group extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillReceiveProps(nextProps) {
    const { width, } = Dimensions.get('window');
    const MAX_CONTAINER_WIDTH = (this.props.getGroupListDetailFunctions.useSingleViewHelpers())?width:GROUP_LIST_MASTER_WIDTH;
    // console.log('GROUP componentWillReceiveProps this.state.GroupListDetailStateData',this.state.GroupListDetailStateData, { propsGroupListStateData:nextProps.GroupListDetailStateData },'this.refs',this.refs);
    this.setState({
      GroupListDetail: nextProps.GroupListDetail,
      GroupListDetailStateData: nextProps.GroupListDetailStateData,
    });
    if (nextProps.GroupListDetailStateData.showGroupSidebar && this.refs.sidebarGroupView.props.style.left!==0) {
      this.refs.sidebarGroupView.transitionTo({ left: 0, }, 300, 'ease-out');
    } else if (nextProps.GroupListDetailStateData.showGroupSidebar===false && this.refs.sidebarGroupView.props.style.left!==(-1*MAX_CONTAINER_WIDTH)) {
      this.refs.sidebarGroupView.transitionTo({ left: (-1*MAX_CONTAINER_WIDTH), }, 300, 'ease-in');
    }
  }
  render() {
    const { width, } = Dimensions.get('window');
    const MAX_CONTAINER_WIDTH = (this.props.getGroupListDetailFunctions.useSingleViewHelpers())?width:GROUP_LIST_MASTER_WIDTH;
    // console.log('Group props', this.props);
    let loadingView = (<LoadingView/>);
    let emptyView = (<LoadingView/>);
    let errorView = (<LoadingView/>);
    let groupMenuBarProps = {
      title: this.props.GroupListDetail.groupTitle,
    };
    let loadedDataView = (
      <Animatable.View ref="sidebarGroupView" style={[ styles.scrollViewStandardContainer, layoutStyles.menuBarSpaceAndBorder, {
        width: MAX_CONTAINER_WIDTH,
        borderRightWidth:1,
        borderRightColor: 'lightgray',
        position: 'absolute',
        // left:0,
        left: (this.props.GroupListDetailStateData.showGroupSidebar)?0:(-1*MAX_CONTAINER_WIDTH),
        top: 0,
        bottom: 0,
        zIndex: 90,
        backgroundColor:'whitesmoke',
      },
        ]}  >
        <MenuBar {...groupMenuBarProps} />
        <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={styles.scrollViewStandardContentContainer} >
          {this.getGroups()}
        </ScrollView>
      </Animatable.View>
    );  
    return loadedDataView;     
  }
  getGroups() {
    return (<List style={{
      backgroundColor: 'white',
      marginTop: 20,
      marginBottom: 20,
    }}>
      {Object.keys(this.props.GroupListDetail.entities).map((group, i) => { 
        return (<ListItem
          title={group}
          key={i}
          onPress={() => {
            this.props.onChangeExtension(getScenePath(group, this), { skipSceneChange: true, });
            // this.props.getGroupListDetailFunctions.setSelectedGroup(group);
            this.props.getGroupListDetailFunctions.showGroupSidebar(false,group);
            // console.log('pressed group', group);
          } }
          />);
      })}
    </List>);
  }
}

class GroupList extends Component{
  constructor(props) {
    super(props);
    // console.log('this.props.GroupListDetailStateData',this.props.GroupListDetailStateData)
    this.getRenderRowData = props.getRenderRowData || getDefaultRenderRowData;
    this.searchFunction = debounce(this.props.getGroupListDetailFunctions.getListData, 200);
    this.state = getInitialListStateFromProps(props.GroupListDetailStateData.listData);
  }
  componentWillReceiveProps(nextProps) {
    // console.log('GROUP LIST componentWillReceiveProps', { nextProps },'this.state',this.state);
    // console.log('GROUP LIST componentWillReceiveProps nextProps',nextProps,'this.state',this.state,'nextProps.GroupListDetail.list && this.state.rowscount < 0',Object.keys(nextProps.GroupListDetail.list).length>0 && this.state.rowscount <1 )
    let newProps = nextProps.GroupListDetailStateData.listData;
    if (typeof nextProps.GroupListDetail.list === 'object' && Object.keys(nextProps.GroupListDetail.list).length > 0 && this.state.rowscount < 1 && (nextProps.GroupListDetailStateData.listData && nextProps.GroupListDetailStateData.listData.dataLoaded !== true)) {
      // console.log('GROUP LIST DATA REQUESSSTTTTTT - NO DATA')
      this.props.getGroupListDetailFunctions.getListData();
    } else if (typeof nextProps.GroupListDetailStateData.listData ==='object' && nextProps.GroupListDetailStateData.listData.dataError === false && nextProps.GroupListDetailStateData.listData.dataLoaded === false ){ 
      // console.log('GROUP LIST DATA REQUESSSTTTTTT - DATA ERROR FALSE DATA LOADED FALSE')
      this.props.getGroupListDetailFunctions.getListData();
    } else if (nextProps.GroupListDetailStateData && typeof nextProps.GroupListDetailStateData.selectedGroup === 'string' && typeof this.state.selectedGroup === 'string' && nextProps.GroupListDetailStateData.selectedGroup !== this.state.selectedGroup && this.state.dataError === false && this.state.dataLoaded === true ) {
      // console.log('GROUP LIST HAS DIFFRENT SELECTED GROUP nextProps.GroupListDetailStateData.selectedGroup', nextProps.GroupListDetailStateData.selectedGroup, 'this.state.selectedGroup', this.state.selectedGroup)
      this.setState({
        dataError: false,
        dataLoaded: false,
      });
      this.props.getGroupListDetailFunctions.getListData();
    } else if (newProps.rows) {
      // console.log('GROUP LIST HAS NEW ROWS PROPS nextProps.GroupListDetailStateData.selectedGroup',nextProps.GroupListDetailStateData.selectedGroup, 'this.state.selectedGroup', this.state.selectedGroup)
      this.setState(getListStateFromProps(newProps));
    } else {
      // console.log('GROUP LIST NO STATE UPDATE OR DATA REQUEST')
    }
  }
  componentDidMount() {
    // console.log('GROUP LIST props',this.props)
    // if (this.props.GroupListDetail.list && this.state.rowscount < 1) {
    //   this.props.getGroupListDetailFunctions.getListData();
    // }
  }
  render() {
    // console.log('GroupList RENDER this.state', this.state);
    // console.log('GROUP LIST ReNDerRRRR this.state',this.state,'this.props',this.props)
    let loadingView = (<LoadingView/>);
    // let errorView = (<LoadingView/>);
    if (this.props.GroupListDetail.list) {
      let emptyView = (<EmptyDisplay message={'No ' + capitalize(pluralize(this.props.GroupListDetail.list.componentProps.title + ' found'))} />);
      let groupListMenuBar = this.props.GroupListDetail.list.menuBar;
      groupListMenuBar.leftItem = {
        textIcon: {
          icontype: 'Ionicons',
          name: 'ios-arrow-back-outline',
        },
        itemType: 'text',
        onPress: () => {
          this.props.getGroupListDetailFunctions.showGroupSidebar(true);
          // this.props.onChangeExtension(this.props.GroupListDetail.baseURL, { skipSceneChange: true, });
          console.log('show sidebar');
        },
        label: capitalize(pluralize(this.props.GroupListDetail.groupTitle)),
      };
      let actionBarProps = {
        menuBarContentWrapperStyle: {
          height: 40,
          paddingTop: 0,
          borderBottomWidth:0,
          borderTopWidth:1,
          borderTopColor: 'darkgray',
        },
        actions: [ {
          // itemType: 'text',
          // label:'filter',
          icon: {
            icontype: 'Ionicons',
            name: 'md-funnel', //ios-settings-outline
          },
          itemType: 'icon',
          title: `Filter ${capitalize(this.props.GroupListDetail.list.componentProps.entityName)}`,
          description: `filter new ${pluralize(this.props.GroupListDetail.list.componentProps.entityName)}`,
          type: 'modal',
          modalOptions: {
            component: emptyView,
            ref: `filter_${this.props.GroupListDetail.list.componentProps.entityName}_modal`,
            style: { /* margin: 30, width:500, */ },
          },
        }, {
          itemType: 'text',
          label: (this.state.dataTimestamp)? 'Updated '+moment(this.state.dataTimestamp).calendar():'Refresh data',
          onPress: getRefreshData.bind(this),
        }, {
          icon: {
            icontype: 'Ionicons',
            name: 'ios-create-outline', //ios-settings-outline
          },
          itemType: 'icon',
          title: `Create ${capitalize(this.props.GroupListDetail.list.componentProps.entityName)}`,
          description: `create new ${pluralize(this.props.GroupListDetail.list.componentProps.entityName)}`,
          type: 'modal',
          modalOptions: {
            component: this.props.GroupListDetail.list.componentProps.createModalComponent,
            ref:`create_${this.props.GroupListDetail.list.componentProps.entityName}_modal`,
            style: { /* margin: 30, width:500, */ },
          },
        }],
      };

      let useLoadingView = ((typeof this.props.GroupListDetailStateData.listData === 'object' && this.props.GroupListDetailStateData.listData.dataError === false && this.props.GroupListDetailStateData.listData.dataLoaded === false) || (this.state.dataLoaded === false && this.state.dataError === false));
      let webListFix = (Platform.OS === 'web') ? { display:'flex', paddingBottom:60, } : {};
      let loadedDataView = (
        <View class="scrollContainerViewFix" style={[ styles.scrollViewStandardContainer, layoutStyles.menuBarSpaceAndBorder, webListFix
        ]}  >
          <MenuBar {...groupListMenuBar} />
          <View class="scrollContainerViewFix" style={[ styles.stretchBox, (Platform.OS === 'web') ? [ styles.scrollViewStandardContainer, { paddingBottom: 60, flex: 1, }]:{}]}>
            <SearchBar
              lightTheme
              onChangeText={(data) => {
                this.searchFunction({ query: { search: data, }, });
              } }
              placeholder={'Search for '+pluralize(capitalize(this.props.GroupListDetail.list.componentProps.title))+'...'}
              inputStyle={{
                backgroundColor: 'white',
                borderBottomWidth: 0,
                borderTopWidth: 0,
              }}
              containerStyle={{ backgroundColor: 'darkgray', borderWidth: 0, }}/>
            {(useLoadingView) ? loadingView : null }
            {(!useLoadingView && this.state.rowscount < 1) ? emptyView : null }
            {(!useLoadingView && this.state.rowscount > 0) ? (
              <ListView
                style={[ styles.flexBox, ]}
                contentContainerStyle={[layoutStyles.positionRelative,  ]}
                enableEmptySections={true}
                dataSource={this.state.rows}
                renderRow={this.renderRow.bind(this, this.getRenderRowData) }
                initialListSize={(Platform.OS === 'web' && this.state.rowscount < 20) ? 100000000 : undefined}
                refreshControl={
                    <RefreshControl
                      refreshing={this.state.isRefreshing}
                      onRefresh={getRefreshData.bind(this)}
                      tintColor="slategrey"
                      title="Loading"
                      titleColor="slategrey"
                      colors={['lightslategray', ]}
                      progressBackgroundColor="lightsteelblue"
                    />
                  }>
                >
              </ListView>
            ) : null}
          </View>
            <ActionBar {...actionBarProps} {...this.props} />
        </View>
        );
   
      return loadedDataView;     
    } else {
      let emptyView = (
        <View class="scrollContainerViewFix" style={[ styles.scrollViewStandardContainer, layoutStyles.menuBarSpaceAndBorder,
        ]}  >
          <MenuBar />
          <EmptyDisplay message=" " />
        </View>);   
      return emptyView;
    }
  }
  renderRow(tranformFunction, data) {
    // console.log('groupList renderRow', { tranformFunction }, { data })
    let renderData = tranformFunction(data);
    // let { /*height,*/ width, } = Dimensions.get('window');
    // console.log('width-100', width-100 ,{width});
    return (
      <ListItem
        {...renderData.content}
        onPress={() => {
          // console.log('list item press func');
          this.props.getGroupListDetailFunctions.setDetailData({ detailData: data, renderData, });
        } }
        />
    );
  }
}

class GroupDetail extends Component{
  constructor(props) {
    super(props);
    this.state = getDetailState(this, this.props);
  }
  componentWillReceiveProps(nextProps) {
    let groupDetailOptions = getDetailState(this, nextProps);
    this.setState(groupDetailOptions);
    // console.log('nextProps.getGroupListDetailFunctions.useSingleViewHelpers()', nextProps.getGroupListDetailFunctions.useSingleViewHelpers());
  }
  render() {
    // console.log('GroupDetail RENDER this.props',this.props)
    // console.log('GroupDetail RENDER this.state',this.state)
    // let loadingView = (<LoadingView/>);
    let emptyMessage = (this.props.GroupListDetail.list) ? 'No '+capitalize(this.props.GroupListDetail.list.componentProps.title)+' selected' : ' ' ;
    let emptyView = (<EmptyDisplay message={emptyMessage}/>);
    // let errorView = (<LoadingView/>);
    // console.log({ CustomDetailComponent });

    if (this.props.GroupListDetail.detail && this.props.GroupListDetail.detail.detailComponent && this.state.detailData && this.props.GroupListDetailStateData.detailData!==false){
      let CustomDetailComponent = this.props.GroupListDetail.detail.detailComponent;
      return <CustomDetailComponent {...this.state} {...this.props}/>;     
    } else {
      return emptyView;     
    }
  }
}

function closeModal(name) {
  this.refs[ name ].close();
}

function generateModals(actions, props) {
  // console.log('generateModals', { actions, props });
  let { width, height, } = Dimensions.get('window');
  // console.log('Dimensions',{ width, height, })
  let modals = actions.map((action, i) => {
    let modalOptions = Object.assign({
      style:{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        // margin: 10,
        // marginRight:20,
      },
      backdrop:true,
      position: 'top',
      key:i,
      ref: `modal_generate_modal_${i}`,
      component: false,
      passProps: {},
    }, action.modalOptions);

    modalOptions.passProps = Object.assign({}, props, modalOptions.passProps, {
      closeExtensionModal: closeModal.bind(this, modalOptions.ref),
    });

    modalOptions.style = Object.assign({
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      width: (width >600)? (width-200):(width-30),
      marginTop: (height >700)? 50:20,
    }, modalOptions.style);    
    
    let ModalOptionComponent = modalOptions.component;
    let ModelContent = (modalOptions.component) ? (<ModalOptionComponent {...modalOptions.passProps}/>):null;

    // modalOptions.deleteConfirm
    if (modalOptions.component===false){
      return null;
    } else if (modalOptions.deleteConfirm) { 
      let ModelContent = (<ConfirmModal {...modalOptions.passProps} />);
      return (
        <Modal style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'stretch',
          maxHeight: 270,
          maxWidth: 350,
          marginTop: (height > 700) ? 150 : 120,
          overflow: 'hidden',
          borderRadius:5,
        }} backdrop={modalOptions.backdrop} key={modalOptions.key} swipeToClose={false} position={modalOptions.position} ref={modalOptions.ref}>
          {ModelContent}
        </Modal>
      );
    } else {
      return (
        <Modal style={modalOptions.style} backdrop={modalOptions.backdrop} key={modalOptions.key} swipeToClose={false} position={modalOptions.position} ref={modalOptions.ref}>
          {ModelContent}
        </Modal>
      );
    }
  });
  return modals;
}

class SingleColumn extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentDisplay:'GroupList',
    };
  }
  componentWillReceiveProps(nextProps) {
    // console.log('SINGLE COLUMN componentWillReceiveProps nextProps', nextProps);
    if (nextProps.GroupListDetailStateData.detailData && nextProps.GroupListDetailStateData.detailData.detailData && nextProps.GroupListDetailStateData.detailData.detailData._id) {
      let groupDetailOptions = getDetailState(this, nextProps);
      let singleDetailPath = nextProps.GroupListDetail.detail.detailExtensionRoute.replace(':id', nextProps.GroupListDetailStateData.detailData.detailData._id);
      // console.log({groupDetailOptions,singleDetailPath})
      // this.props.onChangeExtension(singleDetailPath, {
      //   passProps: Object.assign({
      //     detailViewModals: generateModals,
      //   },
      //   nextProps,
      //   groupDetailOptions),
      //   config: { transitionDirection: 'top', },
      // });
    }
  }
  render() {
    // let loadingView = (<LoadingView/>);
    // let emptyView = (<LoadingView/>);
    // let errorView = (<LoadingView/>);
    // let loadedDataView = (<Group {...this.props}/>);
    // console.log('SINGLE COLUMN RENDERRRRRR this.props', this.props);
    if (this.props.GroupListDetailStateData.detailData && this.props.GroupListDetailStateData.detailData.detailData && this.props.GroupListDetailStateData.detailData.detailData._id) {
      let groupDetailOptions = getDetailState(this, this.props);
      let singleDetailPath = this.props.GroupListDetail.detail.detailExtensionRoute.replace(':id', this.props.GroupListDetailStateData.detailData.detailData._id);
      let passProps = Object.assign({ detailViewModals: generateModals, }, this.props, groupDetailOptions);
      this.props.onChangeExtension(singleDetailPath, {
        passProps,
        config: {
          transitionDirection: 'top',
          skipSceneChange: true,
        },
      });
      return (<GroupDetail {...this.props} />);
    } else {
      return (<ScrollView style={[ styles.scrollViewHorizontal, styles.stretchBox, ]} contentContainerStyle={layoutStyles.groupListDetailScrollContainer} horizontal={true}>
        {(this.props.GroupListDetail.options.useGroups) ? <Group {...this.props} /> : null}
        <GroupList  {...this.props}/>
       
      </ScrollView>);
    }

  
  }
}

class MultiColumn extends Component{
  constructor(props) {
    super(props);
    this.state = {
      displaySidebar: false,
      modals:{},
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      modals: {
        modalExtensionRefs: this.refs,
      },
    });
  }
  componentDidMount() {
    // console.log('group list this.refs', this.refs)
    this.setState({
      modals: {
        modalExtensionRefs: this.refs,
      },
    });
    // setTimeout(()=>{this.refs.modal1.open();},2000)
  }
  render() {
    // console.log('MULIT COLUM RENDER PROPS',this.props)
    let loadingView = (<LoadingView/>);
    let emptyView = (<LoadingView/>);
    let errorView = (<LoadingView/>);
    let loadedDataView = (
      <ScrollView style={[styles.scrollViewHorizontal,styles.stretchBox]} contentContainerStyle={layoutStyles.groupListDetailScrollContainer} alwaysBounceHorizontal={false} horizontal={true}>
        {(this.props.GroupListDetail.options.useGroups) ? <Group style={layoutStyles.multiColumnWidthContainer} {...this.props} /> : null}
        <View style={layoutStyles.multiColumnWidthContainer} onLayout={this.props.onLayout}>
          <GroupList  {...this.props} {...this.state.modals}/>
        </View>  
        <GroupDetail {...this.props} {...this.state.modals}/>
        {(this.props.GroupListDetail.detail && this.props.GroupListDetail.detail.actions)?generateModals.call(this, this.props.GroupListDetail.detail.actions, this.props):null}  
      </ScrollView>
    );
    return loadedDataView;     
  }
}

class GroupListDetail extends Component {
  constructor(props) {
    super(props);
    // console.log('GroupListDetail props', props);
    this.state = {
      GroupListDetailStateData: {
        groupData: (props.GroupListDetailStateData && props.GroupListDetailStateData.groupData) ? props.GroupListDetailStateData.groupData : {},
        listData: (props.GroupListDetailStateData && props.GroupListDetailStateData.listData) ? props.GroupListDetailStateData.listData : {},
        detailData: (props.GroupListDetailStateData && props.GroupListDetailStateData.detailData) ? props.GroupListDetailStateData.detailData : {},
        selectedGroup: (props.GroupListDetailStateData && typeof props.GroupListDetailStateData.selectedGroup !== 'undefined') ? props.GroupListDetailStateData.selectedGroup : {},
        showGroupSidebar: (props.GroupListDetailStateData && typeof props.GroupListDetailStateData.showGroupSidebar !== 'undefined') ? props.GroupListDetailStateData.showGroupSidebar : true,
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    // console.log('COMPONENT WILL RECEIVE PROPS GroupListDetail ', { nextProps },'this.state',this.state);
    if (nextProps.GroupListDetailStateData) {
      this.setState({
        GroupListDetailStateData: {
          groupData: Object.assign(this.state.GroupListDetailStateData.groupData, nextProps.GroupListDetailStateData.groupData),
          listData: Object.assign(this.state.GroupListDetailStateData.listData, nextProps.GroupListDetailStateData.listData),
          detailData: Object.assign(this.state.GroupListDetailStateData.detailData, nextProps.GroupListDetailStateData.detailData),
          selectedGroup: this.state.GroupListDetailStateData.selectedGroup,
          showGroupSidebar: this.state.GroupListDetailStateData.showGroupSidebar,
        },
      });
    }
  }
  setDetailData(data) {
    // console.log('SET DETAIL DATA', { data });
    let mergedDetailData = Object.assign({}, this.state.GroupListDetailStateData.detailData, this.props.GroupListDetail.entities[ this.state.GroupListDetailStateData.selectedGroup ].detail, data);
    let GroupListDetailStateData = Object.assign(this.state.GroupListDetailStateData, { detailData: mergedDetailData, });
    // console.log('SET DETAIL ',{GroupListDetailStateData})
    this.setState({
      GroupListDetailStateData,
    });
  }
  setSelectedGroup(groupName) {
    // console.log('setSelectedGroup', { groupName, });
    this.setState({
      GroupListDetailStateData: Object.assign({}, this.state.GroupListDetailStateData, {
        selectedGroup: groupName,
        listData: {
          dataLoaded: false,
          dataError: false,
        },
      }),
    });
  }
  getSelectedGroupList() {
    if (this.state.GroupListDetailStateData.selectedGroup) {
      return this.props.GroupListDetail.entities[ this.state.GroupListDetailStateData.selectedGroup ];
    } else {
      return {};
    }
  }
  showGroupSidebar(shouldShowGroupSidebar, selectedGroup) {
    // console.log({ shouldShowGroupSidebar, selectedGroup, });
    let newState = {
      GroupListDetailStateData: Object.assign(this.state.GroupListDetailStateData, { showGroupSidebar: shouldShowGroupSidebar, }),
    };
    if (selectedGroup) {
      newState.GroupListDetailStateData.selectedGroup = selectedGroup;
      newState.GroupListDetailStateData.detailData = false;
    }
    // console.log({ newState, });
    this.setState(newState);
  }
  updateListDetailFromCompose(data) {
    // console.log('new detail data', { data },this.state.GroupListDetailStateData);
    let stateData = {
      dataLoaded: true,
      dataError: false,
    };
    let detailData = Object.assign({}, this.state.GroupListDetailStateData.detailData);
    detailData.detailData = data;
    let listData = Object.assign({}, this.state.GroupListDetailStateData.listData);
    listData.rows.forEach((listRow, i) => {
      if (listRow._id === data._id) {
        listData.rows[ i ] = data;
      }
    });
    
    this.setState({
      GroupListDetailStateData: Object.assign(
        {},
        this.state.GroupListDetailStateData,
        {
          detailData,
          listData,
        }
      ),
    });
  }
  removeListDetailFromCompose(data) {
    // console.log('new detail data', { data, }, this.state.GroupListDetailStateData);
    let stateData = {
      dataLoaded: true,
      dataError: false,
    };
    let detailData = Object.assign({}, this.state.GroupListDetailStateData.detailData);
    detailData.detailData = undefined;
    let listData = Object.assign({}, this.state.GroupListDetailStateData.listData);
    let removeIndex;
    listData.rows.forEach((listRow, i) => {
      if (listRow._id === data._id) {
        removeIndex = i;
      }
    });
    listData.rows.splice(removeIndex, 1);
    
    this.setState({
      GroupListDetailStateData: Object.assign(
        {},
        this.state.GroupListDetailStateData,
        {
          detailData,
          listData,
        }
      ),
    });
  }
  appendListDetailFromCompose(data) {
    // console.log('new detail data', { data, }, this.state.GroupListDetailStateData);
    // let stateData = {
    //   dataLoaded: true,
    //   dataError: false,
    // };
    let detailData = Object.assign({}, this.state.GroupListDetailStateData.detailData);
    detailData.detailData = data;
    let listData = Object.assign({}, this.state.GroupListDetailStateData.listData);
    listData.rows.push(data);
    
    this.setState({
      GroupListDetailStateData: Object.assign(
        {},
        this.state.GroupListDetailStateData,
        {
          detailData,
          listData,
        }
      ),
    });
  }
  componentDidMount() {
    setLayoutHandler.bind(this);
  }
  render() {
    // console.log('this.state',this.state);
    // console.log('GroupDetail REDNER this.state', this.state,Dimensions.get('window'));
    let { width, /*height,*/ } = Dimensions.get('window');
    let getDataFunctions = { 
      getGroupListDetailFunctions: {
        getListData: getDataForLists.bind(this,
          {
            componentPropsName: 'GroupListDetail',
            componentDataName: 'list',
            componentStateDataName: 'listData',
          }),
        setDetailData: this.setDetailData.bind(this),
        setSelectedGroup: this.setSelectedGroup.bind(this),
        showGroupSidebar: this.showGroupSidebar.bind(this),
        updateListDetailFromCompose: this.updateListDetailFromCompose.bind(this),
        removeListDetailFromCompose: this.removeListDetailFromCompose.bind(this),
        appendListDetailFromCompose: this.appendListDetailFromCompose.bind(this),
        useSingleViewHelpers: ()=>width < 600,
      },
    };
    let GLDpassProps = {};
    GLDpassProps.GroupListDetail = Object.assign({}, this.props.GroupListDetail, this.getSelectedGroupList());
    let passProps = Object.assign({}, this.props, GLDpassProps, this.state);
    // console.log('GROUPLISTDETAILLLLLLLLLL ',{passProps})
    let dataView = (width > 600) ?
      (<MultiColumn  onLayout={onLayoutUpdate.bind(this)}  {...passProps} {...getDataFunctions}/>)
      : (<SingleColumn  onLayout={onLayoutUpdate.bind(this)} {...passProps}  {...getDataFunctions}/>);
    return dataView;     
  }
}

export function getGroupFromEntityName(entityName, groupName, options) {
  let { constants, } = options;
  return {
    entityName: capitalize(entityName), //'Engine',
    fetchUrl:constants[pluralize(groupName)/*pipelines*/].all.BASE_URL+constants[pluralize(groupName)/*pipelines*/][pluralize(entityName)/* `engines`*/].GET_INDEX,
    listProps: {
      pagesProp:`${entityName}pages`, //enginepages,
      dataProp: pluralize(entityName), //'engines',
      countProp: `${pluralize(entityName)}count`,//'enginescount',
    },
  };
}

export function getListFromEntityName(entityName, groupName, options) {
  let { constants, } = options;
  return {
    fetchUrl: constants[pluralize(groupName)].all.BASE_URL + constants[pluralize(groupName)][pluralize(entityName)].GET_INDEX,
    listProps: {
      pagesProp:`${options.listPropsEntityName || entityName}pages`, //enginepages,
      dataProp: pluralize(options.listPropsEntityName || entityName), //'engines',
      countProp: `${pluralize(options.listPropsEntityName || entityName)}count`,//'enginescount',
    },
    componentProps: {
      title: capitalize(entityName), //'Engine',
      create_modal_ref: `create_${entityName}_modal`,
      createModalComponent: options.createModalComponent,
      entityName,
      groupName,
    },
    detailLoad: {
      method: 'passProps',
    },
    menuBar: {
      title: capitalize(options.display_title || entityName), //'Engine',
      // rightItem: {
      //   icon: {
      //     icontype: 'Ionicons',
      //     name: 'ios-create-outline',
      //   },
      //   itemType: 'text',
      //   label:'Edit'
      // },
    },
  };
}

export function getDetailFromEntityName(entityName, groupName, options) {
  let { constants, } = options;
  return {
    fetchUrl: constants[pluralize(groupName)].all.BASE_URL + constants[pluralize(groupName)][pluralize(entityName)].GET_INDEX,
    detailComponent: options.detailComponent,
    detailExtensionRoute: `/${pluralize(groupName)}/${pluralize(entityName)}/:id`,
    actions: [{
      icon: {
        icontype: 'Ionicons',
        name: 'ios-trash-outline', //   name: 'ios-settings-outline',
      },
      itemType: 'icon',
      title: `Delete ${capitalize(entityName)}`, //'Delete Engine',
      description: `delete ${groupName} ${entityName}`, //'delete pipeline engine',
      // type: 'confirmmodal',
      // params: {
      //   path: '',
      //   method:'',
      // },
      type: 'modal',
      modalOptions: {
        deleteConfirm: true,
        component: options.deleteModalComponent,
        ref: `delete_${entityName}_modal`, //'create_engine_modal',
        style: {
          height: 300,
          width: 350,
        },
        passProps:{
          confirmModal: {
            postUrl:'',
            postMethod: 'DELETE',
            constants,
          },
        },
      },
    }, {
      icon: {
        icontype: 'Ionicons',
        name: 'ios-settings-outline',
      },
      itemType: 'icon',
      title: `Edit ${capitalize(entityName)}`, //'Edit Engine',
      description: `edit ${pluralize(entityName)}`,//'create new engines',
      type: 'modal',
      modalOptions: {
        component: options.editModalComponent,
        ref: `edit_${entityName}_modal`, //'create_engine_modal',
        style: {
        },
      },
    }, {
      icon: {
        icontype: 'Ionicons',
        name: 'ios-create-outline',
      },
      itemType: 'icon',
      title: `Create ${capitalize(entityName)}`,
      description: `create new ${pluralize(entityName)}`,
      type: 'modal',
      modalOptions: {
        component: options.createModalComponent,
        ref:`create_${entityName}_modal`,
        style: { /* margin: 30, width:500, */ },
      },
    }, {
      icon: {
        icontype: 'Ionicons',
        name: 'md-funnel', //ios-settings-outline
      },
      itemType: 'icon',
      title: `Filter ${capitalize(entityName)}`,
      description: `filter new ${pluralize(entityName)}`,
      type: 'modal',
      modalOptions: {
        component: options.createModalComponent,
        ref: `filter_${entityName}_modal`,
        style: { /* margin: 30, width:500, */ },
      },
    }],
  };
}

export default GroupListDetail;