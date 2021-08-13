import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/global";
import Card from "../../shared/card";
import DeleteButton from "../../shared/deleteButton";
import EditButton from "../../shared/editButton";
import { ScrollView } from "react-native-gesture-handler";
import CurrentTimer from "../../shared/currentTimer";
import ScheduleListAddItemForm from "./scheduleListAddItemForm";
import ScheduleListExtendItemFrom from "./scheduleListExtendItemForm";
import ScheduleListExtendItemForm from "./scheduleListExtendItemForm";

export default function ListItemDetails({ route, navigation }) {
  const [dt, setDt] = useState(new Date().toLocaleString());
  const [isModalOpenExtendLecture, setIsModalOpenExtendLecture] =
    useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
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
    room,
    alert,
  } = route.params.item;

  const pressHandler1 = () => {
    Alert.alert("Czy na pewno chcesz usunąć ten wykład?", "", [
      {
        text: "Tak",
        onPress: () => {
          navigation.goBack();
          route.params.pressHandlerDeleteItem(key);
        },
      },
      { text: "Nie" },
    ]);
  };

  const pressHandler2 = () => {};

  const displayFrontZeros = (unit) => (unit < 10 ? `0${unit}` : unit);

  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <Modal visible={isModalOpenExtendLecture} animationType="slide">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.modalContent}>
              <TouchableOpacity
                onPress={() => setIsModalOpenExtendLecture(false)}
              >
                <View style={globalStyles.row}>
                  <MaterialIcons
                    name="chevron-left"
                    size={24}
                    style={styles.modalClose}
                  />
                  <Text style={styles.modalCloseText}>Cofnij</Text>
                </View>
              </TouchableOpacity>
              {/* <Text style={globalStyles.title}>Przedłuż wykład</Text>
              <Text>
                Wpisz o ile minut chcesz przedłużyć wybrany wykład i przesunąć
                WSZYSTKIE następujące po nim wykłady o daną ilość minut tego
                samego dnia.
              </Text>
              <TextInput
                style={globalStyles.input}
                placeholder="wpisz liczbę minut"
              /> */}
              <ScheduleListExtendItemForm bigTitle={"Przedłuż wykład"} />
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal visible={isModalOpenEdit} animationType="slide">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.modalContent}>
              <TouchableOpacity onPress={() => setIsModalOpenEdit(false)}>
                <View style={globalStyles.row}>
                  <MaterialIcons
                    name="chevron-left"
                    size={24}
                    style={styles.modalClose}
                  />
                  <Text style={styles.modalCloseText}>Cofnij</Text>
                </View>
              </TouchableOpacity>
              {/* <ScrollView> */}
              <ScheduleListAddItemForm
                addScheduleListItem={route.params.addScheduleListItem}
                item={route.params.item}
                bigTitle={"Edytuj Wykład"}
                // pressHandlerDeleteItem={route.params.pressHandlerDeleteItem}
              />
              {/* </ScrollView> */}
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Card>
          <Text style={styles.title}>Tytuł: {title}</Text>
          <Text style={styles.text}>Prowadzący: {person}</Text>
          <Text>Sala: {room}</Text>
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
            alert={alert}
            text={true}
          />
        </Card>
        <EditButton
          text="Przedłuż wykład"
          icon="arrow-downward"
          onPress={() => setIsModalOpenExtendLecture(true)}
        />
        <EditButton
          text="edytuj informacje"
          icon="create"
          onPress={() => setIsModalOpenEdit(true)}
        />
        <DeleteButton text="usuń" onPress={pressHandler1} />
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
  modalClose: {
    paddingTop: 30,
    paddingBottom: 10,
    // paddingRight: 10,
    alignSelf: "flex-start",
  },
  modalCloseText: {
    paddingTop: 32,
    paddingBottom: 10,
    paddingRight: 10,
    marginLeft: 0,
    alignSelf: "flex-start",
  },
});
