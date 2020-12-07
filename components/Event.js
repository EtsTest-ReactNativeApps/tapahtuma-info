import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import moment from "moment";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";


export default function Event(props) {
  let propsItem = props;
  let navigation = useNavigation()

  let image;
  if (props.item.description.images[0]) {
    image = { uri: props.item.description.images[0].url };
  } else {
    image = {
      uri:
        "http://kasperstromman.com/wp-content/uploads/2017/05/HelsinkiIlme.jpg",
    };
  }

  var newDate = moment(props.item.event_dates.starting_day).format(
    "DD.MM.YYYY, H:mm"
  );

  let title;
  if (props.item.name.fi !== null) {
    title = props.item.name.fi;
  } else if (props.item.name.en !== null) {
    title = props.item.name.en;
  }

  return (
    <View style={styles.EventContainer}>
      <View style={{ marginRight: 10, alignItem: "center" }}>
        <TouchableHighlight
          onPress={() => navigation.navigate("EventScreen", { propsItem })}
        >
          <Image
            progressiveRenderingEnabled={true}
            style={{ width: 55, height: 55 }}
            source={image}
          />
        </TouchableHighlight>
      </View>
      <View>
        <Text
          onPress={() => navigation.navigate("EventScreen", { propsItem })}
          style={{ fontWeight: "bold", maxWidth: 250 }}
        >
          {title}
        </Text>
        <Text>{newDate}</Text>
        <Text>{props.item.location.address.street_address}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  EventContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
    borderWidth: 1,
    padding: 5,
    alignItems: "center",
  },
});
