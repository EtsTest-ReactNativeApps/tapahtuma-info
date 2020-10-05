import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

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

import Eventlist from "./components/Eventlist";
import Restaurants from "./components/Restaurants";
import { SafeAreaView } from "react-native-safe-area-context";

import EventScreen from "./components/EventScreen";
import Event from "./components/Event";

import Homepage from "./components/Homepage";

const Tab = createBottomTabNavigator();
const EventScrStack = createStackNavigator();

function EventScreenStack() {
  return (
    <EventScrStack.Navigator>
      <EventScrStack.Screen name="EventScreen" component={EventScreen} />
    </EventScrStack.Navigator>
  );
}

const EventStack = createStackNavigator();

function EventeventStack() {
  return (
    <EventStack.Navigator>
      <EventStack.Screen name="Event" component={Event} />
    </EventStack.Navigator>
  );
}

const EventlistStack = createStackNavigator();

function EventlistStackScreen() {
  return (
    <EventlistStack.Navigator>
      <EventlistStack.Screen name="Eventlist" component={Eventlist} />
      <EventlistStack.Screen name="Event" component={EventeventStack} />
      <EventlistStack.Screen name="EventScreen" component={EventScreenStack} />
    </EventlistStack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        style={styles.HistoryContainer}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Tapahtumat") {
              iconName = "md-list";
            } else if (route.name === "Ravintolat") {
              iconName = "md-restaurant";
            } else {
              iconName = "md-home";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Etusivu" component={Homepage} />
        <Tab.Screen name="Tapahtumat" component={EventlistStackScreen} />
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
