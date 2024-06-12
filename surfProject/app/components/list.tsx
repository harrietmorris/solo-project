import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text,  RefreshControl, ScrollView, SafeAreaView, } from 'react-native';
import { useDataContext } from '../context/MeetsContext';
import Meet from '../components/meet'
import { MeetType } from '../type/Types';
import ListStyles from '../styling/components/list';
import Filter from './filter';
import SearchBar from './search';
import { deleteMeet, getMeets } from '../service/ApiService';
import { ListType } from '../type/ListType';
// import MapComp from './maps';



const List = () => {
  const context = useDataContext();
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState<ListType[]>([])
  const [search, setSearch] = useState('');
  const [attendantSearch, setAttendantSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagOptions, setTagOptions] = useState<string[]>([]);

  
  if (!context) {
    return <Text > ...Loading </Text>
  }
  
  const { find } = context;
  
  useEffect(() => {
    const dateNow = new Date();
    const future = find.filter(event => new Date(event.date) >= dateNow);
    setList(future);
    const allTags = [...new Set(future.flatMap(item => item.tags))];
    setTagOptions(allTags);
  }, [find]);


  

  const onRefresh =  async () => {
    setRefreshing(true);
    try {
      const response = await getMeets();
      if (response && response.data) {
        const dateNow = new Date();

        if (!Array.isArray(response.data)) {
          console.error("response.data is not an array:", response.data);
          return;
      }
      
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
  (selectedTags.length > 0 ? selectedTags.every(tag => item.tags.includes(tag)) : true) &&
  (attendantSearch ? item.attendants.some(attendant => attendant.toLowerCase().includes(attendantSearch.toLowerCase())) : true)
);

const sortList = filteredList.sort((a, b) => {
  return new Date(a.date).getTime() - new Date(b.date).getTime() ;
});

// const markers = list.map(item => JSON.parse(item.location));


//   console.log('List component rendering with data:', find)

  return (
    <>
   <SafeAreaView style={ListStyles.container}>
      
        {/* <MapComp initialPosition={markers[0]} markers={markers} onMarkerPositionChanged={() => {}} /> */}
    
        <FlatList
        data={sortList}
        keyExtractor={item => item?._id.toString()}
        renderItem={({ item, index }) => (
            <View style={ListStyles.itemContainer}>
            {/* <Meet meetup={item} onDelete={handleDelete} /> */}
            <Meet key={index} meetup={item} onDelete={handleDelete} />
            </View>
        )}
       
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
            <SearchBar search={search} setSearch={setSearch} />
            <Filter
              open={open}
              setOpen={setOpen}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              tagOptions={tagOptions}
              removeTag={removeTag}
              

            />
          </>
        }
        />
  
    </SafeAreaView>
     
    </>
   
  );
};

export default List;