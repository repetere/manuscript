/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//TO DO: https://github.com/clh161/react-native-easy-grid-view
import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  Image,
  Platform
} from 'react-native';
// import styles from '../../components/Styles/shared';
import {
  Button, PricingCard
} from 'react-native-elements';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';

import GridView from 'react-native-easy-grid-view';
class Example extends Component {
  constructor(props) {
    super(props);
    var ds = new GridView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithCells([
        {
          text: 1,
          backgroundColor: '#f00',
        }, {
          text: 2,
          backgroundColor: '#0f0',
        }, {
          text: 3,
          backgroundColor: '#00f',
        }, {
          text: 4,
          backgroundColor: '#f0f',
        }, {
          text: 5,
          backgroundColor: '#fff',
        }, {
          text: 6,
          backgroundColor: '#000',
        } ], 1),
      cellWidth: 0,
      cellHeight: 0,
    };
  }
  _renderCell(cell) {
    /**
    <PricingCard
  color='#4f9deb'
  title='Free'
  price='$0'
  info={['1 User', 'Basic Support', 'All Core Features']}
  button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
/> */
    return (
      <View onLayout={event => {
        // console.log('event.nativeEvent.layout',event.nativeEvent.layout)
        // console.log('cell',cell)
        var width = event.nativeEvent.layout.width;
        if (this.state.cellWidth != width) {
          this.setState({ cellWidth: width, });
        }
        if (this.state.cellHeight != width) {
          this.setState({ cellHeight: width, });
        }
      } }>
        <View style={{
          width: this.state.cellWidth,
          height: this.state.cellHeight,
          justifyContent: 'center',
          backgroundColor: cell.backgroundColor,
        }}
          // resizeMode={Image.resizeMode.stretch}
          // source={cell.image}
          >
     <PricingCard
  color='#4f9deb'
  title='Free'
  price='$0'
  info={['1 User', 'Basic Support', 'All Core Features']}
  button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
/>
          {/*}     <Text style={{
            backgroundColor: '#0004',
            textAlign: 'center',
            color: '#fff',
            fontSize: 24,
          }}>{cell.text}</Text>
  */}
        </View>
      </View>
    );
  }
  render() {
    return (
      <ScrollView style={{
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'column',
        padding: 8,
      }}
      contentContainerStyle={{
        paddingVertical: 20,
        position: 'relative',
      }}>
        <View style={{
          flex: 1,
          alignSelf: 'stretch',
        }}>
          
          <Button
            title="Open Dialog"
            onPress={() => {
              this.popupDialog.openDialog();
            }}
          />
          <PricingCard
            color='#4f9deb'
            title='Free'
            price='$0'
            info={['1 User', 'Basic Support', 'All Core Features']}
            button={{
              title: 'GET STARTED', icon: 'flight-takeoff',
            }}
            />
          <Text>grid view</Text>
          <Text>grid view</Text>
          <Text>grid view</Text>
          <Text>grid view</Text>
        </View>
        <View style={{
          flex: 1,
          alignSelf: 'stretch',
        }}>
          <GridView dataSource={this.state.dataSource}
            spacing={8}
            horizontal={true}
            style={{
              padding: 0,
            }}
            renderCell={this._renderCell.bind(this) } />
        </View>


          <PopupDialog
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }
          >
            <View>
              <Text>Hello</Text>
            </View>
          </PopupDialog>
      </ScrollView>
    );
  }
}
// class More extends Component {
//   constructor(){
//     super(...arguments);
//     this.state = {
//       ranattr:'ok',
//     };
//   }
//   render() {
//     return (
//       <View style={ styles.container }>
//         <Text style={ styles.heading }>In the apps app</Text>		
//         <Button
//           small
//           iconRight
//           icon={{ name: 'code', }}
//           title="Code" />
//         <Button
//           small
//           iconRight
//           icon={{ name: 'share-apple',  type: 'evilicon', }}
//           title="Share Apple" />
//         <Button
//           small
//           iconRight
//           icon={{ name: 'battery-full',  type: 'foundation', }}
//           title="Battery Full" />
//       </View>
//     );
//   }
// }
export default Example;
