import {format} from "date-fns"
import { TouchableOpacity, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { MeetType } from "../type/Types";
import { Button } from "react-native-paper";
import { useDataContext } from "../context/MeetsContext"
import { deleteMeet, addAtt, delAtt } from "../service/ApiService";
import MeetStyles from "../styling/components/meet";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ListType } from "../type/ListType";



interface MeetingProp {
    meetup: ListType;
    onDelete: (id: string) => void;
}

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  style?: object;
}

const CustomButtonDelete:  React.FC<CustomButtonProps> =({ onPress, title, style }) => (
  <TouchableOpacity style={style} onPress={onPress}>
      <Text style={MeetStyles.buttonText}> <Ionicons name="trash-bin-outline" /> {title}</Text>
  </TouchableOpacity>
);

const CustomButtonJoin:  React.FC<CustomButtonProps> =({ onPress, title, style }) => (
  <TouchableOpacity style={style} onPress={onPress}>
      <Text style={MeetStyles.buttonText}> <Ionicons name="trash-bin-outline" /> {title}</Text>
  </TouchableOpacity>
);

const Meet = ({meetup, onDelete}: MeetingProp) => {
  const {username} = useDataContext();
  const currentUser = username || ""
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    const attendants = meetup.attendants || []; 
    setJoined(attendants.includes(currentUser))
  }, [meetup, currentUser]);

  const date = new Date(meetup.date)
  const dateFormat = format(date, "h:mmbbb - ccc, do LLL y ")

  const dateString = date instanceof Date && !isNaN(date.getTime())
  ? `${dateFormat}`
  : 'Invalid Date';



  const handleDelete = () => {
    if (meetup?._id) {
      deleteMeet(meetup?._id).then(()=> {
        if (meetup?._id) {
          onDelete(meetup?._id)
        }
      }  
      )} 
  }

  const handleJoin = async () => {
    if (meetup?._id) {
      await addAtt(meetup?._id, currentUser);
      setJoined(true);
    }
  }

  const handleCancel = async () => {
    if (meetup?._id) {
      await delAtt(meetup?._id, currentUser);
      setJoined(false);
    }
  }


    return (
        <View style={MeetStyles.container} >
            <Text style={MeetStyles.date}>{dateString}</Text>
            <Text style={MeetStyles.location}> <Ionicons name="location-outline"  style={MeetStyles.icon} /> {meetup.location}</Text>
            <Text style={MeetStyles.tags}>{(meetup.tags || []).join(', ')}</Text>
            
            <Text style={MeetStyles.others}>Organised by {meetup.organiser}</Text>

            <Text style={MeetStyles.others}>Notes from {meetup.organiser}: {meetup.description}</Text>
            
            <Text style={MeetStyles.others}>Attendants: {(meetup.attendants || []).join(', ')}</Text> 
            {currentUser === meetup.organiser ?
            <CustomButtonDelete onPress={handleDelete} title="Delete" style={MeetStyles.deleteButton}/>
              :
              joined? 
                <CustomButtonJoin onPress={handleCancel} title="I can't make the surf anymore!" style={MeetStyles.joinButton}/>
                :
                <CustomButtonJoin onPress={handleJoin} title="Join this surf!" style={MeetStyles.joinButton}/>
            }
            
        </View>
      )
}

export default Meet;