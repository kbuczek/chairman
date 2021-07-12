import React from "react";
import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { globalStyles } from "../../styles/global";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import * as yup from "yup";

const scheduleSchema = yup.object({
  room: yup.string().required().max(40),
  title: yup.string().required().max(40),
  person: yup.string().required().max(40),
  day: yup.string().required().max(40),
  startingHour: yup
    .number()
    .test(
      "is-num-0-24",
      "Godzina musi mieścić się w przedziale od 0 do 24",
      (val) => {
        return val >= 0 && val <= 24;
      }
    ),
  startingMinute: yup
    .number()
    .test(
      "is-num-0-59",
      "Minuty muszą mieścić się w przedziale od 0 do 59",
      (val) => {
        return val >= 0 && val <= 59;
      }
    ),
  endingHour: yup
    .number()
    .test(
      "is-num-0-24",
      "Godzina musi mieścić się w przedziale od 0 do 24",
      (val) => {
        return val >= 0 && val <= 24;
      }
    ),
  endingMinute: yup
    .number()
    .test(
      "is-num-0-59",
      "Minuty muszą mieścić się w przedziale od 0 do 59",
      (val) => {
        return val >= 0 && val <= 59;
      }
    ),
  notes: yup.string().max(200),
  alert: yup
    .number()
    .test(
      "is-num-0-30",
      "Godzina musi mieścić się w przedziale od 0 do 30",
      (val) => {
        return val >= 0 && val <= 30;
      }
    ),
});

export default function ScheduleListAddItemForm({
  addScheduleListItem,
  item,
  bigTitle,
  // pressHandlerDeleteItem,
}) {
  return (
    <View style={globalStyles.cointainer}>
      <Text style={globalStyles.title}>{bigTitle}</Text>
      <Formik
        initialValues={{
          room: item.room,
          title: item.title,
          person: item.person,
          day: item.day,
          startingHour: item.startingHour.toString(),
          startingMinute: item.startingMinute.toString(),
          endingHour: item.endingHour.toString(),
          endingMinute: item.endingMinute.toString(),
          notes: item.notes,
          alert: item.alert.toString(),
        }}
        validationSchema={scheduleSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          // console.log(item.key);
          // if (item.key !== "") {
          //   pressHandlerDeleteItem(item.key);
          // }
          addScheduleListItem(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Sala*"
              onChangeText={props.handleChange("room")}
              value={props.values.room}
              onBlur={props.handleBlur("room")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.room && props.errors.room}
            </Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Tytuł wykładu*"
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
              onChangeText={props.handleChange("person")}
              value={props.values.person}
              onBlur={props.handleBlur("person")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.person && props.errors.person}
            </Text>
            <Text>Dzień wykładu*:</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="DD-MM-RRRR"
              onChangeText={props.handleChange("day")}
              value={props.values.day}
              onBlur={props.handleBlur("day")}
              keyboardType="numeric"
            />
            {/* <DatePicker
              selected={new Date()}
              value={props.values.day}
              onChange={props.handleChange("day")} //only when value has changed
            /> */}
            {/* <RNDateTimePicker
              mode="date"
              value={props.values.day}
              onChangeText={props.handleChange("day")}
            /> */}

            <Text style={globalStyles.errorText}>
              {props.touched.day && props.errors.day}
            </Text>
            <Text>Godzina rozpoczęcia*:</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={globalStyles.inputSmall}
                placeholder="Godziny"
                onChangeText={props.handleChange("startingHour")}
                value={props.values.startingHour}
                onBlur={props.handleBlur("startingHour")}
                keyboardType="numeric"
              />
              <Text style={globalStyles.errorText}>
                {props.touched.startingHour && props.errors.startingHour}
              </Text>

              <Text style={styles.doubleDot}>:</Text>

              <TextInput
                style={globalStyles.inputSmall}
                placeholder="Minuty"
                onChangeText={props.handleChange("startingMinute")}
                value={props.values.startingMinute}
                onBlur={props.handleBlur("startingMinute")}
                keyboardType="numeric"
              />
              <Text style={globalStyles.errorText}>
                {props.touched.startingMinute && props.errors.startingMinute}
              </Text>
            </View>
            <Text style={{ marginTop: 10 }}>Godzina zakończenia*:</Text>
            <View style={{ flexDirection: "row", marginBottom: 35 }}>
              <TextInput
                style={globalStyles.inputSmall}
                placeholder="Godziny"
                onChangeText={props.handleChange("endingHour")}
                value={props.values.endingHour}
                onBlur={props.handleBlur("endingHour")}
                keyboardType="numeric"
              />
              <Text style={globalStyles.errorText}>
                {props.touched.endingHour && props.errors.endingHour}
              </Text>

              <Text style={styles.doubleDot}>:</Text>

              <TextInput
                style={globalStyles.inputSmall}
                placeholder="Minuty"
                onChangeText={props.handleChange("endingMinute")}
                value={props.values.endingMinute}
                onBlur={props.handleBlur("endingMinute")}
                keyboardType="numeric"
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
              onChangeText={props.handleChange("notes")}
              value={props.values.notes}
              onBlur={props.handleBlur("notes")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.notes && props.errors.notes}
            </Text>
            <Text>
              Dodaj alert w minutach przed końcem wykładu (np. czas na pytania):
            </Text>
            <TextInput
              style={globalStyles.input}
              placeholder="minuty przed końcem wykładu"
              onChangeText={props.handleChange("alert")}
              value={props.values.alert}
              onBlur={props.handleBlur("alert")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.alert && props.errors.alert}
            </Text>
            <Button
              title={bigTitle}
              color="green"
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
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
