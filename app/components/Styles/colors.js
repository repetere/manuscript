import {
  StyleSheet,
  Platform,
} from 'react-native';

const styles = StyleSheet.create({
  active:{
    color: (Platform.OS ==='web') ? '#dc143c':'crimson', //'crimson',
  },
  active_bright:{
    color:'deeppink',
  },
  link:{
    color:'royalblue',
  },
  link_dark:{
    color:'#4682b4', //steelblue',
  },
  nav:{
    color:'dimgrey', //slategrey
  },
});

export default styles;
