import React, { useState, useEffect } from "react";
import { Card, Text, Icon } from 'react-native-elements'
import {
    View,
    Alert,
    Button,
    ToastAndroid,
    Linking
} from "react-native";

export default function Highlights() {

    const [highlightList, setHighlightList] = React.useState()
    const randomInt = require('random-int')
    const random = randomInt(100)
    const [randomEvent, setRandomEvent] = React.useState()
    let image;


    function fetchData() {
        fetch("https://l8seb8lrle.execute-api.eu-north-1.amazonaws.com/EventsData/events/?startIndex=0&endIndex=100")
            .then((response) => response.json())
            .then(responseData => {
                setHighlightList(responseData)
                console.log(responseData)
            })
            .catch((error) => {
                Alert.alert('Error', error.message)
            })
    }
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log("highlightList updated")
        console.log(highlightList, "highlightLIST")
        let lista = highlightList
        if (lista !== undefined) {
            setRandomEvent(lista[random])
        }

    }, [highlightList]);

    if (randomEvent !== undefined) {
        if (randomEvent.description.images.length > 0) {
            image = { uri: randomEvent.description.images[0].url };
          //  image = '{{uri: "'+randomEvent.description.images[0].url+'"}}' ;
        } else {
            image = {
                uri:
                    "http://kasperstromman.com/wp-content/uploads/2017/05/HelsinkiIlme.jpg",
            };
        }
    }

    const isLinkAvailable = () => {
        if (randomEvent.info_url !== null) {
          Linking.openURL(randomEvent.info_url);
        } else {
          ToastAndroid.showWithGravity(
            "Linkkiä ei valitettavasti ole saatavilla",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
      };

    // useEffect(() => {
    //     console.log(randomEvent,"randomevent")
    
    //         console.log(image, "image")
    //     }
    // }, [randomEvent]);

    //console.log(randomEvent.description.intro)

    if(randomEvent === undefined || highlightList === undefined){
        return <Text>Loading...</Text>
    }else {
        return (
            // <Text>??????...</Text>
            <Card>
                <Card.Title>
                    {randomEvent.name.fi}
                </Card.Title>
                <Card.Divider/>
                <Card.Image 
                    source= {image}
                />
                <Text style={{marginBottom: 10}}>
                    {randomEvent.description.intro}
                </Text>
                <Button
                    icon={<Icon name='code' color='#ffffff' />}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='KATSO' 
                    onPress={() => isLinkAvailable()}
                />
            </Card>
        )
    }

}