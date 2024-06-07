import {format} from "date-fns"
import { View } from "react-native";
import { StyleSheet, Text } from "react-native";
import React from "react";
import { MeetType } from "../type/Types";


interface MeetingProp {
    meetup: MeetType;
}



const Meet = ({meetup}: MeetingProp) => {

  const date = typeof meetup.date === 'string' ? new Date(meetup.date) : meetup.date;

  const dateString = date instanceof Date && !isNaN(date.getTime()) ? date.toDateString() : 'Invalid Date';

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{meetup.organiser}</Text>
            <Text>{dateString}</Text>
            <Text>Location: {meetup.location}</Text>
            <Text>Description: {meetup.description}</Text>
            <Text>Tags: {meetup.tags
                          .filter(tag => tag.value === true)
                          .map(tag=>tag.key).join(', ')}</Text>
            {/* <Text>Attendants: {meetup.attendants.join(', ')}</Text>  */}
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