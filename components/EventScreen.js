import { StatusBar } from "expo-status-bar";
import React from "react";
import moment from "moment";
import Event from "./Event";


//import { createStackNavigator } from "@react-navigation/stack";

import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";


export default function EventPage({route, navigation}) {
  //image
  //title
  //pvm,klo
  //osoite
  //description
  //linkki

  const {propsItem} = route.params

  //const Stack = createStackNavigator();

 

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


  const newDate = moment(propsItem.item.event_dates.starting_day).format(
    "DD.MM.YYYY"
  );

  const newHours = moment(propsItem.item.event_dates.starting_day).format(
    "H:mm"
  );


  return (
    <View style={styles.EventListContainer}>
     <Image style={styles.Image}
            source={image}
            progressiveRenderingEnabled={true}
            />
    



     <Text>{newDate}</Text> 
     <Text>{newHours}</Text>
     <Text>{propsItem.item.location.address.street_address}</Text>
     <Text>{propsItem.item.location.address.postal_code} {propsItem.item.location.address.locality}</Text>

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
