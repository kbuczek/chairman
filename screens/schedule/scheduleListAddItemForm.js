import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Picker,
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { globalStyles } from "../../styles/global";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import * as yup from "yup";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../shared/customButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const scheduleSchema = yup.object({
  conference: yup.string().required().max(100),
  room: yup.string().required().max(40),
  title: yup.string().required().max(100),
  person: yup.string().required().max(100),
  day: yup.string().required().max(10),
  startingHour: yup
    .number()
    .integer()
    .required()
    .test(
      "is-num-0-24",
      "Godzina musi mieścić się w przedziale od 0 do 24",
      (val) => {
        return val >= 0 && val <= 24;
      }
    ),
  startingMinute: yup
    .number()
    .integer()
    .required()
    .test(
      "is-num-0-59",
      "Minuty muszą mieścić się w przedziale od 0 do 59",
      (val) => {
        return val >= 0 && val <= 59;
      }
    ),
  endingHour: yup
    .number()
    .integer()
    .required()
    .test(
      "is-num-0-24",
      "Godzina musi mieścić się w przedziale od 0 do 24",
      (val) => {
        return val >= 0 && val <= 24;
      }
    ),
  endingMinute: yup
    .number()
    .integer()
    .required()
    .test(
      "is-num-0-59",
      "Minuty muszą mieścić się w przedziale od 0 do 59",
      (val) => {
        return val >= 0 && val <= 59;
      }
    ),
  notes: yup.string().max(400),
  alert: yup
    .number()
    .integer()
    // .transform((value) => (isNaN(value) ? undefined : value))
    .test(
      "is-num-0-30",
      "Godzina musi mieścić się w przedziale od 0 do 30",
      (val) => {
        return val >= 0 && val <= 30;
      }
    )
    .nullable(true),
});

export default function ScheduleListAddItemForm({
  addScheduleListItem,
  item,
  bigTitle,
  // pressHandlerDeleteItem,
}) {
  const [conference, setConference] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    getData();
    console.log("conference", conference);
  }, []);

  const getData = async () => {
    try {
      const getDataConference = await AsyncStorage.getItem("savedConference");
      if (getDataConference !== null) {
        setConference(getDataConference);
      }
    } catch (e) {
      console.log("Settings.js getData() reading error ", e);
    }
    try {
      const getDataRoom = await AsyncStorage.getItem("savedRoom");
      if (getDataRoom !== null) {
        setRoom(getDataRoom);
      }
    } catch (e) {
      console.log("Settings.js getData() reading error ", e);
    }
  };
  return (
    <ScrollView>
      <TouchableWithoutFeedback>
        <View style={globalStyles.cointainerWithContent}>
          <Text style={globalStyles.title}>{bigTitle}</Text>

          <Formik
            initialValues={{
              conference: conference,
              room: room,
              title: item.title,
              person: item.person,
              day: item.day,
              startingHour: item.startingHour.toString(),
              startingMinute: item.startingMinute.toString(),
              endingHour: item.endingHour.toString(),
              endingMinute: item.endingMinute.toString(),
              notes: item.notes,
              alert: item.alert,
            }}
            validationSchema={scheduleSchema}
            enableReinitialize={true}
            onSubmit={(values, actions) => {
              actions.resetForm();
              addScheduleListItem(values, item._id);
            }}
          >
            {(props) => (
              <View>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Tytuł wykładu*"
                  placeholderTextColor="gray"
                  onChangeText={props.handleChange("title")}
                  value={props.values.title}
                  onBlur={props.handleBlur("title")}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.title && props.errors.title}
                </Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Osoba prowadząca*"
                  placeholderTextColor="gray"
                  onChangeText={props.handleChange("person")}
                  value={props.values.person}
                  onBlur={props.handleBlur("person")}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.person && props.errors.person}
                </Text>
                <Text>Dzień wykładu* (np. 05-07-2021):</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="DD-MM-RRRR"
                  placeholderTextColor="gray"
                  onChangeText={props.handleChange("day")}
                  value={props.values.day}
                  onBlur={props.handleBlur("day")}
                  keyboardType={"phone-pad"}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.day && props.errors.day}
                </Text>
                <Text>Godzina rozpoczęcia*:</Text>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={globalStyles.inputSmall}
                    placeholder="Godziny"
                    placeholderTextColor="gray"
                    onChangeText={props.handleChange("startingHour")}
                    value={props.values.startingHour}
                    onBlur={props.handleBlur("startingHour")}
                    keyboardType={"phone-pad"}
                    // keyboardType={"numeric"}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.startingHour && props.errors.startingHour}
                  </Text>

                  <Text style={styles.doubleDot}>:</Text>

                  <TextInput
                    style={globalStyles.inputSmall}
                    placeholder="Minuty"
                    placeholderTextColor="gray"
                    onChangeText={props.handleChange("startingMinute")}
                    value={props.values.startingMinute}
                    onBlur={props.handleBlur("startingMinute")}
                    keyboardType={"phone-pad"}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.startingMinute &&
                      props.errors.startingMinute}
                  </Text>
                </View>
                <Text style={{ marginTop: 10 }}>Godzina zakończenia*:</Text>
                <View style={{ flexDirection: "row", marginBottom: 35 }}>
                  <TextInput
                    style={globalStyles.inputSmall}
                    placeholder="Godziny"
                    placeholderTextColor="gray"
                    onChangeText={props.handleChange("endingHour")}
                    value={props.values.endingHour}
                    onBlur={props.handleBlur("endingHour")}
                    keyboardType={"phone-pad"}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.endingHour && props.errors.endingHour}
                  </Text>

                  <Text style={styles.doubleDot}>:</Text>

                  <TextInput
                    style={globalStyles.inputSmall}
                    placeholder="Minuty"
                    placeholderTextColor="gray"
                    onChangeText={props.handleChange("endingMinute")}
                    value={props.values.endingMinute}
                    onBlur={props.handleBlur("endingMinute")}
                    keyboardType={"phone-pad"}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.endingMinute && props.errors.endingMinute}
                  </Text>
                </View>
                <TextInput
                  multiline
                  minHeight={60}
                  style={globalStyles.input}
                  placeholder="Notatki"
                  placeholderTextColor="gray"
                  onChangeText={props.handleChange("notes")}
                  value={props.values.notes}
                  onBlur={props.handleBlur("notes")}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.notes && props.errors.notes}
                </Text>
                <Text>Dodaj alert (np. czas na pytania):</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="minuty przed końcem wykładu"
                  placeholderTextColor="gray"
                  onChangeText={props.handleChange("alert")}
                  value={props.values.alert}
                  onBlur={props.handleBlur("alert")}
                  keyboardType={"phone-pad"}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.alert && props.errors.alert}
                </Text>
                <CustomButton
                  text={bigTitle}
                  icon="add"
                  color="green"
                  onPress={props.handleSubmit}
                />
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
  },
  doubleDot: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 20,
    paddingTop: 10,
  },
});
