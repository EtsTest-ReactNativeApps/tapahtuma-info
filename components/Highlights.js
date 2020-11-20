import React from "react";
import { useState } from "react";
import { Card } from 'react-native-elements'
import {
    View
} from "react-native";

export default function highlights() {

    const [highlightList, setHighlightList] = React.useState([])
    const randomInt = require('random-int')
    const random = randomInt(100)
    let randomEvent = highlightList[random]

    function fetchData() {
        fetch("https://l8seb8lrle.execute-api.eu-north-1.amazonaws.com/EventsData/events/?startIndex=0&endIndex=100", {
            method: "GET",
        })
        .then((response) => response.json())
        .then((responseData) => {
        setHighlightList(responseData.results)
        })
        .catch((error) => {
        Alert.alert('Error', error)
        })
        
    }

    React.useEffect(() => {
        fetchData();
    },[]);

    return(
    <Card>
        <Card.Title>{randomEvent.name.fi}</Card.Title>
        <Card.Divider/>
        
        <Text style={{marginBottom: 10}}>
            {randomEvent.description.intro}
        </Text>
        <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW' />
    </Card>
    )

    console.log(highlightList)
}