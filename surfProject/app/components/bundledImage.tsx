import React, { useCallback, useEffect, useState } from 'react';
import { ImageBackground, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Asset } from 'expo-asset';
import Meet from './meet';
import { MeetType } from '../type/Types';
import HomeStyles from '../styling/screens/home';
import { useDataContext } from '../context/MeetsContext';
import MeetStyles from '../styling/components/meet';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { ListType } from '../type/ListType';

interface BundledBackgroundProps {
  nextEvent: ListType;
}

// const BundledBackground: React.FC<BundledBackgroundProps> = ({}) => {
  const BundledBackground = ({}) => {
  const [backgroundUri, setBackgroundUri] = useState<string | null>(null);
  const [nextEvent, setNextEvent] = useState<MeetType | null>(null);
  const {find, username, fetchMeets} = useDataContext();


  const loadNextEvent = useCallback(()=> {
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
    loadNextEvent();


  }, [ username, loadNextEvent]);
  



  useEffect(() => {
    const loadAsset = async () => {
      try {
        const asset = Asset.fromModule(require('../../assets/Rectangle.png'));
        await asset.downloadAsync();

        if (asset.localUri) {
          setBackgroundUri(asset.localUri);
        } else {
          console.error("Asset localUri is null");
        }
      } catch (error) {
        console.error("Error loading asset:", error);
      }
    };

    loadAsset();
  }, []);
 
  
   



  if (!backgroundUri) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <ImageBackground source={{ uri: backgroundUri }} style={styles.background}>

      <View style={styles.content}>
      {nextEvent? (
       
            <Meet meetup={nextEvent} onDelete={()=>{}} />
  
        ): (
          <Text style={HomeStyles.noEvents}>Oh no!{'\n'}You don't have any surf plans!</Text>
        )}
      </View>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    loadingContainer: {
      
        borderRadius: 16, 
        justifyContent: 'center',
        alignItems: 'center',
      },
      background: {
  
        borderRadius: 16, 
        width: '100%',
      
      },
      content: {
  
        borderRadius: 16, 
        justifyContent: 'center',
        alignItems: 'center',
      },
      container: {
        borderRadius: 16,
        overflow: 'hidden',
       width: '100%',
      }
});

export default BundledBackground;
