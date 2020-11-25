import { StatusBar } from "expo-status-bar";
import React from "react";
import moment from "moment";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
  ToastAndroid,
} from "react-native";

export default function EventScreen({ navigation, route }) {
  const { propsItem } = route.params;

  let location =
    propsItem.item.location.address.street_address +
    ", " +
    propsItem.item.location.address.locality;

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
    image = { uri: propsItem.item.description.images[0].url };
  } else {
    image = {
      uri:
        "http://kasperstromman.com/wp-content/uploads/2017/05/HelsinkiIlme.jpg",
    };
  }

  let title;
  if (propsItem.item.name.fi !== null) {
    title = propsItem.item.name.fi;
  } else if (propsItem.item.name.en !== null) {
    title = propsItem.item.name.en;
  }

  //CHECK MYÖHEMMIN OLIKO EXPOSSA VAAN VIKA,
  //ei näytä alkaneesta tapahtumasta alku ja loppupvää
  let newDate;
  if (
    moment(propsItem.item.event_dates.starting_day).format("DD.MM.YYYY") ===
    moment(propsItem.item.event_dates.ending_day).format("DD.MM.YYYY")
  ) {
    newDate = moment(propsItem.item.event_dates.starting_day).format(
      "DD.MM.YYYY"
    );
  } else if (propsItem.item.event_dates.ending_day === null) {
    newDate = moment(propsItem.item.event_dates.starting_day).format(
      "DD.MM.YYYY"
    );
  } else {
    newDate =
      moment(propsItem.item.event_dates.starting_day).format("DD.MM.") +
      " - " +
      moment(propsItem.item.event_dates.ending_day).format("DD.MM.YYYY");
  }

  const newHours = moment(propsItem.item.event_dates.starting_day).format(
    "H:mm"
  );

  let htmlToWebView = propsItem.item.description.body;

  return (
    <View style={styles.EventListContainer}>
      <Image
        style={styles.Image}
        source={image}
        progressiveRenderingEnabled={true}
      />

      <Text style={{ fontWeight: "bold", padding: 5 }}>{title}</Text>
      <View style={styles.Infobox}>
        <Text>
          <Ionicons name="md-calendar" /> {newDate}
        </Text>
        <Text>
          <Ionicons name="md-time" /> {newHours}
        </Text>
        <Text
          onPress={() => navigation.navigate("EventMapScreen", { location })}
        >
          <Ionicons name="md-pin" /> Näytä kartalta
        </Text>
        <Text>
          <Ionicons name="md-globe" />{" "}
          {propsItem.item.location.address.street_address},{" "}
          {propsItem.item.location.address.postal_code}{" "}
          {propsItem.item.location.address.locality}
        </Text>
        <Text onPress={() => navigation.navigate("Restaurants", { propsItem })}>
          <Ionicons name="md-restaurant" /> Näytä lähimmät ravintolat
        </Text>
      </View>
      <WebView
        source={{ html: htmlToWebView }}
        style={{ flex: 1, flexWrap: "wrap", position: "relative" }}
      ></WebView>
      <Text style={styles.Infobox}>
        <Ionicons name="md-link" />{" "}
        <Text style={{ padding: 10 }} onPress={() => isLinkAvailable()}>
          Linkki tapahtuman sivuille
        </Text>
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  EventListContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  ActivityIndicator: {
    flex: 1,
  },
  Image: {
    flex: 1,
  },
  Infobox: {
    padding: 5,
  },
});
