import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Touchable,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ScheduleListItem from "./scheduleListItem";
import ScheduleListAddItemForm from "./scheduleListAddItemForm";
import { globalStyles } from "../../styles/global";
import Data from "../../data/scheduleData";

export default function ScheduleList({ navigation }) {
  const [scheduleData, setScheduleData] = useState(Data);
  const [days, setDays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function uniq(a) {
    setDays(Array.from(new Set(a)));
  }

  useEffect(() => {
    scheduleData.map(({ day }) => {
      // console.log(days.includes(day));
      // if (days.includes(day)) {
      setDays((oldArray) => [...oldArray, day]);
      // setDays(uniq(days));
      // }
    });

    // uniq(days);

    return () => setDays([]);
  }, [scheduleData]);

  // useEffect(() => {
  //   uniq(days);
  // }, [scheduleData]);

  const pressHandlerDeleteItem = (key) => {
    console.log("DELETE");
    setScheduleData((previousScheduleData) => {
      return previousScheduleData.filter(
        (scheduleData) => scheduleData.key != key
      );
    });
  };

  const addScheduleListItem = (item) => {
    item.key = Math.random().toString(); //find better way to generate key
    setScheduleData((prevScheduleData) => {
      return [item, ...prevScheduleData];
    });
    setIsModalOpen(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* <ScrollView> */}
      <View style={globalStyles.container}>
        {/* Modal */}
        <Modal visible={isModalOpen} animationType="slide">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <MaterialIcons
                name="close"
                size={24}
                style={{ ...styles.modalToggle, ...styles.modalClose }}
                onPress={() => setIsModalOpen(false)}
              />
              <ScrollView>
                <ScheduleListAddItemForm
                  addScheduleListItem={addScheduleListItem}
                />
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <TouchableOpacity onPress={() => setIsModalOpen(true)}>
          <View style={styles.modalToggle}>
            <MaterialIcons name="add" size={24} />
            <Text>Dodaj wykład</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.content}>
          {/* {console.log(days)} */}
          {days.map((prop) => {
            return (
              <View key={Math.random() * 1000}>
                <Text style={styles.date}>{prop}</Text>
                {/* {scheduleData.map((item) => {
                    console.log(item);
                    return (
                      <View key={item.key}>
                        <ScheduleListItem
                          item={item}
                          pressHandler={() =>
                            navigation.navigate("ListItemDetails", item)
                          }
                        />
                      </View>
                    );
                  })} */}
              </View>
            );
          })}
          <View style={styles.list}>
            <FlatList
              data={scheduleData}
              // dont have to add keyExtractor if you already have key property
              renderItem={({ item }) => (
                <ScheduleListItem
                  item={item}
                  pressHandler={() =>
                    navigation.navigate("ListItemDetails", {
                      item,
                      pressHandlerDeleteItem,
                    })
                  }
                />
              )}
            />
            {/* {scheduleData.map((item) => {
                return (
                  <View key={item.key}>
                    <ScheduleListItem
                      item={item}
                      pressHandler={() =>
                        navigation.navigate("ListItemDetails", item)
                      }
                    />
                  </View>
                );
              })} */}
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    // padding: 40,
    padding: 0,
    flex: 1,
  },
  list: {
    flex: 1,
  },
  modalToggle: {
    flexDirection: "row",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#dcdcdc",
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
  },
  modalClose: { marginTop: 20, marginBottom: 0 },
  modalContent: { flex: 1, padding: 15 },
  date: {
    // marginTop: 30,
    marginBottom: 0,
    paddingBottom: 0,
    fontSize: 24,
  },
});
