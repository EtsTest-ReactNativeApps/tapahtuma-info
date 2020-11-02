import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
//import ReactTable from "react-table-v6";
import { useNavigation } from "@react-navigation/native";
import { getDistance, orderByDistance } from "geolib";

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
} from "react-native";
import { add } from "react-native-reanimated";

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

  async function fetchData() {
    fetch(
      "http://open-api.myhelsinki.fi/v1/places/?tags_search=Restaurant&distance_filter=" +
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

  const orderByDistance = () => {
    orderByDistance(eventCoords, {
      latitude: item.location.lat,
      longitude: item.location.lon,
    });
  };

  let imageIcon;
  const iconPhoto = (item) => {
    if (item.description.images.length > 0) {
      imageIcon = { uri: item.description.images[0].url };
    } else {
      imageIcon = {
        uri:
          "https://cdn.pixabay.com/photo/2016/09/13/18/38/silverware-1667988_1280.png",
      };
    }
  };
  //tulostaa 1 maanantain kohdalla, su on 0

  let day = new Date().getDay();
  let dayArr;
  if (day === 0) {
    dayArr = 7;
  } else {
    dayArr = day - 1;
  }

  let openingHours;
  const hours = (item) => {
    if (item.opening_hours.hours[dayArr].opens === null) {
      openingHours = "Suljettu";
    } else {
      openingHours =
        "Aukiolo: " +
        item.opening_hours.hours[dayArr].opens.substring(0, 5) +
        " - " +
        item.opening_hours.hours[dayArr].closes.substring(0, 5);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const renderItem = (item) => {
    iconPhoto(item);
    hours(item);
    return (
      { orderByDistance },
      (
        <View style={styles.listItem}>
          <View
            style={{ marginRight: 10, marginLeft: 10, alignItem: "center" }}
          >
            <Image
              progressiveRenderingEnabled={true}
              style={{ width: 55, height: 55 }}
              source={imageIcon}
            />
          </View>
          <View>
            <Text
              onPress={() => Linking.openURL(item.info_url)}
              style={{ fontSize: 15, fontWeight: "bold" }}
            >
              {item.name.fi}
            </Text>
            <Text>{item.location.address.street_address}</Text>
            <Text>
              Etäisyys:{" "}
              {getDistance(eventCoords, {
                latitude: item.location.lat,
                longitude: item.location.lon,
              })}{" "}
              m
            </Text>
            <Text>{openingHours}</Text>
          </View>
        </View>
      )
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={listItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderItem(item)}
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
});

//marginTop: 10, marginLeft: 10
