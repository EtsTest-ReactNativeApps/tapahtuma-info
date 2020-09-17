import { StatusBar } from "expo-status-bar";
import React from "react";
//import ReactTable from "react-table-v6";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Alert,
  ScrollView,
  Linking,
} from "react-native";

export default function Eventlist() {
  const [listItems, setListItems] = React.useState([]);
  const [text, setText] = React.useState("");

  /*

  function fetchData(){
    fetch("http://open-api.myhelsinki.fi/v1/events/", {
      method: "GET",
      mode: "no-cors",
      headers: {
        "content-type": "application/json"
      }
    })
    .then(responseData => responseData)
    .then(responseData => console.log(responseData))
  }

*/

  function fetchData() {
    fetch(
      "https://cors-anywhere.herokuapp.com/open-api.myhelsinki.fi/v1/activities/",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: "x-requested-with",
        },
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.data[0]);
        setListItems(responseData.data);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.HistoryContainer}>
      {listItems.map((item) => (
        <Text
          onPress={() => Linking.openURL(item.info_url)}
          style={{ fontSize: 20 }}
          key={item.id}
        >
          {item.name.fi}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  HistoryContainer: {
    marginHorizontal: 20,
    frontSize: 5,
    marginTop: 50,
    flexDirection: "column",
  },
});
