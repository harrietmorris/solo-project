import React from 'react';
import { Searchbar } from 'react-native-paper';
import SearchStyles from '../styling/components/search';

interface SearchBarProps{
  search: string;
  setSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  return (
    <Searchbar
      placeholder="Search..."
      onChangeText={(text) => setSearch(text)}
      value={search}
      style={SearchStyles.searchBar}
    />
  );
};

export default SearchBar;