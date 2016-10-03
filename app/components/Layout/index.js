import React, { cloneElement, Component, } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Image, Platform, } from 'react-native';
import styles from '../Styles/shared';
import layoutStyles from '../Styles/layout';
import colorStyles from '../Styles/colors';
import { Button, } from 'react-native-elements';
import Tabs from 'react-native-tabs';

class Layout extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      tabs: this.props.layoutData.tabs || false,
      selectedTab: this.props.layoutData.selectedTab || null,
    };
  }
  render() {
    if (this.props.layoutData.tabs) {
      let selectedIconStyle = (Platform.OS === 'web') ?[layoutStyles.layoutTabSelectedIconStyle, layoutStyles.layoutTabTextStyle, colorStyles.active]:[];
      return (
        <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={styles.scrollViewStandardContentContainer}>
          <View style={layoutStyles.layoutContentContainer}>
              <View style={layoutStyles.layoutContentTitleContainer}>
                <Text style={ [layoutStyles.h1, { paddingRight:5, } ]}>{this.props.layoutData.extensionTitle}</Text>		
                <ScrollView style={layoutStyles.layoutContentTitleContainer} horizontal={true}>
                  <Tabs
                    selected={ this.state.selectedTab }
                    selectedIconStyle={selectedIconStyle}
                    selectedStyle={[layoutStyles.layoutTabSelectedStyle,colorStyles.active ]}
                    style={layoutStyles.layoutTab}
                    iconStyle={layoutStyles.layoutTabIconStyle}
                    onSelect={el => this.setState({ selectedTab: el.props.name, }) } >
                  {this.renderTabs()}
                  </Tabs>		
                </ScrollView>
              </View>
            <View style={layoutStyles.hr}></View>
          </View>
          {/*<Text style={styles.welcome}>{this.state.selectedTab}</Text>*/}
          {this.renderLayoutComponent()}
        </ScrollView>
      );
    } else {
      return (
        <View style= {[styles.container]}>
          <Text>Unknown Layout</Text>
        </View>
      );  
    }
    
  }
  renderTabs() {
    let tabs = Object.keys(this.state.tabs).map((tabname,i) => {
      let tabData = this.state.tabs[ tabname ];
      return (
        <Text
          key={i}
          name={tabData.name}
          style={layoutStyles.layoutTabTextStyle }>
          {tabData.title}
        </Text>);
    });
    return tabs;
  }
  renderLayoutComponent() {
    let LocalLayoutTabComponent = this.state.tabs[ this.state.selectedTab ].component;
    // let bindedElement = cloneElement(LocalLayoutTabComponent, this.props);
    // return bindedElement;
    return (<LocalLayoutTabComponent {...this.props}/>
      );
  }
}
export default Layout;
