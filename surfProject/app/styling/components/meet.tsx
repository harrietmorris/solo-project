import { StyleSheet } from "react-native";

const MeetStyles = StyleSheet.create({


    container: {
        padding: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
      },
      date: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        padding: 10,
      },
      location: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF',
        paddingLeft: 10,
        paddingBottom: 5,
      },
      icon: {
        color: '#FFFFFF',
      },
      others: {
        fontSize: 12,
        color: '#FFFFFF',
        paddingLeft: 10,
        paddingBottom: 5,
      },
      tags: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF',
        paddingLeft: 10,
        paddingBottom: 5,

      },
      buttonText: {
        fontSize: 15,
        color: '#FCD6BC',
      },
      deleteButton: {
        alignItems: 'center'
      },
      joinButton: {
        alignItems: 'center'
      },
})

export default MeetStyles