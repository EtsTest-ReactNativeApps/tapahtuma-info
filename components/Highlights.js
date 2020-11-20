import React from "react";
import { useState } from "react";
import { Card, Text } from 'react-native-elements'
import {
    View,
    Alert
} from "react-native";

export default function highlights() {

    const [highlightList, setHighlightList] = React.useState([])
    const randomInt = require('random-int')
    const random = randomInt(100)
    const randomEvent = highlightList[random]

    function fetchData() {
        fetch("https://l8seb8lrle.execute-api.eu-north-1.amazonaws.com/EventsData/events/?startIndex=0&endIndex=100", {
            method: "GET",
        })
        .then((response) => response.json())
        .then((responseData) => {
        setHighlightList(responseData)
        })
        .catch((error) => {
        Alert.alert('Error', error.message)
        })
    }

    React.useEffect(() => {
        fetchData();
    },[]);

    console.log(randomEvent.description.intro)

// RANDOMEVENT.DESCRIPTION EI TOIMI. HERJAA UNDEFINEDIA. LISÄKSI ALUSSA 
// RANDOMINT GENERAATTORI HAKEE NOIN NELJÄ RANDOMINTIÄ JOKA ON VÄHÄN OUTOA.

    return(
    <Card>
        <Card.Title>
            {randomEvent.name.fi}
        </Card.Title>
        <Card.Divider/>
        <Card.Image 
            style={{ width: 51, height: 51 }}
            source={{ uri: randomEvent.description.images[0].url }} 
        />
        <Text style={{marginBottom: 10}}>
            {randomEvent.description.intro}
        </Text>
        <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW' 
        />
    </Card>
    )
}