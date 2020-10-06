import { StatusBar } from "expo-status-bar";
import React from "react";
import moment from "moment";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";


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



  const newDate = moment(propsItem.item.event_dates.starting_day).format(
    "DD.MM.YYYY"
  );

  const newHours = moment(propsItem.item.event_dates.starting_day).format(
    "H:mm"
  );

  //let description = ;
  // <Text>{description}</Text>
  return (
    <View style={styles.EventListContainer}>
    <Image style={styles.Image}
            source={image}
            progressiveRenderingEnabled={true}
            />
      <Text style={{ fontWeight: "bold", padding: 10 }}>{title}</Text>
      <Text>
      <Ionicons name="md-calendar"/>
      <Text>{newDate}</Text> 
      </Text>
      <Text>
      <Ionicons name="md-clock"/>
      <Text>{newHours}</Text>
      </Text>
      <Text>
      <Ionicons name="md-locate"/>
      <Text>{propsItem.item.location.address.street_address}, 
      {propsItem.item.location.address.postal_code} {propsItem.item.location.address.locality}</Text>
      </Text>
      <Text>
      <Ionicons name="md-link"/>
      <Text style={{ padding: 10 }} onPress={() => isLinkAvailable()}>
        Linkki tapahtuman sivuille
      </Text>
      </Text>
      <WebView source={{ html: propsItem.item.description.body }}></WebView>
      
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
  Image: 
  {
  flex: 1,
  },
});
