import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ScheduleListItem({ item, pressHandler }) {
  return (
    <TouchableOpacity onPress={() => pressHandler(item.key)}>
      <View style={styles.item}>
        <Text>
          {item.startingHour}:{item.startingMinute} - {item.endingHour}:
          {item.endingMinute}
        </Text>
        <Text style={styles.itemText}>{item.title}</Text>
        {/* <MaterialIcons name="delete" size={18} color="#333" /> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    // borderStyle: "dashed",
    borderRadius: 10,
    flexDirection: "row",
  },
  itemText: {
    marginLeft: 10,
  },
});
