import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { globalStyles } from "../../styles/global";
import { Formik } from "formik";
import * as yup from "yup";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../shared/customButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const settingsSchema = yup.object({
  savedConference: yup.string().required().max(40),
  savedRoom: yup.string().required().max(40),
});

export default function Settings() {
  const [conference, setConference] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    getData();
    console.log("conference", conference);
  }, []);

  const storeData = async (values) => {
    try {
      await AsyncStorage.setItem("savedConference", values.savedConference);
      await AsyncStorage.setItem("savedRoom", values.savedRoom);
    } catch (e) {
      console.log("Settings.js storeData() saving error ", e);
    }
  };

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
          <Formik
            initialValues={{
              savedConference: conference,
              savedRoom: room,
            }}
            validationSchema={settingsSchema}
            enableReinitialize={true}
            onSubmit={(values, actions) => {
              storeData(values);
              // actions.resetForm();
              Alert.alert("Zapisano wprowadzone dane", "", [
                {
                  text: "Ok",
                },
              ]);
            }}
          >
            {(props) => (
              <View style={globalStyles.container}>
                <Text>Twoja konferencja</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="wpisz nazwę twojej konferencji"
                  placeholderTextColor="gray"
                  onChangeText={props.handleChange("savedConference")}
                  value={props.values.savedConference}
                  onBlur={props.handleBlur("savedConference")}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.savedConference &&
                    props.errors.savedConference}
                </Text>

                <Text>Twoja sala</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="wpisz numer twojej sali"
                  placeholderTextColor="gray"
                  onChangeText={props.handleChange("savedRoom")}
                  value={props.values.savedRoom}
                  onBlur={props.handleBlur("savedRoom")}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.savedRoom && props.errors.savedRoom}
                </Text>

                <CustomButton
                  text={"Zapisz "}
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
