import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import {
  StyleSheet,
} from "react-native";

import { MainStackNavigator } from "./components/MainStackNavigator";
import BottomTabNavigator from "./components/BottomTabNavigator";


function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  HistoryContainer: {
    marginHorizontal: 20,
    fontSize: 5,
    marginTop: 50,
    flexDirection: "column",
  },
});

export default App;
