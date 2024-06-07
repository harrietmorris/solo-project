import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text,  RefreshControl, ScrollView, SafeAreaView, } from 'react-native';
import { useDataContext } from '../context/MeetsContext';
import Meet from '../components/meet'
import { MeetType } from '../type/Types';


const List = () => {
  const context = useDataContext();
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState<MeetType[]>([])

  
  if (!context) {
    return <Text > ...Loading </Text>

  }
  
  const { find } = context;
  

  useEffect(()=> {
    setList(find)
    console.log('list', list)
  }, [find])


  

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setList(find)
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [find]);

  const handleDelete = (id: string) => {
    setList(prevList => prevList.filter(meet => meet._id !== id));
  }

//   console.log('List component rendering with data:', find);

  return (
    <>
   <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <FlatList
        data={list}
        //   keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
            <View style={styles.itemContainer}>
            <Meet meetup={item} onDelete={handleDelete}/>
            </View>
        )}
        />
         </ScrollView>
    </SafeAreaView>
     
    </>
   
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
  },

  scrollView: {

  },
  container: {

  }
});

export default List;