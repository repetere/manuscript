import {
  StyleSheet,
  Platform,
} from 'react-native';

let webFixes = (Platform.OS === 'web') ? {
  listText: {

  },
} : {};
let iosFixes = (Platform.OS === 'ios') ? {
  layoutTabIconStyle: {
  },
} : {};



const styles = StyleSheet.create(Object.assign({
 
  listTextContainer:{
    flexDirection: 'row',
    overflow: 'hidden',
  },
  
}, webFixes));

export default styles;
