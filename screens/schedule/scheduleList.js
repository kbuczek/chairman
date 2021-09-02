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
    console.log(days);
    // updateDays();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products]);

  useEffect(() => {
    updateDays();
    // console.log("NEWPRODUSSSSSS", newProducts);
    // console.log("DAYS", days);
    sortNewProducts();
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

    // console.log("updateDays", newProducts);
    newProducts.map(({ day }) => {
      if (!newDays.includes(day)) {
        newDays.push(day);
      }
    });

    newDays.sort((a, b) => {
      let aa = a.split("-").reverse().join(),
        bb = b.split("-").reverse().join();
      return aa < bb ? -1 : aa > bb ? 1 : 0;
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

  const pressHandlerExtendLecture = (value, item) => {
    console.log("EXTEND THIS", value);
    console.log("item id", item);
    // item.
    navigation.goBack();

    const itemNewStartingMinute =
      parseInt(item.startingMinute) + parseInt(value);
    if (itemNewStartingMinute < 60) {
      item.startingMinute = itemNewStartingMinute;
    } else {
      item.startingHour = parseInt(item.startingHour) + 1;
      item.startingMinute = itemNewStartingMinute - 60;
    }

    const itemNewEndingMinute = parseInt(item.endingMinute) + parseInt(value);
    if (itemNewEndingMinute < 60) {
      item.endingMinute = itemNewEndingMinute;
    } else {
      item.endingHour = parseInt(item.endingHour) + 1;
      item.endingMinute = itemNewEndingMinute - 60;
    }

    FetchWithData(Urls.baseUrl + `/update/${item._id}`, "POST", item).then(
      () => {
        FetchNoData(Urls.baseUrl).then((response) => setProducts(response));
      }
    );

    newProducts.map((e) => {
      if (e.day === item.day) {
        if (
          e.startingHour > item.startingHour ||
          (e.startingHour === item.startingHour &&
            e.startingMinute > item.startingMinute)
        ) {
          const eNewStartingMinute =
            parseInt(e.startingMinute) + parseInt(value);
          if (eNewStartingMinute < 60) {
            e.startingMinute = eNewStartingMinute;
          } else {
            e.startingHour = parseInt(e.startingHour) + 1;
            e.startingMinute = eNewStartingMinute - 60;
          }

          const eNewEndingMinute = parseInt(e.endingMinute) + parseInt(value);
          if (eNewEndingMinute < 60) {
            e.endingMinute = eNewEndingMinute;
          } else {
            e.endingHour = parseInt(e.endingHour) + 1;
            e.endingMinute = eNewEndingMinute - 60;
          }

          FetchWithData(Urls.baseUrl + `/update/${e._id}`, "POST", e).then(
            () => {
              FetchNoData(Urls.baseUrl).then((response) =>
                setProducts(response)
              );
            }
          );
        }
      }
    });
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
    // FetchNoData(Urls.baseUrl + `/${id}`, "DELETE");
    // FetchWithData(Urls.add, "POST", newValues).then(() => {
    //   FetchNoData(Urls.baseUrl).then((response) => setProducts(response));
    // });
    FetchWithData(Urls.baseUrl + `/update/${id}`, "POST", newValues).then(
      () => {
        FetchNoData(Urls.baseUrl).then((response) => setProducts(response));
      }
    );
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

          {/* {sortNewProducts()} */}
          <View style={styles.content}>
            {days.length === 0 ? (
              <View>
                <Text style={styles.message}>
                  Brak wykładów. Dodawanie pierwszego wykładu:
                </Text>
                <Text style={styles.message}>
                  1. Przejdź do zakładki "Ustawienia".
                </Text>
                <Text style={styles.message}>
                  2. Dodaj nazwę twojej KONFERENCJI oraz nazwę twojej SALI.
                </Text>
                <Text style={styles.message}>
                  3. Po wykonaniu punktów 1. i 2. możesz tutaj dodawać twoje
                  wykłady.
                </Text>
              </View>
            ) : (
              days.map((propDays, index) => {
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
              })
            )}
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
  message: {
    fontSize: 15,
    marginTop: 5,
    color: "gray",
  },
});
