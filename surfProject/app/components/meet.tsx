import {format} from "date-fns"
import { TouchableOpacity, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import React from "react";
import { MeetType } from "../type/Types";
import { Button } from "react-native-paper";
import { useDataContext } from "../context/MeetsContext"
import { deleteMeet } from "../service/ApiService";
import MeetStyles from "../styling/components/meet";
import Ionicons from '@expo/vector-icons/Ionicons';



interface MeetingProp {
    meetup: MeetType;
    onDelete: (id: string) => void;
}

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  style?: object;
}

const CustomButton:  React.FC<CustomButtonProps> =({ onPress, title, style }) => (
  <TouchableOpacity style={style} onPress={onPress}>
      <Text style={MeetStyles.buttonText}> <Ionicons name="trash-bin-outline" /> {title}</Text>
  </TouchableOpacity>
);

const Meet = ({meetup, onDelete}: MeetingProp) => {
  const {username} = useDataContext();
  const currentUser = username

  const date = typeof meetup.date === 'string' ? new Date(meetup.date) : meetup.date;

  const dateFormat = format(date, "h:mmbbb - ccc, do LLL y ")

  const dateString = date instanceof Date && !isNaN(date.getTime())
  ? `${dateFormat}`
  : 'Invalid Date';

  const handleDelete = () => {
    if (meetup._id) {
      deleteMeet(meetup._id).then(()=> {
        if (meetup._id) {
          onDelete(meetup._id)
        }
      }  
      )} 
  }


    return (
        <View style={MeetStyles.container}>
            <Text style={MeetStyles.date}>{dateString}</Text>
            <Text style={MeetStyles.location}> <Ionicons name="location-outline"  style={MeetStyles.icon} /> {meetup.location}</Text>
            <Text style={MeetStyles.tags}>{meetup.tags
                          .filter(tag => tag.value === true)
                          .map(tag=>tag.key).join(', ')}</Text>
            
            <Text style={MeetStyles.others}>Organised by {meetup.organiser}</Text>

            <Text style={MeetStyles.others}>Notes from {meetup.organiser}: {meetup.description}</Text>
            
            <Text style={MeetStyles.others}>Attendants: {(meetup.attendants || []).join(', ')}</Text> 
            {currentUser === meetup.organiser ?
            <CustomButton onPress={handleDelete} title="Delete" style={MeetStyles.deleteButton}/>
              :
              <></>
            }
            
        </View>
      )
}

export default Meet;