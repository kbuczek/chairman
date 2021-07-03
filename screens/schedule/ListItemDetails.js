import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { globalStyles } from "../../styles/global";
import Card from "../../shared/card";
import DeleteButton from "../../shared/deleteButton";

export default function ListItemDetails({ route, navigation }) {
  const { key, title, person, day, notes } = route.params.item;
  const pressHandler = () => {
    navigation.goBack();
    route.params.pressHandlerDeleteItem(key);
  };

  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{person}</Text>
        <Text style={styles.text}>{notes}</Text>
        {/* <Button title="Usuń wykład" color="red" /> */}
      </Card>
      <DeleteButton text="usuń wykład" onPress={pressHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  text: {
    padding: 10,
  },
});
