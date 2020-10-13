import {StatusBar} from "expo-status-bar";
import React from "react";
import Event from "./Event";
import DateTimePicker from '@react-native-community/datetimepicker';
import Search from "./Search";
import moment from "moment";
import {useEffect} from "react";
import moment from "moment-timezone";

import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    ActivityIndicator,
} from "react-native";
import { add } from "react-native-reanimated";


export default function Homepage({navigation}) {
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

    function getEventsToday() {

        let nextMidnight = moment( moment().tz("Europe/Helsinki").format('YYYY-MM-DD') + ' 23:59:00' ).toISOString()

        // jos haluaa midnight ajan oikein ottaa ton .add(2,"days") pois tuolta. Lisää 2 päivää siihen aikaan jotta helpompi debugaa.
        // kellonajat ovat UTC ajassa joten ovat 3 h jäljessä suomen aikaan.

        // data menee nytten kivasti eventlista sivulle.

        //BUG !! tapahtumat eivät tule järjestyksessä eventlist pagelle. Viimeisimmät elementit saattavat heitellä ajassaan

        // TODO selvitä ovatko eventtien ajat UTC ajassa ja pitäisikö nextMidnight ja momentTime olla UTC ajassa vai miten
        // APIssa tapahtumien ajat 2 tuntia jäljessä (Eli luultabasti UTC aika)

        let momentTime = moment(moment().format()).toISOString()


        console.log(momentTime)
        console.log(nextMidnight)

        let eventsToday = listItems.filter(event => event.event_dates.starting_day >= momentTime).filter(event =>
            event.event_dates.starting_day <= nextMidnight)
        // setListItemsKeep(eventsToday)
        navigation.navigate("Eventlist", {data: eventsToday})
    }

    function getEventsTomorrow() {

        let tomorrowMidnight = moment( moment().add(1, 'days').tz("Europe/Helsinki").format('YYYY-MM-DD') + ' 23:59:00 ' ).toISOString()

        let tomorrowMorning = moment( moment().add(1, 'days').tz("Europe/Helsinki").format('YYYY-MM-DD') + ' 00:00:00 ' ).toISOString()

        let eventsTomorrow = listItems.filter(event => event.event_dates.starting_day >= tomorrowMorning).filter(event => event.event_dates.starting_day <= tomorrowMidnight)

        navigation.navigate("Eventlist", {data: eventsTomorrow})

        console.log(tomorrowMidnight)
        console.log(tomorrowMorning)

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
        return <Event navigation={props.navigation} item={item}/>;
    };

    if (!isReady) {
        return (
            <View style={styles.HomepageContainer}>
                <Search keepLista={listItemsKeep} parentCallback={callBackFunction}/>
                <ActivityIndicator style={styles.ActivityIndicator} size="large"/>
            </View>
        );
    }

    return (
        <View style={styles.HomepageContainer}>
            <Text style={styles.TextContainer}> Löydä tapahtumat </Text>
            <Search keepLista={listItemsKeep} parentCallback={callBackFunction}/>
            <Text style={{marginLeft: 10}}>Päivämäärä</Text>
            <View style={styles.Buttons}>
                <Button
                    title="Tänään"
                    onPress={_ => getEventsToday()}
                />
                <Button
                    title="Huomenna"
                    onPress={_ => getEventsTomorrow()}
                />
                <Button onPress={showDatepicker} title="Valitse pvm"/>
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
