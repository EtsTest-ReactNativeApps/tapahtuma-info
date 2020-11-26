import React from "react";
import Event from "./Event";

export default function EventContainer(props) {
  const navigation = useNavigation();
  return (
    <Event
      {...props}
      navigate={(propsItem) =>
        navigation.navigate("EventScreen", { propsItem })
      }
    />
  );
}
