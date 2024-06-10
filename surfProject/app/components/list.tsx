import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text,  RefreshControl, ScrollView, SafeAreaView, } from 'react-native';
import { useDataContext } from '../context/MeetsContext';
import Meet from '../components/meet'
import { MeetType } from '../type/Types';
import ListStyles from '../styling/components/list';
import Filter from './filter';
import SearchBar from './search';
import { deleteMeet, getMeets } from '../service/ApiService';



const List = () => {
  const context = useDataContext();
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState<MeetType[]>([])
  const [search, setSearch] = React.useState('');
  const [attendantSearch, setAttendantSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagOptions, setTagOptions] = useState<{ label: string; value: string }[]>([]);

  
  if (!context) {
    return <Text > ...Loading </Text>
  }
  
  const { find } = context;
  
  useEffect(() => {
    const dateNow = new Date();
    const future = find.filter(event => new Date(event.date) >= dateNow);
    setList(future);
    const allTags = [...new Set(future.flatMap(item => item.tags.map(tag => tag.key)))];
    setTagOptions(allTags.map(tag => ({ label: tag, value: tag })));
  }, [find]);


  

  const onRefresh =  async () => {
    setRefreshing(true);
    try {
      const response = await getMeets();
      if (response && response.data) {
        const dateNow = new Date();
        const future = response.data.filter((meet: { date: string | number | Date; }) => new Date(meet.date) >= dateNow);
        setList(future);
      }
    }
    catch (e){
      console.log('Error refreshing page:', e)
    } finally {
      setRefreshing(false)
    }
  };

  const handleDelete = (id: string) => {
    const updatedList = list.filter(meet => meet._id !== id)
    setList(updatedList);
    deleteMeet(id)
      .then(() => {   
        })
      .catch(e => { 
        setList(prevList => {
          return [...prevList, ...updatedList.filter(meet => meet._id === id)];
        })
        console.error("Error:", e);
    });
}
  

  const removeTag = (tag: string) => {
    setSelectedTags(prevTags => prevTags.filter(t => t !== tag));
  }

  const filteredList = list.filter((item) =>
  (search ? item.location.toLowerCase().includes(search.toLowerCase()) || 
  item.organiser.toLowerCase().includes(search.toLowerCase()) || 
  item.description.toLowerCase().includes(search.toLowerCase()) : true) &&
  (selectedTags.length > 0 ? item.tags.some(tag => selectedTags.includes(tag.key) && tag.value === true) : true) &&
  (attendantSearch ? item.attendants.some(attendant => attendant.toLowerCase().includes(attendantSearch.toLowerCase())) : true)
);

const sortList = filteredList.sort((a, b) => {
  return new Date(a.date).getTime() - new Date(b.date).getTime() ;
});


//   console.log('List component rendering with data:', find)

  return (
    <>
   <SafeAreaView style={ListStyles.container}>
      <ScrollView
        contentContainerStyle={ListStyles.scrollView}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
           <SearchBar search={search} setSearch={setSearch} />
          <Filter
            open={open}
            setOpen={setOpen}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            tagOptions={tagOptions}
            removeTag={removeTag}
          />
        <FlatList
        data={filteredList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
            <View style={ListStyles.itemContainer}>
            <Meet meetup={item} onDelete={handleDelete}/>
            </View>
        )}
        />
         </ScrollView>
    </SafeAreaView>
     
    </>
   
  );
};

export default List;