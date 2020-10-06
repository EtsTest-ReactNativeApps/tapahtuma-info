import { StatusBar } from "expo-status-bar";
import React from "react";
import Event from "./Event";
import { WebView } from "react-native-webview";

//import { createStackNavigator } from "@react-navigation/stack";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  ScrollView,
  Linking,
  ActivityIndicator,
  Image,
  ToastAndroid,
} from "react-native";

export default function EventScreen({ navigation, route }) {
  //image
  //title
  //pvm,klo
  //osoite
  //description
  //linkki
  const { propsItem } = route.params;

  const isLinkAvailable = () => {
    if (propsItem.item.info_url !== null) {
      Linking.openURL(propsItem.item.info_url);
    } else {
      ToastAndroid.showWithGravity(
        "Linkkiä ei valitettavasti ole saatavilla",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };
  let image;
  if (propsItem.item.description.images[0]) {
    // console.log(props.item.description.images[0]);
    image = { uri: propsItem.item.description.images[0].url };
  } else {
    image = {
      uri:
        "http://kasperstromman.com/wp-content/uploads/2017/05/HelsinkiIlme.jpg",
    };
  }

  let title; // Tarkastetaan onko suomenkielistä name atribuuttia saatavilla
  if (propsItem.item.name.fi !== null) {
    // jos ei ole käytetään englanninkieleistä
    title = propsItem.item.name.fi;
  } else if (propsItem.item.name.en !== null) {
    title = propsItem.item.name.en;
  }

  //let description = ;
  // <Text>{description}</Text>
  return (
    <View style={styles.EventListContainer}>
      <Image
        progressiveRenderingEnabled={true}
        style={{ flex: 1 }}
        source={image}
      />
      <Text style={{ fontWeight: "bold", padding: 10 }}>{title}</Text>
      <WebView source={{ html: propsItem.item.description.body }}></WebView>
      <Text style={{ padding: 10 }} onPress={() => isLinkAvailable()}>
        Linkki tapahtumaan
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  EventListContainer: {
    flex: 1,
    marginTop: 30,
  },
  ActivityIndicator: {
    flex: 1,
  },
});
