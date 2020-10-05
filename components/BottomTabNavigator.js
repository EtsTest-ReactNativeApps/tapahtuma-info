
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {StyleSheet} from "react-native"
import { MainStackNavigator, EventStackNavigator } from "./MainStackNavigator";
import Eventlist from "./Eventlist";
import Restaurants from "./Restaurants";
import Homepage from "./Homepage";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
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
            <Tab.Screen name="Etusivu" component={MainStackNavigator} />
            <Tab.Screen name="Tapahtumat" component={Eventlist} />
            <Tab.Screen name="Ravintolat" component={Restaurants} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
    HistoryContainer: {
        marginHorizontal: 20,
        fontSize: 5,
        marginTop: 50,
        flexDirection: "column",
    },
});

