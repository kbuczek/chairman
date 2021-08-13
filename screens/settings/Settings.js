import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { globalStyles } from "../../styles/global";

export default function Settings() {
  return (
    <View style={globalStyles.container}>
      <Text>Wpisz nazwę konferencji</Text>
      <Text>Wpisz nazwę sali</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
