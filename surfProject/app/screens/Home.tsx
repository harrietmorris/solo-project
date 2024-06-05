import { View, Text } from 'react-native'
import React from 'react'
import MyTabs from '../navigation/tabs'
import { NavigationContainer } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { NavigationAction } from '@react-navigation/native'

const Home = () => {
  return (

      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
  
  )
}

export default Home