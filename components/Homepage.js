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
} from "react-native";


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
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        pickedDate = currentDate.nativeEvent.timestamp

        let selectedMorning = moment(pickedDate).startOf('day').toISOString()
        let selectedNight = moment(pickedDate).endOf('day').toISOString()
        console.log(selectedNight)
        console.log(selectedMorning)

        let eventsSelectedDay = listItems.filter(event => event.event_dates.starting_day >= selectedMorning).filter(event =>
            event.event_dates.starting_day <= selectedNight)
        navigation.navigate("Eventlist", {data: eventsSelectedDay})
    };

    const showMode = (currentMode) => {
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

        console.log(tomorrowMorning)
        console.log(tomorrowNight)

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
                console.log(musicEvents)
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
        <View style={styles.HomepageContainer}>
            <Text style={styles.TextContainer}> Löydä tapahtumat </Text>
            <Search keepLista={listItemsKeep} 
                    parentCallback={callBackFunction} />
            <Button title = 'SEARCH' onPress={() => navigation.navigate('Eventlist', {data: listItems})}/>
            <Text style={{marginLeft: 10}}>Päivämäärä</Text>
            <View style={styles.Buttons}>
              <View style={{padding: 5}}>
                <Button
                    title="Tänään"
                    onPress={_ => getEventsToday()}
                />
              </View>
              <View style={{padding: 5}}>
                <Button
                    title="Huomenna"
                    onPress={_ => getEventsTomorrow()}
                />
              </View>
              <View style={{padding: 5}}>
                <Button onPress={showDatepicker} title="Valitse pvm"/>
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
            <Text style={{marginLeft: 10}}>Valitse luokan mukaan</Text>
            <View style={styles.Buttons}>
                <View style={{padding: 5}}>
                    <Button
                        title="Musiikki"
                        onPress={_ => getMusicEvents()}
                    />
                </View>
                <View style={{padding: 5}}>
                    <Button
                        title="Kulttuuritapahtumat"
                        onPress={_ => getCultureEvents()}
                    />
                </View>
                <View style={{padding: 5}}>
                    <Button
                        title="Festivaalit"
                        onPress={_ => getFestivalEvents()}
                    />
                </View>
            </View>
            <HighlightEvent></HighlightEvent>
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
