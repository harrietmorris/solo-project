
import { StyleSheet } from "react-native";

const FilterStyles = StyleSheet.create({

    selectedTagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
        zIndex: 1000,
      },
      tagBubble: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
      },
      tagText: {
        marginRight: 5,
        color: '#000'
      },
      removeTagText: {
        color: 'red',
        fontWeight: 'bold',
      },
      dropdownContainer: {
        maxHeight: 200,
      },
      dropdown: {
        marginBottom: 10,
      },
      tag: {
        padding: 10,
        margin: 5,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f0f0f0',
      },
      selectedTag: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
      },
     

})

export default FilterStyles