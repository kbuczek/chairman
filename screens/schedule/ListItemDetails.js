import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { globalStyles } from "../../styles/global";
import Card from "../../shared/card";
import DeleteButton from "../../shared/deleteButton";
import EditButton from "../../shared/editButton";
import { ScrollView } from "react-native-gesture-handler";
import CurrentTimer from "../../shared/currentTimer";

export default function ListItemDetails({ route, navigation }) {
  const [dt, setDt] = useState(new Date().toLocaleString());
  const {
    key,
    title,
    person,
    day,
    startingHour,
    startingMinute,
    endingHour,
    endingMinute,
    notes,
  } = route.params.item;

  const pressHandler = () => {
    navigation.goBack();
    route.params.pressHandlerDeleteItem(key);
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <Card>
          <Text style={styles.title}>Tytuł: {title}</Text>
          <Text style={styles.text}>Prowadzący: {person}</Text>
          <Text style={styles.text}>Notatki: {notes}</Text>
          {/* <Button title="Usuń wykład" color="red" /> */}
          <CurrentTimer
            day={day}
            startingHour={startingHour}
            startingMinute={startingMinute}
            endingHour={endingHour}
            endingMinute={endingMinute}
            text={true}
          />
        </Card>
        <EditButton text="Przedłuż wykład" />
        <EditButton text="edytuj informacje" />
        <DeleteButton text="usuń" onPress={pressHandler} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontFamily: "Nunito_700Bold",
    fontSize: 20,
  },
  text: {
    fontFamily: "Nunito_700Bold",
    padding: 10,
  },
});
