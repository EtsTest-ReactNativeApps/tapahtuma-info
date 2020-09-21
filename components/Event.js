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
import moment from "moment";

export default function Event(props) {
  // const [picture, setPicture] = React.useState();
  // const [title, setTitle] = React.useState();
  // const [eDate, setEDate] = React.useState();
  // const [address, setAddress] = React.useState();
  //<Image>{}</Image>
  //<Date>{props.item.event_dates.starting_day}</Date>

  let image;

  if (props.item.description.images[0]) {
    // console.log(props.item.description.images[0]);
    image = { uri: props.item.description.images[0].url };
  } else {
    image = {
      uri:
        "http://kasperstromman.com/wp-content/uploads/2017/05/HelsinkiIlme.jpg",
    };
  }

  var newDate = moment(props.item.event_dates.starting_day).format(
    "DD.MM.YYYY, H:mm"
  );

  let title;                            // Tarkastetaan onko suomenkielistä name atribuuttia saatavilla
  if (props.item.name.fi !== null){     // jos ei ole käytetään englanninkieleistä
    title = props.item.name.fi
  }else if(props.item.name.en !== null){
    title = props.item.name.en
  }

  return (
    <View style={styles.EventContainer}>
      <View style={{ marginRight: 10 }}>
        <Image style={{ width: 55, height: 55 }} source={image} />
      </View>
      <View>
        <Text
          onPress={() => Linking.openURL(props.item.info_url)}
          style={{ fontWeight: "bold" }}>
          {title}
        </Text>
        <Text>{newDate}</Text>
        <Text>{props.item.location.address.street_address}</Text>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  EventContainer: {
    flex:1,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
    borderWidth: 1,
    padding: 5,
  },
});
