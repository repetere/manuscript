/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//TO DO: https://github.com/clh161/react-native-easy-grid-view
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  Platform
} from 'react-native';
// import styles from '../../components/Styles/shared';
import {
  Button,
  // Card, SocialIcon, List, ListItem, ListView, PricingCard
} from 'react-native-elements';
import GridView from 'react-native-grid-view'
import in_theaters from './in_theaters.json'

console.log('in_theaters',in_theaters)

var PAGE_SIZE = 25;
var MOVIES_PER_ROW = 3;
class Movie extends Component {
  render() {
      return (
        <View style={styles.movie} >
          <Image
            source={{uri: this.props.movie.posters.thumbnail}}
            style={styles.thumbnail}
          />
          <View >
            <Text 
            style={styles.title}
            numberOfLines={3}>{this.props.movie.title}</Text>
            <Text style={styles.year}>{this.props.movie.year}</Text>
          </View>
        </View>
      );
  }
}

class More extends Component{
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      loaded: false,
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({
      dataSource: in_theaters.movies,
      loaded: true,
    });
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <GridView
        items={this.state.dataSource}
        itemsPerRow={MOVIES_PER_ROW}
        renderItem={this.renderItem}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderItem(item) {
      return <Movie movie={item} key={item.id} />
  }
};

var styles = StyleSheet.create({
  movie: {
    height: 150,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 10,
    marginBottom: 8,
    width: 90,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
    position: 'relative',
    flex:1
  },
});
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

export default More;