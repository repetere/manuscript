import {
  StyleSheet,
  Platform,
} from 'react-native';

let webFixes = (Platform.OS === 'web') ? {
  listText: {
    fontSize: 14,
    borderBottomColor: 'lightgrey',
    alignSelf:'center',
    justifyContent: 'center',
  },
} : {};
let iosFixes = (Platform.OS === 'ios') ? {
  layoutTabIconStyle: {
  },
} : {};



const styles = StyleSheet.create(Object.assign({
  h1: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
  },
  hr: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth || 1,
    paddingTop: 1,
    bottom:1,
  },
  layoutContentTitleContainer: {
    flexDirection: 'row',
    // flex:0,
  },
  layoutContentContainer: {
    padding: 10,
    paddingBottom:60,
  },
  layoutTab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'relative',
    bottom: 0,
    left: 0,
    height: 35,
  },
  layoutTabIconStyle: {
    alignSelf: 'flex-start',
    flex: 0,
    bottom: -7,
    paddingLeft: 10,
    paddingRight: 10,
    height:35,
  },
  layoutTabTextStyle: {
    fontSize:20,
  },
  layoutTabSelectedIconStyle: {
    // color: 'red',
    // borderBottomColor: 'red', lineHeight: 10, borderBottomWidth: 5, bottom: 3, 
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight:60,
  },
  listText: {
    fontSize: 14,
    borderBottomColor: 'lightgrey',
    alignSelf:'center',
    justifyContent: 'center',
    flex: 0,
    maxWidth: 300,
    paddingRight: 10,
  },
  listImageWrapper: {
    height: 50,
    width: 50,
    marginRight: 10,
    // borderRadius: 3,
  },
  listImage: {
    width: 50,
    height: 50,
    borderRadius: 6,  
  },
  listTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'flex-start',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth || 1,
  },
  listItemIconWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    alignItems: 'flex-end',
    paddingRight:10,
    paddingLeft:10,
  },
  listItemIcon: {
    flex: 1,
    justifyContent: 'flex-end',
    textAlign: 'right',
    alignSelf: 'center',
  },
  tableHeaderContainer:{
    marginBottom: 5,
    minHeight:30,
    height: 30,
    // backgroundColor: 'whitesmoke',
    borderTopColor: 'lightgrey',
    borderTopWidth: StyleSheet.hairlineWidth || 1,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth || 1,
  },
  tableHeaderImageContainer: {
    height: 10,
  },
  tableHeaderTextWrapper:{
    height:30,
    borderBottomWidth:0,
    borderBottomColor: 'transparent',
  },
  tableHeaderText:{
    color: 'dimgray',
    fontWeight: 'bold',
    fontSize: 12,
  },
  listTextContainer:{
    flexDirection: 'row',
    overflow: 'hidden',
  },
  
}, webFixes));

export default styles;
