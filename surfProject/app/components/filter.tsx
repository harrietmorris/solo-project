import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import FilterStyles from '../styling/components/filter';



// interface TagOption {
//     label: string;
//     value: string;
//   }

interface FilterProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  tagOptions: string[];
  removeTag: (tag: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  open, setOpen, selectedTags, setSelectedTags, tagOptions, removeTag
}) => {


  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else{
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <>

       <View style={FilterStyles.selectedTagsContainer}>
        {tagOptions.map((tag, index) => (
            <TouchableOpacity 
              key={index}
              onPress={() => toggleTag(tag)}
              style={[FilterStyles.tag,
              selectedTags.includes(tag) && FilterStyles.selectedTag
          ]} >
          <Text style={FilterStyles.tagText}>{tag}</Text>
            </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default Filter;