import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CurrentTimer from "../../shared/currentTimer";
import DisplayFrontZeros from "../../shared/displayFrontZeros";

export default function ScheduleListItem({ item, pressHandler }) {
  return (
    <TouchableOpacity onPress={() => pressHandler(item.key)}>
      <View style={styles.item}>
        <Text>
          {DisplayFrontZeros(item.startingHour)}:
          {DisplayFrontZeros(item.startingMinute)} -{" "}
          {DisplayFrontZeros(item.endingHour)}:
          {DisplayFrontZeros(item.endingMinute)}
        </Text>
        <Text style={styles.itemText}>{item.title}</Text>
        {/* <MaterialIcons name="delete" size={18} color="#333" /> */}
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 10,
    marginBottom: 5,
    borderColor: "#dbdbdb",
    borderWidth: 1,
    // borderStyle: "dashed",
    borderRadius: 30,
    flexDirection: "row",
    backgroundColor: "white",
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  itemText: {
    marginLeft: 10,
  },
});
