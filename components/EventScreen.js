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
} from "react-native";

export default function EventPage({navigation, route}) {
  //image
  //title
  //pvm,klo
  //osoite
  //description
  //linkki

  const {propsItem} = route.params

  //const Stack = createStackNavigator();

  return (
    <View style={styles.EventListContainer}>
     <Text style={{fontSize:40}}>Event page</Text>
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
