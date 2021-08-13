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
  alert: yup
    .number()
    .test(
      "is-num-0-30",
      "Godzina musi mieścić się w przedziale od 0 do 30",
      (val) => {
        return val >= 0 && val <= 30;
      }
    )
    .nullable(true),
});

export default function ScheduleListExtendItemForm({
  addScheduleListItem,
  item,
  bigTitle,
  // pressHandlerDeleteItem,
}) {
  return (
    <ScrollView>
      <TouchableWithoutFeedback>
        <View style={globalStyles.cointainerWithContent}>
          <Text style={globalStyles.title}>{bigTitle}</Text>

          <Text>
            Wpisz o ile minut chcesz przedłużyć wybrany wykład i przesunąć
            WSZYSTKIE następujące po nim wykłady o daną ilość minut tego samego
            dnia.
          </Text>

          <Formik
            initialValues={{
              alert: "",
            }}
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
                  placeholder="liczba minut"
                  placeholderTextColor="gray"
                  onChangeText={props.handleChange("alarm")}
                  value={props.values.alarm}
                  onBlur={props.handleBlur("alarm")}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.alarm && props.errors.alarm}
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
});
