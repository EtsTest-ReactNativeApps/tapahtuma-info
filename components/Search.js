import { SearchBar } from "react-native-elements";
import React from "react";
import { useState } from "react";
import { View } from "react-native";

export default function Search(props) {
  const [searchQuery, setSearchQuery] = useState("");

  const SearchFilterFunction = (text) => {
    setSearchQuery(text);

    const newData = props.keepLista.filter(function (item) {
      const itemData = item.name.fi
        ? item.name.fi.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setSearchQuery(text);

    props.parentCallback(newData);
  };

  return (
    <View>
      <SearchBar
        inputStyle={{ backgroundColor: "white" }}
        containerStyle={{
          backgroundColor: "white",
          borderWidth: 1,
          borderRadius: 5,
        }}
        placeholderTextColor={"rgb(0,0,0)"}
        inputContainerStyle={{ backgroundColor: "white" }}
        style={{ justifyContent: "space-around" }}
        placeholder="Etsi tapahtumaa..."
        onClear={(text) => SearchFilterFunction("")}
        onChangeText={(text) => SearchFilterFunction(text)}
        value={searchQuery}
      />
    </View>
  );
}
