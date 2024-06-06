import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useFind } from '../context/MeetsContext';
import Meet from '../components/meet'


const List = () => {
  const context = useFind();
  
  if (!context) {
    return <Text > ...Loading </Text>

  }
  
  const { find } = context;

  console.log('List component rendering with data:', find);

  return (
    <>
     <FlatList
      data={find}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Meet meetup={item} />
        </View>
      )}
    />
    </>
   
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
  },
});

export default List;