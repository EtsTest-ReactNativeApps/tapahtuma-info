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
  Image,
} from "react-native";

export default function Event(props) {
  // const [picture, setPicture] = React.useState();
  // const [title, setTitle] = React.useState();
  // const [eDate, setEDate] = React.useState();
  // const [address, setAddress] = React.useState();
  //<Image>{}</Image>
  //<Date>{props.item.event_dates.starting_day}</Date>

  let image;

  if (props.item.description.images[0]) {
    console.log(props.item.description.images[0]);
    image = { uri: props.item.description.images[0].url };
  } else {
    image = {
      uri:
        "https://i.media.fi/incoming/2314031.JPG/alternates/FREE_1440/2314031.JPG",
    };
  }

  return (
    <View style={styles.EventContainer}>
      <Image style={{ width: 50, height: 50 }} source={image} />
      <Text>{props.item.name.fi}</Text>
      <Text>{props.item.location.address.street_address}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  EventContainer: {
    marginHorizontal: 20,
    marginTop: 0,
    flexDirection: "column",
    marginLeft: 10,
  },
});
