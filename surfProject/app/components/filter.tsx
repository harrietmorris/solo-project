import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import FilterStyles from '../styling/components/filter';



interface TagOption {
    label: string;
    value: string;
  }

interface FilterProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  tagOptions: TagOption[];
  removeTag: (tag: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  open, setOpen, selectedTags, setSelectedTags, tagOptions, removeTag
}) => {
  return (
    <>
      <DropDownPicker
        open={open}
        value={selectedTags}
        items={tagOptions}
        setOpen={setOpen}
        setValue={setSelectedTags}
        setItems={() => {}}
        multiple={true}
        placeholder="Select tags"
        style={FilterStyles.dropdown}
        dropDownContainerStyle={FilterStyles.dropdownContainer}
      />
      <View style={FilterStyles.selectedTagsContainer}>
        {selectedTags.map(tag => (
          <View key={tag} style={FilterStyles.tagBubble}>
            <Text style={FilterStyles.tagText}>{tag}</Text>
            <TouchableOpacity onPress={() => removeTag(tag)}>
              <Text style={FilterStyles.removeTagText}>x</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </>
  );
};

export default Filter;