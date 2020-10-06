import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EventScreen from "./EventScreen";
import Homepage from "./Homepage"

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen headerMode={"none"} name="EventScreen" component={EventScreen} />
        </Stack.Navigator>
    );
}


export { MainStackNavigator };