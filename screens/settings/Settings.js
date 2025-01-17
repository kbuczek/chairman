import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import { globalStyles } from "../../styles/global";
import { Formik } from "formik";
import * as yup from "yup";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../shared/customButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import AppContext from "../../shared/AppContext";

const settingsSchema = yup.object({
  savedConference: yup.string().required().max(40),
  savedRoom: yup.string().required().max(40),
  savedTimeBefore: yup
    .number()
    .integer()
    .required()
    .test(
      "is-num-0-180",
      "Minuty muszą mieścić się w przedziale od 0 do 60",
      (val) => {
        return val >= 0 && val <= 59;
      }
    ),
  savedTimeAfter: yup
    .number()
    .integer()
    .required()
    .test(
      "is-num-0-180",
      "Minuty muszą mieścić się w przedziale od 0 do 60",
      (val) => {
        return val >= 0 && val <= 59;
      }
    ),
});

export default function Settings() {
  const [conference, setConference] = useState("");
  const [room, setRoom] = useState("");
  const [timeBefore, setTimeBefore] = useState("");
  const [timeAfter, setTimeAfter] = useState("");
  const globalConferencesContext = useContext(AppContext);

  useEffect(() => {
    getData();
  }, []);

  const storeData = async (values) => {
    try {
      await AsyncStorage.setItem("savedConference", values.savedConference);
      await AsyncStorage.setItem("savedRoom", values.savedRoom);
      await AsyncStorage.setItem("savedTimeBefore", values.savedTimeBefore);
      await AsyncStorage.setItem("savedTimeAfter", values.savedTimeAfter);
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
    try {
      const getDataTimeBefore = await AsyncStorage.getItem("savedTimeBefore");
      if (getDataTimeBefore !== null) {
        setTimeBefore(getDataTimeBefore);
      }
    } catch (e) {
      console.log("Settings.js getData() reading error ", e);
    }
    try {
      const getDataTimeAfter = await AsyncStorage.getItem("savedTimeAfter");
      if (getDataTimeAfter !== null) {
        setTimeAfter(getDataTimeAfter);
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
              savedTimeBefore: timeBefore,
              savedTimeAfter: timeAfter,
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
                <View
                  style={{
                    borderColor: "lightgray",
                    borderRadius: 3,
                    borderWidth: 1,
                    marginBottom: 20,
                  }}
                >
                  <Picker
                    style={{ height: 50, width: 360 }}
                    mode="dropdown"
                    prompt={"Select language"}
                    itemStyle={{ backgroundColor: "gray" }}
                    selectedValue={props.values.savedConference}
                    onValueChange={props.handleChange("savedConference")}
                  >
                    {/* <Picker.Item
                      label="konferencja-fizyka-2021"
                      value="konferencja-fizyka-2021"
                    />
                    <Picker.Item label="fizyka2021" value="fizyka2021" />
                    <Picker.Item label="geografia-uj" value="geografia-uj" /> */}
                    {globalConferencesContext.array.map((item, id) => {
                      return <Picker.Item label={item} value={item} key={id} />;
                    })}
                  </Picker>
                </View>
                {/* <TextInput
                  style={globalStyles.input}
                  placeholder="wpisz nazwę twojej konferencji"
                  placeholderTextColor="gray"
                  onChangeText={props.handleChange("savedConference")}
                  value={props.values.savedConference}
                  onBlur={props.handleBlur("savedConference")}
                /> */}
                {/* <Text style={globalStyles.errorText}>
                  {props.touched.savedConference &&
                    props.errors.savedConference}
                </Text> */}

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

                <View
                  style={{
                    borderBottomColor: "lightgray",
                    borderBottomWidth: 1,
                    marginBottom: 30,
                  }}
                />

                <Text>Pokazuj czas do rozpoczęcia wykładu</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="wpisz ilość minut"
                  placeholderTextColor="gray"
                  onChangeText={props.handleChange("savedTimeBefore")}
                  value={props.values.savedTimeBefore}
                  onBlur={props.handleBlur("savedTimeBefore")}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.savedTimeBefore &&
                    props.errors.savedTimeBefore}
                </Text>

                <Text>Pokazuj czas po zakończeniu wykładu</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="wpisz ilość minut"
                  placeholderTextColor="gray"
                  onChangeText={props.handleChange("savedTimeAfter")}
                  value={props.values.savedTimeAfter}
                  onBlur={props.handleBlur("savedTimeAfter")}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.savedTimeAfter && props.errors.savedTimeAfter}
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
