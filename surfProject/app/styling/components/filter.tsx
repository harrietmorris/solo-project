
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
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
      },
      tagText: {
        marginRight: 5,
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
     

})

export default FilterStyles