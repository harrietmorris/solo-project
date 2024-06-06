import {format} from "date-fns"
import { View } from "react-native";
import { StyleSheet, Text } from "react-native";
import React from "react";


interface MeetingProp {
    meetup: {
        _id: String,
        organiser: String,
        date: Date,
        location: String, 
        description: String,
        tags: [{}], 
        attendants: [{}],
    }
}



const Meet = ({meetup}: MeetingProp) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{meetup.organiser}</Text>
            <Text>{meetup.date.toString()}</Text>
            <Text>{meetup.location}</Text>
            <Text>{meetup.description}</Text>
            <Text>Tags: {JSON.stringify(meetup.tags)}</Text>
            <Text>Attendants: {JSON.stringify(meetup.attendants)}</Text>

        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default Meet;