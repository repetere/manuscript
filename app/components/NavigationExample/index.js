/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {
  Component
} from 'react';
import {
  StyleSheet,

} from 'react-native';
import {
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  ListView
} from 'react-native-elements';
class App extends Component {
  renderScene(route, navigator) {
    if (route.name == 'Main') {
      return <Main navigator={navigator} {...route.passProps}  />
    }
    if (route.name == 'Page2') {
      return <Page2 navigator={navigator} {...route.passProps}  />
    }
  }
  render() {
    return (<Navigator
      	style={{ flex:1 }}
        initialRoute={{ name: 'Main' }}
        renderScene={ this.renderScene.bind(this) } />)
  }
};
const data = [{
  title: 'Row 1'
}]
class Main extends Component {
  constructor() {
    super(...arguments);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      dataSource: ds.cloneWithRows(data)
    }
  }
  renderRow(rowData) {
    return <TouchableOpacity
    				style={{height: 60, backgroundColor: 'red'}}
            onPress={() => this._navigate(rowData.title)}><Text>{rowData.title}</Text></TouchableOpacity>
  }
  _navigate(title) {
    this.props.navigator.push({
      name: 'Page2',
      passProps: {
        title,
      },
    });
  }
  render() {
    return (<View style={ styles.container }>
      	<Text style={ styles.heading }>Hello from Main</Text>
 				<ListView
      		renderRow={this.renderRow}
      		dataSource={this.state.dataSource}
        	/>
      </View>);
  }
}
class Page2 extends Component {
  render() {
    return (<View style={ styles.container }>
      	<Text style={ styles.heading }>Hello from { this.props.title }</Text>
 				<TouchableHighlight style={ styles.button } onPress={ () => this.props.navigator.pop() }>
      		<Text style={ styles.buttonText }>GO Back</Text>
      	</TouchableHighlight>
      </View>);
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
  heading: {
    fontSize: 22,
    marginBottom: 10,
  },
  button: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 20
  }
});
export default App;
