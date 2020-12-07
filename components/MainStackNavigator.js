import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EventScreen from "./EventScreen";
import Homepage from "./Homepage";
import Eventlist from "./Eventlist";
import EventMapScreen from "./EventMapScreen";
import Restaurants from "./Restaurants";
import RestaurantMap from "./RestausrantMap";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator headerMode={"float"}>
      <Stack.Screen
        name="Homepage"
        options={{ headerShown: false }}
        component={Homepage}
      />
      <Stack.Screen name="Eventlist" component={Eventlist} options={{ title: "Etusivu" }} />
      <Stack.Screen
        name="EventScreen"
        options={{ title: "Etusivu" }}
        component={EventScreen}
      />
      <Stack.Screen
        name="Restaurants"
        options={{ title: "Takaisin" }}
        component={Restaurants}
      />
      <Stack.Screen
        name="EventMapScreen"
        options={{ title: "Takaisin" }}
        component={EventMapScreen}
      />
      <Stack.Screen
        name="RestaurantMap"
        options={{ title: "Takaisin" }}
        component={RestaurantMap}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };
