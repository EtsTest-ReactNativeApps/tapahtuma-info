import { StatusBar } from 'expo-status-bar';
import React from 'react';
import ReactTable from "react-table-v6";
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert} from 'react-native';


function App() {

  const [listItems, setListItems] = React.useState([]);
  const [text,setText] = React.useState("")

  function fetchData() {
    fetch('http://open-api.myhelsinki.fi/v1/activities/', {mode: "cors"})
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData)
        setListItems(responseData.data);
      })
      .catch((error) => { Alert.alert('Error', error); }); 
  }


  React.useEffect(() => {
    fetchData();
  }, []);




  return (
    <View>
      <FlatList data={listItems} renderItem={({ item }) =>
        <Text>{item.key}
        </Text>}
      />
    </View>
  );
}

export default App;
