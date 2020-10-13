import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EventScreen from "./EventScreen";
import Homepage from "./Homepage";
import Eventlist from "./Eventlist";
import EventMapScreen from './EventMapScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator headerMode={"float"}>
      <Stack.Screen name="Homepage" component={Homepage} />
      <Stack.Screen name="Eventlist" component={Eventlist} />
      <Stack.Screen name="EventScreen" component={EventScreen} />
      <Stack.Screen name='EventMapScreen' component={EventMapScreen} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };
