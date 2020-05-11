import { StyleSheet } from 'react-native'


const globalColors = {
  modalBlue: 'rgba(51,102,153,0.8)'
}

const globalSizes = {
  largeFont: 20,
  smallFont: 10
}

const globalStyles = StyleSheet.create({
  btnStart: {
      height: 45,
      borderRadius: 10,
      shadowColor: '#800',
      shadowOffset: {
        width: 4,
        height: 4
      },
      shadowOpacity: 0.3,
      shadowRadius: 3.9,
      elevation: 5,
      marginVertical: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.4)', 
      marginHorizontal: 20,
      alignItems: 'center', 
  },
  titleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 3, 
    padding: 6,
    marginTop: 1,
    marginBottom: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.3,
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    
  },
  text: {
    paddingTop: 8,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 22,
    fontWeight: '500',
  },
  logo: {
    marginTop: 20,
    height: 200,
    width: 250,
    
  }
});


export { globalColors, globalStyles, globalSizes }