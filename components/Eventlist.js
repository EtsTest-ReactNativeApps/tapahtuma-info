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
      "https://infinite-waters-68003.herokuapp.com/open-api.myhelsinki.fi/v1/events/",
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

        const sortedEvents = responseData.data.sort(function (a, b) {
          return (a.event_dates.starting_day < b.event_dates.starting_day) ? -1 : ((a.event_dates.starting_day > b.event_dates.starting_day) ? 1 : 0);
        });
        console.log(sortedEvents)
        setListItems(sortedEvents);
        setListItemsKeep(sortedEvents);
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

  const renderItem = (item) => {
    return <Event item={item} />;
  };

  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <Search
        keepLista={listItemsKeep}
        parentCallback={callBackFunction}
      />
      <FlatList
        style={{ marginLeft: 10 }}
        data={listItems}
        initialNumToRender={10}
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
