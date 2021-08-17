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
import ScheduleListExtendItemForm from "./scheduleListExtendItemForm";
import convertDate from "../../shared/convertDate";

export default function ListItemDetails({ route, navigation }) {
  const [dt, setDt] = useState(new Date().toLocaleString());
  const [isModalOpenExtendLecture, setIsModalOpenExtendLecture] =
    useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const {
    _id,
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
          route.params.pressHandlerDeleteItem(_id);
        },
      },
      { text: "Nie" },
    ]);
  };

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
                addScheduleListItem={route.params.editScheduleListItem}
                item={route.params.item}
                bigTitle={"Edytuj Wykład"}
                // pressHandlerDeleteItem={route.params.pressHandlerDeleteItem}
              />
              {/* </ScrollView> */}
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Card>
          <Text style={styles.smallText}>Tytuł: </Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.smallText}>Prowadzący: </Text>
          <Text style={styles.text}>{person}</Text>
          <Text style={styles.smallText}>Sala: </Text>
          <Text style={styles.text}>{room}</Text>
          <Text style={styles.smallText}>Dzień: </Text>
          <Text style={styles.text}>{convertDate(day)}</Text>
          <Text style={styles.smallText}>Czas trwania: </Text>
          <Text style={styles.text}>
            {displayFrontZeros(startingHour)}:
            {displayFrontZeros(startingMinute)} -{" "}
            {displayFrontZeros(endingHour)}:{displayFrontZeros(endingMinute)}
          </Text>
          <View
            style={{
              borderBottomColor: "lightgray",
              borderBottomWidth: 1,
              marginBottom: 10,
            }}
          />
          <Text style={styles.smallTextNotes}>Notatki: </Text>
          <Text style={styles.notes}>{notes}</Text>
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
    // fontFamily: "Nunito_700Bold",
    fontWeight: "bold",
    fontSize: 25,
    paddingLeft: 15,
    marginBottom: 8,
  },
  text: {
    // fontFamily: "Nunito_700Bold",
    // padding: 10,
    fontSize: 25,
    paddingLeft: 15,
    marginBottom: 8,
  },
  smallText: {
    fontSize: 15,
  },
  smallTextNotes: {
    fontSize: 15,
    color: "#FF8800",
  },
  notes: {
    // fontFamily: "Nunito_700Bold",
    fontSize: 20,
    // color: "#f7b228"
    color: "#FF8800",
    // backgroundColor: "#f7b228",
    borderRadius: 5,
    paddingLeft: 15,
    // padding: 10,
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
