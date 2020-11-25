import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet, Text, View } from "react-native";

export default function EventMapScreen({ navigation, route }) {
  const { location } = route.params;

  const [region, setRegion] = useState({
    latitude: 60.169587,
    longitude: 24.938201,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });

  const fetchCoordinates = () => {
    fetch(
      "http://www.mapquestapi.com/geocoding/v1/address?key=8oxL5Ltp3U33rpNEe7Rqbc47hfQDafLT&location=" +
        location
    )
      .then((res) => res.json())
      .then((data) =>
        setRegion({
          latitude: data.results[0].locations[0].latLng.lat,
          longitude: data.results[0].locations[0].latLng.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        })
      );
  };

  return (
    <View style={styles.EventMapContainer}>
      <Text style={styles.AddressText}>{location}</Text>
      <MapView
        onMapReady={fetchCoordinates}
        style={{ flex: 6 }}
        region={region}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
      </MapView>
      <View style={styles.container}>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  EventMapContainer: {
    flex: 1,
    marginTop: 30,
  },
  AddressText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "right",
    padding: 10,
  },
});
