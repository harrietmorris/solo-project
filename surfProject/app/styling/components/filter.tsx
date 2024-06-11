
import { StyleSheet } from "react-native";

const FilterStyles = StyleSheet.create({

    selectedTagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
      },
      tagBubble: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D36D3D',
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
        borderColor: '#DD824D',
        backgroundColor: '#FBC29B',
      },
      selectedTag: {
        backgroundColor: '#9CC0E9',
        borderColor: '#4D689D',
      },
     

})

export default FilterStyles