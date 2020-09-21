import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons"

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
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

function App() {

  return (
    <NavigationContainer>
        <Tab.Navigator
        style={styles.HistoryContainer}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused,color,size}) => {

            let iconName;
            
            if (route.name === "Tapahtumat"){
              iconName = "md-list";
            }else if (route.name === "Ravintolat"){
              iconName = "md-restaurant";
            }

            return <Ionicons name={iconName} size={size} color={color}/>
          }
        })}>
          <Tab.Screen name="Tapahtumat" component={Eventlist} />
          <Tab.Screen name="Ravintolat" component={Restaurants} />
        </Tab.Navigator>
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
