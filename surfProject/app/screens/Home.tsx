import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDataContext } from '../context/MeetsContext'
import { MeetType } from '../type/Types';
import Meet from '../components/meet';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../type/navigation';
import HomeStyles from '../styling/screens/home';
import BundledImage from '../service/bundledImage';




type HomeNavProp = BottomTabNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const {username, find} = useDataContext();
  const [nextEvent, setNextEvent] = useState<MeetType | null>(null);
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



  useEffect(()=> {
    if (find && find.length > 0) {
      setNextEvent(find[0]);
    }
  }, [find])

  return (
   <View style={HomeStyles.container}>
      <Text style={HomeStyles.greeting}> Hello {username}! </Text>

      <View style={HomeStyles.inlineContainer}>
        <Text style={HomeStyles.sub}> Are you ready for your next surf... </Text>
        <BundledImage></BundledImage>
      </View>

      <View style={HomeStyles.inlineContainer}>
        <Text style={HomeStyles.sub}> Want to find another group to surf with?</Text> 
        <CustomButton onPress={() => navigation.navigate('Find')} title="Search for other surf meetups!" style={HomeStyles.linkButton} />
      </View>

      <View style={HomeStyles.inlineContainer}>
        <Text style={HomeStyles.sub}> Can't find what you're looking for?</Text>
        <CustomButton onPress={() => navigation.navigate('New')} title="Create your own surf meet!" style={HomeStyles.linkButton} />
      </View>
    
      </View>
      
  )
}


export default Home