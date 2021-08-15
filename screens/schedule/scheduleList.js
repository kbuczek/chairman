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
import EmptyItem from "../../data/scheduleDataEmptyItem";
import convertDate from "../../shared/convertDate";
import { useFetch } from "../../shared/Api/useFetch";

const url = "http://10.0.2.2:5000/schedule";

export default function ScheduleList({ navigation }) {
  const { loading, products } = useFetch(url);
  // const [scheduleData, setScheduleData] = useState(Data);
  const [days, setDays] = useState([]);
  // const [dayItems, setDayItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProducts, setNewProducts] = useState([]);
  const option = "fizyka2021";

  // useEffect(() => {
  //   updateDays();
  //   // return () => setDays([]);
  // }, [scheduleData]);

  useEffect(() => {
    setNewProducts(products.filter((item) => item.conference === option));
  }, [products]);

  useEffect(() => {
    // updateDays();
    sortNewProducts();
  });

  const sortNewProducts = () => {
    newProducts.sort(
      (a, b) => parseInt(a.startingHour) - parseInt(b.startingHour)
    );
  };

  const updateDays = () => {
    console.log("updateDays()", days);

    newProducts.map(({ day }) => {
      if (!days.includes(day)) {
        setDays([...days, day]);
      }
    });

    let indices = [6, 7, 8, 9, 3, 4, 0, 1];
    days.sort((a, b) => {
      // let r = 0;
      return indices.find((i) => a.charCodeAt(i) - b.charCodeAt(i));
      // return r;
    });

    console.log(days);
  };

  const checkIfDayHasItemsLeft = () => {};

  const pressHandlerDeleteItem = (key) => {
    console.log("DELETE");
    //sprawdzic, czy dzien zawiera jeszcze jakies wyklady
    setScheduleData((previousScheduleData) => {
      return previousScheduleData.filter(
        (scheduleData) => scheduleData.key != key
      );
    });
  };

  const pressHandlerExtendLecture = (key) => {
    console.log("EXTEND", item);
  };

  const addScheduleListItem = (item) => {
    if (!item.key) {
      item.key = Math.random().toString(); //find better way to generate key
    }
    console.log(item);
    setScheduleData((prevScheduleData) => {
      return [item, ...prevScheduleData];
    });
    setIsModalOpen(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={globalStyles.container}>
          {/* Modal */}
          <Modal visible={isModalOpen} animationType="slide">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={() => setIsModalOpen(false)}>
                  <View style={globalStyles.row}>
                    <MaterialIcons
                      name="chevron-left"
                      size={24}
                      style={styles.modalClose}
                    />
                    <Text style={styles.modalCloseText}>Cofnij</Text>
                  </View>
                </TouchableOpacity>
                {/* <ScrollView> */}
                <ScheduleListAddItemForm
                  addScheduleListItem={addScheduleListItem}
                  item={EmptyItem}
                  bigTitle={"Dodaj wykład"}
                  // pressHandlerDeleteItem={pressHandlerDeleteItem}
                />
                {/* </ScrollView> */}
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <TouchableOpacity onPress={() => setIsModalOpen(true)}>
            <View style={styles.modalToggle}>
              <MaterialIcons name="add" size={24} />
              <Text>Dodaj wykład</Text>
            </View>
          </TouchableOpacity>

          {updateDays()}
          <View style={styles.content}>
            {days.map((propDays, index) => {
              return (
                <View key={Math.random() * 1000}>
                  <Text style={styles.date}>{convertDate(propDays)}</Text>
                  {newProducts.map((item) => {
                    if (item.day === propDays) {
                      return (
                        <View key={item._id}>
                          <ScheduleListItem
                            item={item}
                            pressHandler={() =>
                              navigation.navigate("ListItemDetails", {
                                item,
                                pressHandlerDeleteItem,
                                pressHandlerExtendLecture,
                                addScheduleListItem,
                              })
                            }
                          />
                        </View>
                      );
                    }
                  })}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
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
  modalClose: {
    paddingTop: 30,
    paddingBottom: 10,
    // paddingRight: 10,
    alignSelf: "flex-start",
  },
  modalCloseText: {
    paddingTop: 32,
    paddingBottom: 10,
    paddingRight: 10,
    marginLeft: 0,
    alignSelf: "flex-start",
  },
  modalContent: { flex: 1, padding: 15 },
  date: {
    marginTop: 30,
    marginBottom: 0,
    paddingBottom: 0,
    fontSize: 24,
  },
});
