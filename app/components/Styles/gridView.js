import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 10,
    marginBottom: 8,
    // width: 90,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
    position: 'relative',
  },
});

export default styles;
