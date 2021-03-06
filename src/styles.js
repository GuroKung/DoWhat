import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1
  },
  body: {
    flex: 9,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#F5FCFF',
  },
  primaryButton: {
    margin: 10,
    padding: 15,
    alignSelf:'center',
    backgroundColor:"blue",
    width:150
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#6fcf97',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 12 
  },
  btnFont: {
    color: 'white',
    fontSize: 20
  },
  headerFont: {
    fontSize: 20
  },
  taskContainer: {
       marginTop: 12, 
       justifyContent: 'flex-start'
  },
  textInputContainer: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center'
  },
  scrollView: {
    // backgroundColor: '#eeeeee',
    height: 300,
    flex: 1
  }
});