import { StatusBar } from "expo-status-bar";
import React from "react";
import Event from "./Event";
import DatePicker from "react-native-datepicker";
import Search from "./Search";
import moment from "moment";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
  ActivityIndicator,
} from "react-native";

export default function Homepage({ route, navigation }) {
  const [listItems, setListItems] = React.useState([]);
  const [listItemsKeep, setListItemsKeep] = React.useState([]);
  const [isReady, setReady] = React.useState(false);
  const [date, setDate] = React.useState("");

  function fetchData() {
    fetch("http://open-api.myhelsinki.fi/v1/events/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseData) => {
        const sortedEvents = responseData.data.sort(function (a, b) {
          return a.event_dates.starting_day < b.event_dates.starting_day
            ? -1
            : a.event_dates.starting_day > b.event_dates.starting_day
            ? 1
            : 0;
        });

        let today = new Date().toISOString();

        const filterDates = sortedEvents.filter(function (a) {
          return a.event_dates.starting_day >= today;
        });

        setListItems(filterDates);
        setListItemsKeep(filterDates);
        setReady(true);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }

  function callBackFunction(newData) {
    setListItems(newData);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const renderItem = (item) => {
    return <Event navigation={props.navigation} item={item} />;
  };

  if (!isReady) {
    return (
      <View style={styles.HomepageContainer}>
        <Search keepLista={listItemsKeep} parentCallback={callBackFunction} />
        <ActivityIndicator style={styles.ActivityIndicator} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.HomepageContainer}>
      <Text style={styles.TextContainer}> Löydä tapahtumat </Text>
      <Search keepLista={listItemsKeep} parentCallback={callBackFunction} />
      <Text style={{ marginLeft: 10 }}>Päivämäärä</Text>
      <View style={styles.Buttons}>
        <Button
          title="Tänään"
          onPress={() => navigation.navigate("Eventlist", { data: listItems })}
        />
        <Button
          title="Tänään"
          onPress={() => navigation.navigate("Eventlist", { data: listItems })}
        />

        <DatePicker
          style={{ width: 200 }}
          date={date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="Valitse päivämäärä"
          format="DD-MM-YYYY"
          minDate="04-10-2020"
          maxDate="01-01-2022"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) =>
            navigation.navigate("Eventlist", { data: data })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HomepageContainer: {
    flex: 1,
    marginTop: 30,
  },
  ActivityIndicator: {
    flex: 1,
  },
  TextContainer: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 10,
  },
  Buttons: {
    flexDirection: "row",
    marginLeft: 10,
  },
});
