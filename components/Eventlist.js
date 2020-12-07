import React from "react";
import Event from "./Event";
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  Button
} from "react-native";

import Search from "./Search";

export default function Eventlist({ navigation, route }) {
  const [listItems, setListItems] = React.useState([]);
  const [listItemsKeep, setListItemsKeep] = React.useState([]);
  const [isReady, setReady] = React.useState(true);
  // const [kerran, setKerran] = React.useState(false);
  let start = 100
  let end = 200

<<<<<<< HEAD

  function fetchData(startIndex, endIndex) {
=======
  function fetchData() {
    let startIndex = 0;
    let endIndex = 100;
>>>>>>> 94d960c780ed8a16f5eebde746904d5708a50768

    fetch(
      "https://l8seb8lrle.execute-api.eu-north-1.amazonaws.com/EventsData/events/?startIndex=" +
        startIndex +
        "&endIndex=" +
        endIndex,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        if (listItems.length > 0) {
          let temp = listItems
          console.log(temp.length)
          responseData.forEach(x => {
            temp.push(x)
          })
          console.log(temp.length)
          if (temp.length === 200) {
            setListItems(temp);
            setListItemsKeep(temp);
          }
        } else {
          setListItems(responseData);
          setListItemsKeep(responseData);
        }
        setReady(true);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }

  function callBackFunction(newData) {
    setListItems(newData);
  }

  React.useEffect(() => {
    if (route.params === undefined) {
      fetchData(0, 100);
    } else {
      const { data } = route.params;
      setListItems(data);
      setListItemsKeep(data);
    }
  }, []);

  const renderItem = (item) => {
    return <Event item={item} />;
  };

  const onEndReached = () => {
    fetchData(start, end)
    start += 100
    end += 100
  }

  if (!isReady) {
    return (
      <View style={styles.EventListContainer}>
        <Search keepLista={listItemsKeep} parentCallback={callBackFunction} />
        <ActivityIndicator style={styles.ActivityIndicator} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.EventListContainer}>
      <View style={{ margin: 10 }}>
        <Search keepLista={listItemsKeep} parentCallback={callBackFunction} />
      </View>
      <FlatList
        style={{ marginLeft: 10 }}
        data={listItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderItem(item)}
        onEndReached={_ => onEndReached()}
        onEndReachedThreshold={0.8}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  EventListContainer: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "#FFFFFF",
  },
  ActivityIndicator: {
    flex: 1,
  },
});
