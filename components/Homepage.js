import { StatusBar } from "expo-status-bar";
import React from "react";
import Event from "./Event";
import DateTimePicker from '@react-native-community/datetimepicker';
import Search from "./Search";
import moment from "moment";
import { useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";


export default function Homepage({ navigation }) {
  const [listItems, setListItems] = React.useState([]);
  const [listItemsKeep, setListItemsKeep] = React.useState([]);
  const [isReady, setReady] = React.useState(false);
  const [date, setDate] = React.useState(new Date(1598051730000));
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    fetchData()
  }, [])

  // Datepickerin constit
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    //setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  
  async function getEventsToday() {
    let now = new Date()
    let nowString = now.toISOString()
    let nextMidnight = moment( moment().format('YYYY-MM-DD') + ' 23:59:00' ).unix()
    let eventsToday = await listItems.filter( event => event.event_dates.starting_day >= nowString).filter( event =>
      event.event_dates.starting_day <= nextMidnight)
     // setListItemsKeep(eventsToday)
      navigation.navigate("Eventlist", { data: eventsToday})
  }

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
          onPress={_ => getEventsToday()}
        />
        <Button
          title="Huomenna"
          onPress={() => navigation.navigate("Eventlist", { data: listItems })}
        />
        <Button onPress={showDatepicker} title="Valitse pvm" />
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange} 
        />
        )}
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
