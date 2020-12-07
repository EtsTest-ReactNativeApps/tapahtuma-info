import { StatusBar } from "expo-status-bar";
import React from "react";
import { getDistance } from "geolib";
import { Icon } from "react-native-elements";

import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Linking,
  Modal,
  TouchableHighlight,
} from "react-native";

export let day = new Date().getDay();
export let dayArr;
export const weekdays = [
  "ma ",
  "ti    ",
  "ke  ",
  "to   ",
  "pe  ",
  "la   ",
  "su  ",
];
export let hourMsg = [];

export default function RestaurantCard(props) {
  const [modalVisible, setModalVisible] = React.useState(false);
  let item = props.item;
  let eventCoords = props.eventCoords;

  let imageIcon;
  if (item.description.images.length > 0) {
    imageIcon = { uri: item.description.images[0].url };
  } else {
    imageIcon = {
      uri:
        "https://cdn.pixabay.com/photo/2016/09/13/18/38/silverware-1667988_1280.png",
    };
  }

  let day = new Date().getDay();
  let dayArr;
  if (day === 0) {
    dayArr = 6;
  } else {
    dayArr = day - 1;
  }

  let openingHours;
  if (item.opening_hours.hours[dayArr].opens === null) {
    openingHours = "Suljettu";
  } else {
    openingHours =
      "Aukiolo tänään: " +
      item.opening_hours.hours[dayArr].opens.substring(0, 5) +
      " - " +
      item.opening_hours.hours[dayArr].closes.substring(0, 5);
  }

  const weekdays = ["ma ", "ti    ", "ke  ", "to   ", "pe  ", "la   ", "su  "];

  let hourMsg = [];
  for (let i = 0; i < weekdays.length; i++) {
    hourMsg.push(weekdays[i]);
    if (item.opening_hours.hours[i].opens === null) {
      hourMsg.push("Suljettu \n");
    } else {
      hourMsg.push(
        item.opening_hours.hours[i].opens.substring(0, 5) +
          " - " +
          item.opening_hours.hours[i].closes.substring(0, 5) +
          "\n"
      );
    }
  }

  const alertHours = (item) => {
    setModalVisible(true);
  };

  return (
    <View style={styles.listItem}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Ikkuna suljettu.");
        }}
      >
        <View style={styles.modalView}>
          <Text>{hourMsg}</Text>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text>Sulje</Text>
          </TouchableHighlight>
        </View>
      </Modal>

      <View style={{ marginRight: 10, marginLeft: 10, alignItem: "center" }}>
        <Image style={{ width: 65, height: 65 }} source={imageIcon} />
      </View>
      <View>
        <Text
          onPress={() => Linking.openURL(item.info_url)}
          style={{ fontSize: 16, fontWeight: "bold" }}
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
        <Text>
          {openingHours}
          {"      "}
          <Icon
            type="ionicon"
            name="md-add-circle-outline"
            size={16}
            onPress={(item) => alertHours(item)}
          />
        </Text>
      </View>
      <StatusBar style="auto" />
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
