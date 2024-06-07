import { Text } from 'react-native'
import React from 'react'
import { useDataContext } from '../context/MeetsContext'


const Home = () => {
  const {username} = useDataContext();

  return (
   
      <Text> Welcome, {username} </Text>
  )
}

export default Home