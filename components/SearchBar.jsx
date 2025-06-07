import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const SearchBar = () => {
  return (
    <TouchableOpacity onPress={() => router.push('/Search')}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput 
          placeholder="Search any product" 
          placeholderTextColor={'#000'} 
          style={styles.input}
          editable={false}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  searchIcon: {
    marginRight: 5,
  }
}); 