import React, { useState, useEffect, useContext } from "react";
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
import { add, set } from "react-native-reanimated";
import notification from "../../shared/notification";
import * as Notifications from "expo-notifications";
import displayFrontZeros from "../../shared/displayFrontZeros";
import AppContext from "../../shared/AppContext";

export default function ScheduleList({ navigation }) {
  // let { loading, products } = useFetch(Urls.baseUrl);
  // const [scheduleData, setScheduleData] = useState(Data);
  const [days, setDays] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProducts, setNewProducts] = useState([]);
  const [myConference, setMyConference] = useState("");
  const [myRoom, setMyRoom] = useState("");
  const [conferencesList, setConferencesList] = useState([]);
  const globalConferencesContext = useContext(AppContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
      FetchNoData(Urls.baseUrl).then((response) => setProducts(response));
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    FetchNoData(Urls.baseUrl).then((response) => setProducts(response));
    getData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products]);

  useEffect(() => {
    updateDays();
    sortNewProducts();
    addAllNotifications();
    updateConferencesList();
  }, [newProducts]);

  const filterProducts = () => {
    setNewProducts(
      products.filter(
        (item) => item.conference === myConference && item.room === myRoom
      )
    );
  };

  const getData = async () => {
    try {
      const getDataConference = await AsyncStorage.getItem("savedConference");
      if (getDataConference !== null) {
        setMyConference(getDataConference);
      }
    } catch (e) {
      console.log("scheduleList.js getData() reading error ", e);
    }
    try {
      const getDataRoom = await AsyncStorage.getItem("savedRoom");
      if (getDataRoom !== null) {
        setMyRoom(getDataRoom);
      }
    } catch (e) {
      console.log("scheduleList.js getData() reading error ", e);
    }
  };

  const sortNewProducts = () => {
    newProducts.sort(
      (a, b) =>
        parseInt(a.startingHour) - parseInt(b.startingHour) ||
        parseInt(a.startingMinute) - parseInt(b.startingMinute)
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

  const updateConferencesList = () => {
    let conferencesArray = [];
    products.map(({ conference }) => {
      if (!conferencesArray.includes(conference)) {
        conferencesArray.push(conference);
      }
    });
    // console.log(conferencesArray);
    // setConferencesList(conferencesArray);
    globalConferencesContext.changeGlobalConferences(conferencesArray);
  };

  const addAllNotifications = () => {
    console.log("add all notifications");
    Notifications.cancelAllScheduledNotificationsAsync();

    let date = new Date();
    let todayDate =
      displayFrontZeros(date.getDate()) +
      "-" +
      displayFrontZeros(date.getMonth() + 1) +
      "-" +
      date.getFullYear();

    newProducts.map(
      ({
        title,
        day,
        startingHour,
        startingMinute,
        endingHour,
        endingMinute,
        alert,
      }) => {
        if (day === todayDate) {
          // console.log(todayDate);
          const currentHour = date.getHours();
          const currentMinute = date.getMinutes();
          if (
            parseInt(startingHour) >= currentHour &&
            parseInt(startingMinute) >= currentMinute
          ) {
            console.log("STARTIG");
            const notificationSeconds =
              (parseInt(startingHour) - currentHour) * 3600 +
              (parseInt(startingMinute) - currentMinute) * 60;

            notification("Rozpocznij wykład", title, notificationSeconds - 15);
          }

          if (
            parseInt(endingHour) >= currentHour &&
            parseInt(endingMinute) >= currentMinute
          ) {
            console.log("ENDING");
            const notificationSeconds =
              (parseInt(endingHour) - currentHour) * 3600 +
              (parseInt(endingMinute) - currentMinute) * 60;

            notification("Zakończ wykład", title, notificationSeconds - 15);

            if (alert > 0 && notificationSeconds - alert * 60 > 0) {
              console.log("ALERT");
              notification(
                "ALERT",
                "Alert wykładu " + title,
                notificationSeconds - alert * 60 - 15
              );
            }
          }
        }
      }
    );
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
    navigation.goBack();

    const itemNewStartingMinute =
      parseInt(item.startingMinute) + parseInt(value);
    const itemNewEndingMinute = parseInt(item.endingMinute) + parseInt(value);
    const interval =
      parseInt(item.endingHour) * 60 +
      parseInt(item.endingMinute) -
      (parseInt(item.startingHour) * 60 + parseInt(item.startingMinute));
    let correctInterval = false;

    const forwardScheduleTime = (
      thisMinute,
      thisHour,
      itemNewMinute,
      myObject
    ) => {
      if (itemNewMinute < 60) {
        myObject[thisMinute] = itemNewMinute;
      } else {
        myObject[thisHour] = parseInt(myObject[thisHour]) + 1;
        myObject[thisMinute] = itemNewMinute - 60;
      }
    };

    const backwardScheduleTime = (
      thisMinute,
      thisHour,
      itemNewMinute,
      myObject
    ) => {
      if (itemNewMinute >= 0) {
        myObject[thisMinute] = itemNewMinute;
      } else {
        myObject[thisHour] = parseInt(myObject[thisHour]) - 1;
        myObject[thisMinute] = itemNewMinute + 60;
      }
    };

    if (value > 0) {
      correctInterval = true;
      forwardScheduleTime(
        "endingMinute",
        "endingHour",
        itemNewEndingMinute,
        item
      );
    } else if (-value < interval) {
      correctInterval = true;
      backwardScheduleTime(
        "endingMinute",
        "endingHour",
        itemNewEndingMinute,
        item
      );
    }

    if (correctInterval) {
      FetchWithData(Urls.baseUrl + `/update/${item._id}`, "POST", item).then(
        () => {
          FetchNoData(Urls.baseUrl).then((response) => setProducts(response));
        }
      );

      newProducts.map((e) => {
        if (e.day === item.day) {
          if (
            parseInt(e.startingHour) > parseInt(item.startingHour) ||
            (parseInt(e.startingHour) === parseInt(item.startingHour) &&
              parseInt(e.startingMinute) > parseInt(item.startingMinute))
          ) {
            const eNewStartingMinute =
              parseInt(e.startingMinute) + parseInt(value);
            const eNewEndingMinute = parseInt(e.endingMinute) + parseInt(value);

            if (value > 0) {
              forwardScheduleTime(
                "startingMinute",
                "startingHour",
                eNewStartingMinute,
                e
              );

              forwardScheduleTime(
                "endingMinute",
                "endingHour",
                eNewEndingMinute,
                e
              );
            } else if (value < 0) {
              backwardScheduleTime(
                "startingMinute",
                "startingHour",
                eNewStartingMinute,
                e
              );

              backwardScheduleTime(
                "endingMinute",
                "endingHour",
                eNewEndingMinute,
                e
              );
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
    }
  };

  const pressHandlerChangeWithLecture = (
    thisDay,
    thisHour,
    thisMinute,
    item
  ) => {
    console.log("CHANGE WITH");
    navigation.goBack();

    newProducts.map((e) => {
      if (
        e.day === thisDay &&
        e.startingHour === thisHour &&
        e.startingMinute === thisMinute
      ) {
        const tempEndingHour = e.endingHour;
        const tempEndingMinute = e.endingMinute;

        e.day = item.day;
        e.startingHour = item.startingHour;
        e.startingMinute = item.startingMinute;
        e.endingHour = item.endingHour;
        e.endingMinute = item.endingMinute;

        FetchWithData(Urls.baseUrl + `/update/${e._id}`, "POST", e).then(() => {
          FetchNoData(Urls.baseUrl).then((response) => setProducts(response));
        });

        item.day = thisDay;
        item.startingHour = thisHour;
        item.startingMinute = thisMinute;
        item.endingHour = tempEndingHour;
        item.endingMinute = tempEndingMinute;

        FetchWithData(Urls.baseUrl + `/update/${item._id}`, "POST", item).then(
          () => {
            FetchNoData(Urls.baseUrl).then((response) => setProducts(response));
          }
        );
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
                  2. Wybierz z listy nazwę twojej KONFERENCJI oraz nazwę twojej
                  SALI.
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
                              pressHandler={() => {
                                // notification("AAA", "BBB", 10),
                                // Notifications.cancelAllScheduledNotificationsAsync(),
                                navigation.navigate("ListItemDetails", {
                                  item,
                                  pressHandlerDeleteItem,
                                  pressHandlerExtendLecture,
                                  pressHandlerChangeWithLecture,
                                  editScheduleListItem,
                                });
                              }}
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
