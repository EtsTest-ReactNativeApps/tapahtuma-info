import { SearchBar } from 'react-native-elements';
import React from "react";
import { useState } from "react";
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

export default function Search(props) {

    const [searchQuery, setSearchQuery] = useState('');
    const [arrayHolder, setArrayHolder] = useState([]);
    const [dataSource, setdataSource] = useState([]);

    const SearchFilterFunction = text => {
        setSearchQuery(text);
        //passing the inserted text in textinput
        const newData = props.lista.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.name.fi ? item.name.fi.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        console.log(newData)
        setSearchQuery(text)
        if (text === ""){
            console.log("Text Tyhjä")
            console.log(props.keepLista)

            props.parentCallback(props.keepLista)
        }else {
            props.parentCallback(newData)
        }
        
    }


    const onChangeSearch = query => {

    }

    return (
        <View>
            <SearchBar placeholder="Etsi tapahtumaa..." onClear={_ => this.SearchFilterFunction('')} onChangeText={text => SearchFilterFunction(text)} value={searchQuery} />
        </View>
    )

}