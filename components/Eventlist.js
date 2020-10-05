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
  ActivityIndicator,
} from "react-native";

import Search from "./Search";

export default function Eventlist() {
  const [listItems, setListItems] = React.useState([]);
  const [listItemsKeep, setListItemsKeep] = React.useState([]);
  const [isReady, setReady] = React.useState(false);

  function fetchData() {
    fetch(
      "http://open-api.myhelsinki.fi/v1/events/",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseData) => {

        const sortedEvents = responseData.data.sort(function (a, b) {
          return (a.event_dates.starting_day < b.event_dates.starting_day) ? -1 : ((a.event_dates.starting_day > b.event_dates.starting_day) ? 1 : 0);
        });

        let today = new Date().toISOString();

        const filterDates = sortedEvents.filter(function (a) {
          return a.event_dates.starting_day >= today;
        })

        setListItems(filterDates);
        setListItemsKeep(filterDates);
        setReady(true);
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

  if (!isReady) {
    return (
      <View style={styles.EventListContainer}>
        <Search
          keepLista={listItemsKeep}
          parentCallback={callBackFunction}
        />
        <ActivityIndicator style={styles.ActivityIndicator} size="large" />
      </View>
    )
  }


  return (
    <View style={styles.EventListContainer}>
      <Search
        keepLista={listItemsKeep}
        parentCallback={callBackFunction}
      />
      <FlatList
        style={{ marginLeft: 10 }}
        data={listItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderItem(item)}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  EventListContainer: {
    flex: 1,
    marginTop: 30
  },
  ActivityIndicator: {
    flex: 1,
  },
});
