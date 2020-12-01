import { SearchBar } from "react-native-elements";
import React from "react";
import { useState } from "react";
import {
    View
} from "react-native";

export default function Search(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [arrayHolder, setArrayHolder] = useState([]);
  const [dataSource, setdataSource] = useState([]);

  const SearchFilterFunction = (text) => {
    setSearchQuery(text);
    //passing the inserted text in textinput
    const newData = props.keepLista.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name.fi
        ? item.name.fi.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log(newData);
    setSearchQuery(text);

    props.parentCallback(newData);
  };

  const onChangeSearch = (query) => {};

  return (
    <View>
      <SearchBar
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
        placeholderTextColor={"rgb(0,0,0)"}
        inputContainerStyle={{backgroundColor: 'white'}}
        style={{justifyContent: 'space-around'}}
        placeholder="Etsi tapahtumaa..."
        onClear={(text) => SearchFilterFunction("")}
        onChangeText={(text) => SearchFilterFunction(text)}
        value={searchQuery}
      />
    </View>
  );
}
