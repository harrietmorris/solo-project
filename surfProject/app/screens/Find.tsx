import React, { useEffect } from 'react';
import { View, StyleSheet,Text, ScrollView, SafeAreaView, RefreshControl} from 'react-native';
import List from '../components/list';
import { useIsFocused } from '@react-navigation/native';

const Find = () => {


  return (
    <View>
      <List/> 
    </View>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default Find;