import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { globalStyles } from "../../styles/global";
import Card from "../../shared/card";
import DeleteButton from "../../shared/deleteButton";
import EditButton from "../../shared/editButton";
import { ScrollView } from "react-native-gesture-handler";
import CurrentTimer from "../../shared/currentTimer";
import AlertFunction from "../../shared/alertFunction";

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
    Alert.alert("Czy na pewno chcesz usnąć ten wykład?", "", [
      {
        text: "Tak",
        onPress: () => {
          navigation.goBack();
          route.params.pressHandlerDeleteItem(key);
        },
      },
      { text: "Nie" },
    ]);
    // navigation.goBack();
    // route.params.pressHandlerDeleteItem(key);
  };

  const displayFrontZeros = (unit) => (unit < 10 ? `0${unit}` : unit);

  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <Card>
          <Text style={styles.title}>Tytuł: {title}</Text>
          <Text style={styles.text}>Prowadzący: {person}</Text>
          <Text style={styles.text}>Dzień: {day}</Text>
          <Text style={styles.text}>
            Godziny: {displayFrontZeros(startingHour)}:
            {displayFrontZeros(startingMinute)} -{" "}
            {displayFrontZeros(endingHour)}:{displayFrontZeros(endingMinute)}
          </Text>
          <Text style={styles.notes}>Notatki: {notes}</Text>
          {/* <Button title="Usuń wykład" color="red" /> */}
          <CurrentTimer
            title={title}
            day={day}
            startingHour={startingHour}
            startingMinute={startingMinute}
            endingHour={endingHour}
            endingMinute={endingMinute}
            text={true}
          />
        </Card>
        <EditButton
          text="Przedłuż wykład"
          // onPress={() => AlertFunction(2, "U")}
        />
        <EditButton text="edytuj informacje" />
        <DeleteButton text="usuń" onPress={pressHandler} />
        {/* <DeleteButton text="usuń" onPress={() => AlertFunction(2, "aaa")} /> */}
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
  notes: {
    fontFamily: "Nunito_700Bold",
    fontSize: 20,
    color: "#1471f5",
    padding: 10,
  },
});
