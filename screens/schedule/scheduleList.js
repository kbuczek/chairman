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
import EmptyItem from "../../data/scheduleDataEmptyItem";
import convertDate from "../../shared/convertDate";
import { useFetch } from "../../shared/Api/useFetch";
import FetchWithData from "../../shared/Api/fetchWithData";
import FetchNoData from "../../shared/Api/fetchNoData";
import Urls from "../../shared/Api/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "react-native-reanimated";

export default function ScheduleList({ navigation }) {
  // let { loading, products } = useFetch(Urls.baseUrl);
  // const [scheduleData, setScheduleData] = useState(Data);
  const [days, setDays] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProducts, setNewProducts] = useState([]);
  const [conference, setConference] = useState("");
  const [room, setRoom] = useState("");

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
      FetchNoData(Urls.baseUrl).then((response) => setProducts(response));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // setProducts(FetchNoData(Urls.baseUrl));
    FetchNoData(Urls.baseUrl).then((response) => setProducts(response));
    getData();
    console.log("here");
    // updateDays();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products]);

  useEffect(() => {
    updateDays();
    console.log("NEWPRODUSSSSSS", newProducts);
    console.log("DAYS", days);
  }, [newProducts]);

  const filterProducts = () => {
    setNewProducts(
      products.filter(
        (item) => item.conference === conference && item.room === room
      )
    );
  };

  const getData = async () => {
    try {
      const getDataConference = await AsyncStorage.getItem("savedConference");
      if (getDataConference !== null) {
        setConference(getDataConference);
      }
    } catch (e) {
      console.log("scheduleList.js getData() reading error ", e);
    }
    try {
      const getDataRoom = await AsyncStorage.getItem("savedRoom");
      if (getDataRoom !== null) {
        setRoom(getDataRoom);
      }
    } catch (e) {
      console.log("scheduleList.js getData() reading error ", e);
    }
  };

  const sortNewProducts = () => {
    newProducts.sort(
      (a, b) => parseInt(a.startingHour) - parseInt(b.startingHour)
    );
  };

  const updateDays = () => {
    let newDays = [];

    console.log("updateDays", newProducts);
    newProducts.map(({ day }) => {
      if (!newDays.includes(day)) {
        newDays.push(day);
      }
    });

    let indices = [6, 7, 8, 9, 3, 4, 0, 1];
    newDays.sort((a, b) => {
      // let r = 0;
      return indices.find((i) => a.charCodeAt(i) - b.charCodeAt(i));
      // return r;
    });
    setDays(newDays);
    // console.log(days);
  };

  const pressHandlerDeleteItem = (id) => {
    console.log("DELETE");
    setDays([]);
    FetchNoData(Urls.baseUrl + `/${id}`, "DELETE").then(() =>
      FetchNoData(Urls.baseUrl).then((response) => setProducts(response))
    );
    // forceUpdate();
  };

  const pressHandlerExtendLecture = (key) => {
    console.log("EXTEND", key);
  };

  const addScheduleListItem = (newValues, id) => {
    setDays([]);
    FetchWithData(Urls.add, "POST", newValues).then(() => {
      FetchNoData(Urls.baseUrl).then((response) => setProducts(response));
    });
    setIsModalOpen(false);
  };

  const editScheduleListItem = (newValues, id) => {
    console.log("EDIT");
    setDays([]);
    navigation.goBack();
    FetchNoData(Urls.baseUrl + `/${id}`, "DELETE");
    FetchWithData(Urls.add, "POST", newValues).then(() => {
      FetchNoData(Urls.baseUrl).then((response) => setProducts(response));
    });

    // forceUpdate();
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
              <Text style={{ color: "white" }}>Dodaj wykład</Text>
              <MaterialIcons name="add" size={19} color={"white"} />
            </View>
          </TouchableOpacity>

          {/* {updateDays()} */}
          {sortNewProducts()}
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
                                editScheduleListItem,
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
    // borderWidth: 2,
    // borderColor: "#21963c",
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
    color: "white",
    backgroundColor: "#28a745",
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
