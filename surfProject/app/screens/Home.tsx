import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView, RefreshControl} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDataContext } from '../context/MeetsContext'
import { MeetType } from '../type/Types';
import Meet from '../components/meet';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../type/navigation';
import HomeStyles from '../styling/screens/home';
import BundledImage from '../components/bundledImage';




type HomeNavProp = BottomTabNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const {username, find, fetchMeets} = useDataContext();
  const [nextEvent, setNextEvent] = useState<MeetType | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<HomeNavProp>();
  



  interface CustomButtonProps {
    onPress: () => void;
    title: string;
    style?: object;
  }

const CustomButton:  React.FC<CustomButtonProps> =({ onPress, title, style }) => (
    <TouchableOpacity style={style} onPress={onPress}>
        <Text style={HomeStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

const findNextEvent = useCallback(() => {
  const now = new Date();
  const future = find.filter(event => new Date(event.date) >= now);
  const sorted = future.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime() ;
  });
  const upcomingEvents = sorted.filter(event =>
    (event.organiser === username || event.attendants.includes(username ?? "")) &&
    new Date(event.date) >= now
    );
    setNextEvent(upcomingEvents.length > 0 ? upcomingEvents[0] : null)

}, [find, username]);


  useEffect(()=> {
    if (username) {
      findNextEvent();
    }

  }, [findNextEvent, username])

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMeets();
    if (username) {
      findNextEvent();
    }
    setRefreshing(false);
  }

  return (


    <ScrollView
        contentContainerStyle={HomeStyles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
    >
      <Text style={HomeStyles.greeting}> Hello {username}! </Text>

        {nextEvent ? (
          <View style={HomeStyles.inlineContainer}>
            <Text style={HomeStyles.sub}>Next Event:</Text>
            <Text style={HomeStyles.sub}>{nextEvent.location} at {new Date(nextEvent.date).toLocaleString()}</Text>
          </View>
        ): (
          <Text style={HomeStyles.sub}>No upcoming surfs</Text>
        )}


      <View style={HomeStyles.inlineContainer}>
        <Text style={HomeStyles.sub}> Are you ready for your next surf... </Text>
        <BundledImage />
      </View>

      <View style={HomeStyles.inlineContainer}>
        <Text style={HomeStyles.sub}> Want to find another group to surf with?</Text> 
        <CustomButton onPress={() => navigation.navigate('Find')} title="Search for other surf meetups!" style={HomeStyles.linkButton} />
      </View>

      <View style={HomeStyles.inlineContainer}>
        <Text style={HomeStyles.sub}> Can't find what you're looking for?</Text>
        <CustomButton onPress={() => navigation.navigate('New')} title="Create your own surf meet!" style={HomeStyles.linkButton} />
      </View>
    
      </ScrollView>
  )
}


export default Home