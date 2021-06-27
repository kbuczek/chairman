import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { globalStyles } from "../styles/global";

export default function About() {
  return (
    <View style={globalStyles.container}>
      <Text>About Screen</Text>
      <Image source={require("../assets/working.jpg")} />
    </View>
  );
}

const styles = StyleSheet.create({});
