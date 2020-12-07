
import React, { Component } from "react";
import { StyleSheet, Text, View, Button, FlatList, Alert } from "react-native";
import RestaurantCard from "./RestaurantCard";

export default function Restaurants({ navigation, route }) {
  const { propsItem } = route.params;

  const [listItems, setListItems] = React.useState([]);

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
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
