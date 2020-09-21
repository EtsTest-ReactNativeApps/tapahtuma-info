import { StatusBar } from "expo-status-bar";
import React from "react";
import Event from "./Event";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Alert,
  ScrollView,
  Linking,
} from "react-native";

import Search from "./Search";

export default function Eventlist() {
  const [listItems, setListItems] = React.useState([]);
  const [listItemsKeep, setListItemsKeep] = React.useState([]);
  const [text, setText] = React.useState("");

  function fetchData() {
    fetch(
      "https://cors-anywhere.herokuapp.com/open-api.myhelsinki.fi/v1/events/?limit=100",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: "x-requested-with",
        },
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setListItems(responseData.data);
        setListItemsKeep(responseData.data);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }

  function callBackFunction(newData) {
    setListItems(newData);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

<<<<<<< HEAD

  const renderItem = item => {
    return (
      <Text
        onPress={() => Linking.openURL(item.info_url)}
        style={{ fontSize: 15 }}>
        {item.name.fi}
      </Text>
    )
  }

  return (
    <View style={{ flex: 1, marginTop: 30}}>
      <Search lista={listItems} keepLista={listItemsKeep} parentCallback={callBackFunction} />
=======
  const renderItem = (item) => {
    return <Event item={item} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <Search
        lista={listItems}
        keepLista={listItemsKeep}
        parentCallback={callBackFunction}
      />
>>>>>>> 98172a219aef2e47b4fdf6d4450156cc28de243f
      <FlatList
        style={{marginLeft:10}}
        data={listItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderItem(item)}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  HistoryContainer: {
    marginHorizontal: 20,
    marginTop: 50,
    flexDirection: "column",
    marginLeft: 10,
  },
});
/* {listItems.map((item) => (
  <Text
  onPress={() => Linking.openURL(item.info_url)}
  style={{ fontSize: 20 }}
  key={item.id}
>
  {item.name.fi}
</Text>
))}*/
