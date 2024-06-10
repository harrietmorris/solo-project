import React, { useEffect, useState } from 'react';
import { ImageBackground, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Asset } from 'expo-asset';
import Meet from './meet';
import { MeetType } from '../type/Types';
import HomeStyles from '../styling/screens/home';
import { useDataContext } from '../context/MeetsContext';

const BundledBackground = () => {
  const [backgroundUri, setBackgroundUri] = useState<string | null>(null);
  const [nextEvent, setNextEvent] = useState<MeetType | null>(null);
  const {find} = useDataContext();



  useEffect(()=> {
    if (find && find.length > 0) {
      setNextEvent(find[0]);
    }
  }, [find])


  useEffect(() => {
    const loadAsset = async () => {
      try {
        // Correctly require the asset
        const asset = Asset.fromModule(require('../../assets/Rectangle.png'));
        
        // Preload the asset
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
            //  <Meet meetup={nextEvent}  />
        ): (
          <Text style={HomeStyles.sub}>No upcoming events</Text>
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
