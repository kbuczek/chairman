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
  alarm: yup
    .number()
    .integer()
    .test(
      "is-num--60-60",
      "Godzina musi mieścić się w przedziale od -60 do 60",
      (val) => {
        return val >= -60 && val <= 60;
      }
    )
    .nullable(true),
});

export default function ScheduleListExtendItemForm({
  pressHandlerExtendLecture,
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
              alarm: "",
            }}
            validationSchema={scheduleSchema}
            onSubmit={(values, actions) => {
              actions.resetForm();
              pressHandlerExtendLecture(values.alarm, item);
            }}
          >
            {(props) => (
              <View>
                <Text style={{ marginBottom: 15 }}>
                  Wpisz o ile minut chcesz przedłużyć (lub skrócić - należy
                  wtedy umieścić liczbę ujemną) wybrany wykład i przesunąć
                  WSZYSTKIE następujące po nim wykłady o podaną ilość minut tego
                  samego dnia.
                </Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="liczba minut"
                  placeholderTextColor="gray"
                  onChangeText={props.handleChange("alarm")}
                  value={props.values.alarm}
                  onBlur={props.handleBlur("alarm")}
                  keyboardType={"phone-pad"}
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
