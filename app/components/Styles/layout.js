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
  menuBarContentWrapper:{
    justifyContent:'center',
    alignItems:'stretch',
    height: 40,
    paddingTop: 0,
    backgroundColor:'whitesmoke',
    borderBottomWidth:1,
    borderBottomColor: 'lightgray',
  },
  menuBarSpaceAndBorder:{
    flex: 1, 
    borderRightWidth:1,
    borderRightColor: 'lightgray',
    paddingBottom:40,
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
    borderBottomWidth: 1,
    paddingTop: 1,
    bottom:1,
  },
  layoutContentTitleContainer: {
    flexDirection: 'row',
    // flex:0,
  },
  layoutContentContainer: {
    padding: 10,
    paddingBottom:10,
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
    padding:5, 
    minHeight:30,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth || 1,
    alignSelf: 'stretch',
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
    minHeight: 50,
    justifyContent: 'flex-start',
    alignItems:'center',
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
    // minHeight:30,
    // height: 30,
    maxHeight: 30,
    justifyContent:'center',
    backgroundColor: 'whitesmoke',
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  tableHeaderImageContainer: {
    height: 10,
  },
  tableHeaderTextWrapper:{
    height: 20,
    minHeight:20,
    maxHeight:20,
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
  groupListDetailScrollContainer: {
    position: 'relative',
    alignSelf: 'stretch',
    flex: 1,
  },
  multiColumnWidthContainer: {
    width: 350,
    maxWidth: 350,
  },
  positionRelative: {
    position:'relative',
  },
  menuBarItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  menuBarContentWrapper:{
    justifyContent:'center',
    alignItems:'stretch',
    height: 60,
    paddingTop: 25,
    backgroundColor:'whitesmoke',
    borderBottomWidth:1,
    borderBottomColor: 'darkgray',
  },
  menuBarContentBottomtWrapperOverrride:{
    height: 40,
    paddingTop: 0,
    borderBottomWidth:0,
    // borderBottomColor: 'darkgray',
    borderTopWidth:1,
    borderTopColor: 'darkgray',
  },
  menuBarSpaceAndBorder:{
    flex: 1, 
    borderRightWidth:1,
    borderRightColor: 'darkgray',
    paddingBottom:60,
  },
  menuBarTextSize: {
    fontSize:24,
  },
  menuBarTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  menuBarItemText: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  menuBarItemIcon: {
    paddingRight: 5,
    paddingLeft: 5,
    justifyContent: 'center',
    alignSelf: 'center', 
  },
  gridItemContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    flex: 1, 
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  gridItemIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
    width: 48,
    height: 48,
    marginRight: 5,
  },
  gridItemContent:{
    justifyContent: 'space-around',
    alignItems: 'stretch',
    alignSelf: 'stretch', 
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    paddingTop:5,
    paddingBottom: 5,
    flex:1,
  },
  gridItemTitle: {
    fontSize: 16,
    padding: 2,
  },
  gridItemDescription: {
    fontSize: 12,
    color: 'gray',
    padding: 1,
  },
  detail_widthPadding: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  detail_containerBottomPaddingMargin: {
    paddingBottom:10,
    marginBottom:5,
  },
  detail_h1: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
    paddingBottom:10,
    marginBottom:5,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth || 1,
  },
  detail_h2: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom:5,
    marginBottom:2,
  },
}, webFixes));

export default styles;
