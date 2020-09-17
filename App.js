import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
/* import ReactTable from "react-table-v6"; */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
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
} from "react-native"

import Eventlist from "./components/Eventlist";
import Restaurants from "./components/Restaurants";

const Tab = createBottomTabNavigator();

function App() {


  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Tapahtumat" component={Eventlist} />
        <Tab.Screen name="Ravintolat" component={Restaurants} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  HistoryContainer: {
    marginHorizontal: 20,
    frontSize: 5,
    marginTop: 50,
    flexDirection: "column",
  },
});

export default App;
