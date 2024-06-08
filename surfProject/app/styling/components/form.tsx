import { StyleSheet } from "react-native";

const FormStyles = StyleSheet.create({

    safeArea: {
        flex:1
      },
      scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
      },
      container: { 
        //   flex: 1,
          width: '80%',
          justifyContent: "center", 
          marginHorizontal: 30 
      },
      input: { 
            padding: 5,
            // borderRadius: 16,
            backgroundColor: '#fff', 
            fontSize: 16,
            color: '#4D689D',
            fontWeight: 'bold',
            marginBottom: 15,

      },
      row: {
        alignItems: "center",
        flexDirection: "row",
        marginVertical: 20,
        justifyContent: "space-between",
      },
      text: {
        width: '100%',
        fontSize: 16,
        color: '#DD824D',
        fontWeight: 'bold',
        marginBottom: 10,
      },
      date: {
        
      },
      button: {
        backgroundColor: '#4D689D',
            padding: 5, 
            borderRadius: 16, 
      },
      buttonText: {
        color: '#D26C22',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Montserrat_300Light',
      },
})

export default FormStyles