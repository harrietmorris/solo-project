import { StyleSheet } from "react-native";

const ListStyles = StyleSheet.create({

    container: {
        width: '80%',
        zIndex: 1,
    },
    itemContainer: {
        marginTop: 30,
        borderRadius: 16,
        backgroundColor: '#5680AF',

    },
    scrollView: {
        flexGrow: 1,
    },
    filterContainer: {
        zIndex: 111,
    }
})

export default ListStyles