import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
//import ReactTable from "react-table-v6";

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

export default function Restaurants() {
  const [listItems, setListItems] = React.useState([]);
  const [ravintolaLista, setRavintolaLista] = React.useState([]);
  const [text, setText] = React.useState("");

  const filterRestaurant = (d) =>
    d.tags.length > 2 && d.tags[2].name === "Restaurant";

  async function fetchData() {
    fetch(
      "https://cors-anywhere.herokuapp.com/open-api.myhelsinki.fi/v1/places/",
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
        setListItems(responseData.data.filter(filterRestaurant));
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const renderItem = (item) => {
    return (
      <Text
        onPress={() => Linking.openURL(item.info_url)}
        style={{ fontSize: 15 }}
      >
        {item.name.fi}
      </Text>
    );
  };

  return (
    <View style={{flex:1,marginTop:30,marginLeft:10}}>
      <FlatList
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
  },
});

/**{listItems.map((item) => (
        <Text
          onPress={() => Linking.openURL(item.info_url)}
          style={{ fontSize: 20 }}
          key={item.id}
        >
          {item.name.fi}
        </Text>
      ))} */
