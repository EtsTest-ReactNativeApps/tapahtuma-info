import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet, Text, View } from "react-native";

export default function EventMapScreen({ navigation, route }) {
  const { eventCoordsMap } = route.params;
  const { listItems } = route.params;

  const [region, setRegion] = useState(
    {
      latitude: 60.169587,
      longitude: 24.938201,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    },
    []
  );

  let fetchRestaurant = [];
  for (let i = 0; i < listItems.length; i++) {
    fetchRestaurant.push(
      "&location=" + listItems[i].location.lat + "," + listItems[i].location.lon
    );
  }
  console.log(fetchRestaurant);
  //Ei toimi vielä oikein
  const fetchCoordinates = () => {
    fetch(
      "https://www.mapquestapi.com/geocoding/v1/batch?&inFormat=kvp&outFormat=json&thumbMaps=false&maxResults=1&location=" +
        eventCoordsMap +
        fetchRestaurant +
        "&key=8oxL5Ltp3U33rpNEe7Rqbc47hfQDafLT"
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

  /**

          {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker.latlng} title={marker.title} />
        ))}
        />*/
  return (
    <View style={styles.EventMapContainer}>
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
  },
});
