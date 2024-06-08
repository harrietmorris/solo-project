import { StyleSheet } from "react-native";

const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FCD6BC',
      },
      greeting: {
        fontSize: 36,
        marginTop: 20,
        marginBottom: 40,
        color: '#D26C22',
        fontWeight: 'bold',

      },
      sub: {
        width: '100%',
        fontSize: 16,
        color: '#DD824D',
        fontWeight: 'bold',
        marginBottom: 10,

    
      },
      next: {
        fontSize: 18,
        fontWeight: 'bold'
      },
      button: {
        marginBottom: 40,
        backgroundColor: '#4D689D',
        width: '100%',
      },

        buttonText: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'Montserrat',
            textAlign: 'center',

        },
        linkButton: {
            backgroundColor: '#4D689D',
            padding: 20, 
            borderRadius: 16, 
            width: '100%',
            marginBottom: 0,
            alignSelf: 'center'
        },
        inlineContainer: {
            alignItems: 'center',
            width: '80%',
            marginBottom: 40,
        },
        background: {
          borderRadius: 16,
          width: '100%',
          height: '100%',
        }

})


export default HomeStyles