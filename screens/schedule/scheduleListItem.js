import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CurrentTimer from "../../shared/currentTimer";
import DisplayFrontZeros from "../../shared/displayFrontZeros";
import { Inter_800ExtraBold } from "@expo-google-fonts/inter";

export default function ScheduleListItem({ item, pressHandler }) {
  return (
    <TouchableOpacity onPress={() => pressHandler(item.key)}>
      <View style={styles.item}>
        <View style={styles.main}>
          <Text>
            {DisplayFrontZeros(item.startingHour)}:
            {DisplayFrontZeros(item.startingMinute)} -{" "}
            {DisplayFrontZeros(item.endingHour)}:
            {DisplayFrontZeros(item.endingMinute)}
          </Text>
          <Text style={styles.itemText}>{item.title}</Text>
          {/* <MaterialIcons name="delete" size={18} color="#333" /> */}
        </View>
        <View style={styles.timer}>
          <CurrentTimer
            title={item.title}
            day={item.day}
            startingHour={item.startingHour}
            startingMinute={item.startingMinute}
            endingHour={item.endingHour}
            endingMinute={item.endingMinute}
            alert={item.alert}
            text={false}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 10,
    marginBottom: 5,
    borderColor: "#dbdbdb",
    fontWeight: "800",
    // borderWidth: 1,
    // borderStyle: "dashed",
    borderRadius: 30,
    // flexDirection: "row",
    backgroundColor: "#f2f6fc",
    elevation: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#f5f8fc",
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
  },
  main: {
    flexDirection: "row",
  },
  timer: {
    paddingTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    marginLeft: 10,
    fontSize: 15,
    paddingRight: 50,
  },
});
