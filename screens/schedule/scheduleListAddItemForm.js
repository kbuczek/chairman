import React from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  ScrollView,
} from "react-native";
import { globalStyles } from "../../styles/global";
import { Formik } from "formik";
import * as yup from "yup";
// import CustomButton from "../shared/customButton";

const scheduleSchema = yup.object({
  title: yup.string().required().max(40),
  person: yup.string().required().max(40),
  day: yup.string().required().max(40),
  startingHour: yup
    .number()
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
    .required()
    .test(
      "is-num-0-59",
      "Minuty muszą mieścić się w przedziale od 0 do 59",
      (val) => {
        return val >= 0 && val <= 59;
      }
    ),
  notes: yup.string().max(200),
});

export default function ScheduleListAddItemForm({ addScheduleListItem }) {
  return (
    <View style={globalStyles.cointainer}>
      <Formik
        initialValues={{ title: "", person: "", notes: "" }}
        validationSchema={scheduleSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          addScheduleListItem(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Tytuł wykładu"
              onChangeText={props.handleChange("title")}
              value={props.values.title}
              onBlur={props.handleBlur("title")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.title && props.errors.title}
            </Text>

            <TextInput
              style={globalStyles.input}
              placeholder="Osoba prowadząca"
              onChangeText={props.handleChange("person")}
              value={props.values.person}
              onBlur={props.handleBlur("person")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.person && props.errors.person}
            </Text>

            <Text>Dzień wykładu:</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Wybierz dzień wykładu"
              onChangeText={props.handleChange("day")}
              value={props.values.day}
              onBlur={props.handleBlur("day")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.day && props.errors.day}
            </Text>

            <Text>Godzina rozpoczęcia:</Text>
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

            <Text style={{ marginTop: 10 }}>Godzina zakończenia:</Text>
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

            <Button title="Dodaj" color="green" onPress={props.handleSubmit} />
            {/* <CustomButton text="Submit" onPress={props.handleSubmit} /> */}
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
