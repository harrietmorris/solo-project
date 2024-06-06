import React from 'react';
import { View, StyleSheet,Text} from 'react-native';
import List from '../components/list';

const Find = () => {
  return (
    <View style={styles.container}>
      <List />
      <Text> TESTING </Text>
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