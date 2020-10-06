import { StatusBar } from "expo-status-bar";
import React from "react";
import Event from "./Event";

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
} from "react-native";

export default function EventScreen({ navigation, route }) {
  //image
  //title
  //pvm,klo
  //osoite
  //description
  //linkki
  const { propsItem } = route.params;

  /*
  const isLinkAvailable = () => {
    if (props.item.info_url !== null) {
      Linking.openURL(props.item.info_url);
    } else {
      ToastAndroid.showWithGravity(
        "Linkkiä ei valitettavasti ole saatavilla",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };
*/
  return (
    <View style={styles.EventListContainer}>
      <Text style={{ fontSize: 40 }}>Event page</Text>
      <Text>{propsItem.name.fi}</Text>
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
