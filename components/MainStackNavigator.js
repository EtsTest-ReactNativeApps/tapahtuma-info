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
<<<<<<< HEAD
            <Stack.Screen headerMode={"none"} name="EventScreen" component={EventScreen} />
=======
            <Stack.Screen name="EventScreen" component={EventScreen} />
            <Stack.Screen name="Eventlist" component={Eventlist} />
>>>>>>> e1ee02c4a6437fa007f52e4c4eeeb70efcbe9b44
        </Stack.Navigator>
    );
}


export { MainStackNavigator };