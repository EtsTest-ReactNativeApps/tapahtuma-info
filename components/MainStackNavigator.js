import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EventScreen from "./EventScreen";
import Homepage from "./Homepage";
import Eventlist from "./Eventlist";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen headerMode={"none"} name="EventScreen" component={EventScreen} />
            <Stack.Screen name="EventScreen" component={EventScreen} />
            <Stack.Screen name="Eventlist" component={Eventlist} />
        </Stack.Navigator>
    );
}


export { MainStackNavigator };
