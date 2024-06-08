import { StyleSheet } from "react-native";

const AppStyles = StyleSheet.create({

button:{
    backgroundColor: '#E8C4AE',
},
buttonText: {
    color: '#4D689D',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',

},
signOutButton: {
    backgroundColor: '#E8C4AE',
    padding: 10, 
    borderRadius: 8, 
},
header: {
    backgroundColor: '#FCD6BC', // Replace with your desired color
    elevation: 0, // Remove shadow on Android
    shadowOpacity: 0, // Remove shadow on iOS
    borderBottomWidth: 0, 
    borderColor: '#FCD6BC',
}

})


export default AppStyles