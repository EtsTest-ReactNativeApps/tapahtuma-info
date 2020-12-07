import React from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import Search from "./Search";
import HighlightEvent from "./Highlights"
import moment from "moment";
import 'moment-timezone';
import {useEffect} from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    ActivityIndicator,
    Platform,
    ScrollView
} from "react-native";
import { Icon } from 'react-native-elements';

export default function Homepage({navigation}) {
    const [listItems, setListItems] = React.useState([]);
    const [listItemsKeep, setListItemsKeep] = React.useState([]);
    const [isReady, setReady] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    useEffect(() => {
        fetchData()
    }, [])

    // Datepickerin constit
    const onChange = (selectedDate) => {
        console.log("Onchange")

        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);

        pickedDate = currentDate.nativeEvent.timestamp

        let selectedMorning = moment(pickedDate).startOf('day').toISOString()
        let selectedNight = moment(pickedDate).endOf('day').toISOString()

        let eventsSelectedDay = listItems.filter(event => event.event_dates.starting_day >= selectedMorning).filter(event =>
            event.event_dates.starting_day <= selectedNight)
        navigation.navigate("Eventlist", {data: eventsSelectedDay})
    };

    const showMode = (currentMode) => {
        setDate(new Date())
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    function getEventsToday() {

        let nextMidnight = moment( moment().format('YYYY-MM-DD') + ' 23:59:00' ).toISOString()

        let momentTime = moment(moment().format()).toISOString()

        let eventsToday = listItems.filter(event => event.event_dates.starting_day >= momentTime).filter(event =>
            event.event_dates.starting_day <= nextMidnight)
        
        navigation.navigate("Eventlist", {data: eventsToday})
    }

    function getEventsTomorrow() {
       
        let tomorrowMorning = moment().add(1, 'day').startOf('day').toISOString();
        let tomorrowNight = moment().add(1, 'day').endOf('day').toISOString()

        let eventsTomorrow = listItems.filter(event => event.event_dates.starting_day >= tomorrowMorning).filter(event => 
            event.event_dates.starting_day <= tomorrowNight)

        navigation.navigate("Eventlist", {data: eventsTomorrow})

    }

    function getMusicEvents() {
        fetch("http://open-api.myhelsinki.fi/v1/events/?tags_filter=music", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((responseData) => {
                const musicEvents = responseData.data.sort(function (a, b) {
                    return a.event_dates.starting_day < b.event_dates.starting_day
                        ? -1
                        : a.event_dates.starting_day > b.event_dates.starting_day
                            ? 1
                            : 0;
                });

                let today = new Date().toISOString();

                const events = musicEvents.filter(function (a) {
                    return a.event_dates.starting_day >= today;
                });
                navigation.navigate("Eventlist", {data: events})
            })   
    }

    function getCultureEvents() {
        fetch("http://open-api.myhelsinki.fi/v1/events/?tags_filter=culture", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((responseData) => {
                const cultureEvents = responseData.data.sort(function (a, b) {
                    return a.event_dates.starting_day < b.event_dates.starting_day
                        ? -1
                        : a.event_dates.starting_day > b.event_dates.starting_day
                            ? 1
                            : 0;
                });

                let today = new Date().toISOString();

                const events = cultureEvents.filter(function (a) {
                    return a.event_dates.starting_day >= today;
                });
                navigation.navigate("Eventlist", {data: events})
            })   
    }

    function getFestivalEvents() {
        fetch("http://open-api.myhelsinki.fi/v1/events/?tags_filter=festivals", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((responseData) => {
                const festivalEvents = responseData.data.sort(function (a, b) {
                    return a.event_dates.starting_day < b.event_dates.starting_day
                        ? -1
                        : a.event_dates.starting_day > b.event_dates.starting_day
                            ? 1
                            : 0;
                });

                let today = new Date().toISOString();

                const events = festivalEvents.filter(function (a) {
                    return a.event_dates.starting_day >= today;
                });
                navigation.navigate("Eventlist", {data: events})
            })   
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
                Alert.alert('Error:', error.message)
            });
    }

    function callBackFunction(newData) {
        setListItems(newData);
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    if (!isReady) {
        return (
            <View style={styles.HomepageContainer}>
                <Search keepLista={listItemsKeep} parentCallback={callBackFunction} />
                <ActivityIndicator style={styles.ActivityIndicator} size="large"/>
            </View>
        );
    }

    return (
        <ScrollView style={styles.scrollView}>
        <View style={styles.HomepageContainer}>
            <Text style={styles.TitleContainer}> Löydä tapahtumat </Text>
            <Search 
                    keepLista={listItemsKeep} 
                    parentCallback={callBackFunction} />
            <View style={styles.Icon}>
            <Icon reverse 
                    type= "material" 
                    name= "search" 
                    onPress={() => navigation.navigate('Eventlist', {data: listItems})} />
                    </View>
            <Text style={styles.TextContainer}>Päivämäärä</Text>
            <View style={styles.Buttons}>
              <View style={{padding: 5}}>
                <Button
                    title="Tänään"
                    onPress={_ => getEventsToday()}
                    color="black"
                />
              </View>
              <View style={{padding: 5}}>
                <Button
                    title="Huomenna"
                    onPress={_ => getEventsTomorrow()}
                    color="black"
                />
              </View>
              <View style={{padding: 5}}>
                <Button onPress={showDatepicker} title="Valitse pvm" color="black"/>
                </View>
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
            <Text style={styles.TextContainer}>Valitse luokan mukaan</Text>
            <View style={styles.Buttons}>
                <View style={{padding: 5}}>
                    <Button
                        title="Musiikki"
                        onPress={_ => getMusicEvents()}
                        color="black"
                    />
                </View>
                <View style={{padding: 5}}>
                    <Button
                        title="Kulttuuritapahtumat"
                        onPress={_ => getCultureEvents()}
                        color="black"
                    />
                </View>
                <View style={{padding: 5}}>
                    <Button
                        title="Festivaalit"
                        onPress={_ => getFestivalEvents()}
                        color="black"
                    />
                </View>
            </View>
            <HighlightEvent></HighlightEvent>
            <HighlightEvent></HighlightEvent>
            <HighlightEvent></HighlightEvent>
            <HighlightEvent></HighlightEvent>
        </View>
        </ScrollView>
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
    TitleContainer: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        marginLeft: 10,
    },
    TextContainer:{
        fontWeight: "bold",
        marginLeft: 10
    },
    Buttons: {
        flexDirection: "row",
        marginLeft: 10,
    },
    scrollView: {
        marginHorizontal: 10,
      },
    Icon: {
        justifyContent: 'center', 
        alignItems: 'center'
    }
});
