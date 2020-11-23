import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { Icon } from 'react-native-elements'
import { StyleSheet, Text, View } from "react-native";

export default function EventMapScreen({ navigation, route }) {
  const { eventCoordsMap } = route.params;
  const { listItems } = route.params;

  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState(
    {
      latitude: 60.169587,
      longitude: 24.938201,
      latitudeDelta: 0.3,
      longitudeDelta: 0.3,
    }
  );

  let fetchRestaurant = [];
  for (let i = 0; i < listItems.length; i++) {
    fetchRestaurant.push(
      "&location=" + listItems[i].location.lat + "," + listItems[i].location.lon
    );
  }
  // console.log(fetchRestaurant);
  //Ei toimi vielä oikein

  useEffect(() => {
    fetchCoordinates();
  }, [])


  const fetchCoordinates = () => {
    fetch(
      "https://www.mapquestapi.com/geocoding/v1/batch?&inFormat=kvp&outFormat=json&thumbMaps=false&maxResults=1&location=" +
      eventCoordsMap +
      fetchRestaurant +
      "&key=8oxL5Ltp3U33rpNEe7Rqbc47hfQDafLT"
    )
      .then((res) => res.json())
      .then((data) => {
        setRegions(data);
        setRegion({
          latitude: data.results[0].locations[0].latLng.lat,
          longitude: data.results[0].locations[0].latLng.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        })
      })
  };
  console.log(regions, "Regions");

  // let mapMarkers = Object.keys(regions).map((marker, index) => {
  //   console.log(marker,index)
  //   return <Marker key={index} coordinate={marker.results.locations.latlng} />
  // });

  /**
  setRegion({
          latitude: data.results[0].locations[0].latLng.lat,
          longitude: data.results[0].locations[0].latLng.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        })
          {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker.latlng} title={marker.title} />
        ))}
        />
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          {regions.map((marker, index) => (
          <Marker key={index} coordinate={marker.latlng} />
        ))}
        />*/

  if (regions.length === 0) {
    return <Text>Loading...</Text>
  } else {

    return (
      <View style={styles.EventMapContainer}>
        <MapView
          style={{ flex: 6 }}
          region={region}
        >
          {regions.results.slice(1, regions.length).map((marker, index) => {
            console.log(marker, index)
            return <Marker
              key={index}
              image={require('../assets/baseline_restaurant_menu_black_48dp.png')}
              coordinate={{ latitude: marker.locations[0].latLng.lat, longitude: marker.locations[0].latLng.lng }}
              title={marker.locations[0].street}
            />
          })}
          <Marker
            key={230}
            coordinate={{ latitude: regions.results[0].locations[0].latLng.lat, longitude: regions.results[0].locations[0].latLng.lng }}
            title="Tapahtuma"
          />
        </MapView>
        <View style={styles.container}>
          <StatusBar style="auto" />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  EventMapContainer: {
    flex: 1,
  },
});
