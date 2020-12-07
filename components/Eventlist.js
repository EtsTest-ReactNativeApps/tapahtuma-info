import React from "react";
import Event from "./Event";
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";

import Search from "./Search";


export default function Eventlist({ navigation, route }) {

  const [listItems, setListItems] = React.useState([]);
  const [listItemsKeep, setListItemsKeep] = React.useState([]);
  const [isReady, setReady] = React.useState(true);

  function fetchData() {
    let startIndex = 0; //fetcataan 100 eventtiä
    let endIndex = 100;

    fetch(
      "https://l8seb8lrle.execute-api.eu-north-1.amazonaws.com/EventsData/events/?startIndex=" +
      startIndex +
      "&endIndex=" +
      endIndex,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setListItems(responseData);
        setListItemsKeep(responseData);
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
    if (route.params === undefined) {
      fetchData();
    } else {
      const { data } = route.params;
      setListItems(data)
      setListItemsKeep(data)
    }
  }, []);

  const renderItem = (item) => {
    return <Event item={item} />;
  };

  if (!isReady) {
    return (
      <View style={styles.EventListContainer}>
        <Search keepLista={listItemsKeep} parentCallback={callBackFunction} />
        <ActivityIndicator style={styles.ActivityIndicator} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.EventListContainer}>
      <View style={{ margin: 10 }}>
        <Search keepLista={listItemsKeep} parentCallback={callBackFunction} />
      </View>
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
    marginTop: 30,
    backgroundColor: "#FFFFFF",
  },
  ActivityIndicator: {
    flex: 1,
  },
});
