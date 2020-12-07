import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator } from "./MainStackNavigator";
import { EventListStackNavigation } from "./EventListStackNavigation";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Tapahtumat") {
            iconName = "md-list";
          } else {
            iconName = "md-home";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Etusivu" component={MainStackNavigator} />
      <Tab.Screen name="Tapahtumat" component={EventListStackNavigation} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
