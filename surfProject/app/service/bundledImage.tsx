import React, { useEffect, useState } from 'react';
import { ImageBackground, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Asset } from 'expo-asset';
import Meet from '../components/meet';
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
    <ImageBackground source={{ uri: backgroundUri }} style={styles.background}>

      <View style={styles.content}>
      {nextEvent? (
             <Meet meetup={nextEvent} onDelete={()=>{}} />
        ): (
          <Text style={HomeStyles.sub}>No upcoming events</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    loadingContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      background: {
        // flex: 1,
        width: '100%',
      },
      content: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default BundledBackground;
