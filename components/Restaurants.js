import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
//import ReactTable from "react-table-v6";
import { useNavigation } from "@react-navigation/native";
import { getDistance, orderByDistance } from "geolib";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "react-native-elements";

import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  FlatList,
  Alert,
  ScrollView,
  Linking,
  Modal,
  TouchableHighlight,
} from "react-native";
import RestaurantCard from "./RestaurantCard";

export default function Restaurants({ navigation, route }) {
  const { propsItem } = route.params;

  const [listItems, setListItems] = React.useState([]);
  const [ravintolaLista, setRavintolaLista] = React.useState([]);
  const [text, setText] = React.useState("");

  const distanceFilter =
    propsItem.item.location.lat + "," + propsItem.item.location.lon + "," + 2;

  let eventCoords = {
    latitude: propsItem.item.location.lat,
    longitude: propsItem.item.location.lon,
  };

  let eventCoordsMap =
    propsItem.item.location.lat + "," + propsItem.item.location.lon;

  async function fetchData() {
    fetch(
      "http://open-api.myhelsinki.fi/v1/places/?tags_search=Restaurant&limit=20&distance_filter=" +
        distanceFilter
    )
      .then((response) => response.json())
      .then((responseData) => {
        setListItems(responseData.data);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }

  //OSAA LASKEA ETÄISYYDEN VERTAILUKOHDAKSI TÄYTYY VIELÄ MUUTTAA RAVINTOLA
  //JA FILTERÖIDÄ ETÄISYYDEN MUKAAN 10 LÄHINTÄ

  React.useEffect(() => {
    fetchData();
  }, []);

  const EmptyListMessage = ({ item }) => {
    return (
      <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
        Ei ravintoloita lähettyvillä
      </Text>
    );
  };

  const renderItem = (item) => {
    return (
      <RestaurantCard item={item} eventCoords={eventCoords}></RestaurantCard>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Näytä kartalla"
        onPress={() =>
          navigation.navigate("RestaurantMap", { eventCoordsMap, listItems })
        }
      ></Button>
      <FlatList
        data={listItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderItem(item)}
        ListEmptyComponent={EmptyListMessage}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: "row",
    borderWidth: 1,
    //padding: 5,
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});
