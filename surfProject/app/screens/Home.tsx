import { Text, View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDataContext } from '../context/MeetsContext'
import { MeetType } from '../type/Types';
import Meet from '../components/meet';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../type/navigation';

type HomeNavProp = BottomTabNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const {username, find} = useDataContext();
  const [nextEvent, setNextEvent] = useState<MeetType | null>(null);
  const navigation = useNavigation<HomeNavProp>();


  useEffect(()=> {
    if (find && find.length > 0) {
      setNextEvent(find[0]);
    }
  }, [find])

  return (
   <View style={styles.container}>
      <Text style={styles.greeting}> Hello {username}! </Text>

      <Text style={styles.next}> You're next surf meet is ... </Text>
      {nextEvent? (
        <Meet meetup={nextEvent} onDelete={()=>{}} />
      ): (
        <Text>No upcoming events</Text>
      )}

      <Button 
          mode='contained'
          onPress={() => navigation.navigate('Find')}
          style={styles.button}>
            Search for other surf meetups
      </Button>
      <Button 
          mode='contained'
          onPress={() => navigation.navigate('New')}
          style={styles.button}>
            Create your own meetup!
      </Button>

      </View>
      
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  greeting: {
    fontSize: 18,
    marginBottom: 20,
  },
  next: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    marginTop: 20,
  },

  
})
export default Home