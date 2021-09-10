import React from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { globalStyles } from "../../styles/global";
import { Formik } from "formik";
import * as yup from "yup";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../shared/customButton";

const scheduleSchema = yup.object({
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
});

export default function ScheduleListChangeWithItemForm({
  pressHandlerChangeWithLecture,
  item,
  bigTitle,
}) {
  return (
    <ScrollView>
      <TouchableWithoutFeedback>
        <View style={globalStyles.cointainerWithContent}>
          <Text style={globalStyles.title}>{bigTitle}</Text>

          <Formik
            initialValues={{
              day: "",
              startingHour: "",
              startingMinute: "",
            }}
            validationSchema={scheduleSchema}
            onSubmit={(values, actions) => {
              actions.resetForm();
              pressHandlerChangeWithLecture(
                values.day,
                values.startingHour,
                values.startingMinute,
                item
              );
            }}
          >
            {(props) => (
              <View>
                <Text style={styles.text}>
                  Podaj poniżej dane wykładu, z którym chcesz zamienić obecny
                  wykład
                </Text>
                <Text>Dzień, np.(05-08-2021):</Text>
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
                <Text>Godzina rozpoczęcia:</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="godziny"
                  placeholderTextColor="gray"
                  onChangeText={props.handleChange("startingHour")}
                  value={props.values.startingHour}
                  onBlur={props.handleBlur("startingHour")}
                  keyboardType={"phone-pad"}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.startingHour && props.errors.startingHour}
                </Text>
                <Text>Minuta rozpoczęcia:</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="minuty"
                  placeholderTextColor="gray"
                  onChangeText={props.handleChange("startingMinute")}
                  value={props.values.startingMinute}
                  onBlur={props.handleBlur("startingMinute")}
                  keyboardType={"phone-pad"}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.startingMinute && props.errors.startingMinute}
                </Text>
                <CustomButton
                  text="Zamień"
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
  text: {
    marginBottom: 30,
  },
});
