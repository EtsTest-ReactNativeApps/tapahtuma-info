import { StatusBar } from "expo-status-bar";
import React from "react";

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
      "https://cors-anywhere.herokuapp.com/open-api.myhelsinki.fi/v1/activities/",
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
        setListItemsKeep(responseData.data)
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }


  function callBackFunction(newData){
    setListItems(newData)
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{flex:1}}>
      <Search lista={listItems} keepLista={listItemsKeep} parentCallback={callBackFunction}/>
      <ScrollView style={styles.HistoryContainer}>
        {listItems.map((item) => (
          <Text
            onPress={() => Linking.openURL(item.info_url)}
            style={{ fontSize: 20 }}
            key={item.id}
          >
            {item.name.fi}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  HistoryContainer: {
    marginHorizontal: 20,
    frontSize: 5,
    marginTop: 50,
    flexDirection: "column",
  },
});
