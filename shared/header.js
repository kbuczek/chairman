import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      {/* icon for the menu */}
      <View>
        <Text style={styles.headerText}>Chairman</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: Dimensions.get("screen").width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
  },
});
