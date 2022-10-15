/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity
} from 'react-native';
import realm, {
  getAllBooks,
  addBook,
  deleteAllBooks,
  updateAllBookEditions,
  getBigBooks,
  getAllAuthors,
  getAuthorById,
  addAuthor,
  deleteAllAuthors,
  getAvgPages
} from "./Database";

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


const App = () => {
  const [books, setBooks] = useState(getAllBooks());
  const [authors, setAuthors] = useState(getAllAuthors());
  const isDarkMode = useColorScheme() === 'dark';
  const windowHeight = Dimensions.get('window').height;
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : "#fff",
  };

  const renderBooksButtons = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity style={{ paddingTop: 8 }}
        onPress={() => {
          // Create a book with random amount of pages and author by id 0.
          addBook("Chronicles of JavaScript", Math.floor(Math.random() * 500), null, getAuthorById(0)[0])
          setBooks(getAllBooks())
        }}><Text>Add book</Text></TouchableOpacity>

      <TouchableOpacity style={{ paddingTop: 8 }}
        onPress={() => {
          updateAllBookEditions()
          setBooks(getAllBooks())
        }}><Text>Update edition</Text></TouchableOpacity>

      <TouchableOpacity style={{ paddingTop: 8 }}
        onPress={() => {
          deleteAllBooks()
          setBooks(getAllBooks())
        }}><Text>Delete all books</Text></TouchableOpacity>
    </View>
  );

  const renderBooks = () => (
    <>
      <Text style={{ marginTop: 8, fontWeight: 'bold' }}>Books</Text>
      {books.map((item, i) => (
        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>{item.title}</Text>
          <Text>{item.pages}</Text>
          <Text>{item.edition === null ? 'null' : item.edition}</Text>
          <Text>{item.author === null ? 'null' : item.author.firstName + ' ' + item.author.lastName}</Text>
        </View>

      ))}
    </>
  )

  const renderAuthorsButtons = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ paddingTop: 8 }}
        onPress={() => {
          addAuthor("FirstN", "LastN")
          setBooks(getAllBooks())
        }}>Add author</Text>

      <Text style={{ paddingTop: 8 }}
        onPress={() => {
          deleteAllAuthors()
          setBooks(getAllBooks())
        }}>Delete all authors</Text>
    </View>
  )

  const renderAuthors = () => (
    <>
      <Text style={{ marginTop: 8, fontWeight: 'bold' }}>Authors</Text>
      {authors.map((item, i) => (
        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>{item.id} 123</Text>
          <Text>{item.firstName + ' - ' + item.lastName}</Text>
        </View>
      ))}
    </>
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[backgroundStyle, styles.sectionContainer]}>
      <View
        style={{
          padding: 24,
          marginBottom: 0,
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          minHeight: windowHeight ,
          borderRadius: 12,
        }}>
        {renderBooksButtons()}
        {renderBooks()}
        <View style={{
          width: '100%',
          backgroundColor: '#000000',
          height: 1,
          marginVertical: 8
        }} />
        {renderAuthorsButtons()}
        {renderAuthors()}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    // padding: 24,
    backgroundColor: '#eee',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
