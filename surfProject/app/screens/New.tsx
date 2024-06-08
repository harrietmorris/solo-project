import { Text, View } from 'react-native'
import React from 'react'
import Form from '../components/form'
import NewStyles from '../styling/screens/new'

const New = () => {
  return (
  
    <View style={NewStyles.container}>
      <Text style={NewStyles.head}> Create a new surf meet </Text>
      <Form />
    </View>
    
  )
}

export default New