import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { globalStyles } from "../styles/global";
import AlertFunction from ".//alertFunction";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CurrentTimer({
  title,
  day,
  startingHour,
  startingMinute,
  endingHour,
  endingMinute,
  alert,
  text,
  showAlarm,
}) {
  //   const [seconds, setSeconds] = useState(new Date().getSeconds());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [hours, setHours] = useState(new Date().getHours());
  const [getDataTimeBefore, setGetDataTimeBefore] = useState(1);
  const [getDataTimeAfter, setGetDataTimeAfter] = useState(1);

  const displayFrontZeros = (unit) => (unit < 10 ? `0${unit}` : unit);

  useEffect(() => {
    let secTimer = setInterval(() => {
      //   setSeconds(new Date().getSeconds());
      setMinutes(new Date().getMinutes());
      setHours(new Date().getHours());
    }, 10000);

    return () => clearInterval(secTimer);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const asyncGet = await AsyncStorage.getItem("savedTimeBefore");
      if (asyncGet !== null) {
        setGetDataTimeBefore(parseInt(asyncGet));
      }
    } catch (e) {
      console.log("Settings.js getData() reading error ", e);
    }
    try {
      const asyncGet = await AsyncStorage.getItem("savedTimeAfter");
      if (asyncGet !== null) {
        setGetDataTimeAfter(parseInt(asyncGet));
      }
    } catch (e) {
      console.log("Settings.js getData() reading error ", e);
    }
  };

  const checkTime = () => {
    let date = new Date();
    let todayDate =
      displayFrontZeros(date.getDate()) +
      "-" +
      displayFrontZeros(date.getMonth() + 1) +
      "-" +
      date.getFullYear();

    if (todayDate === day) {
      let startingTimeMinutes =
        parseInt(startingHour) * 60 + parseInt(startingMinute);
      let endingTimeMinutes =
        parseInt(endingHour) * 60 + parseInt(endingMinute);
      let currentTimeMinutes = hours * 60 + minutes;
      let toStartMinutesLeft = startingTimeMinutes - currentTimeMinutes;
      let toEndMinutesLeft = endingTimeMinutes - currentTimeMinutes;
      let overtimeMinutes = currentTimeMinutes - endingTimeMinutes;

      let interval = endingTimeMinutes - startingTimeMinutes;

      // console.log(alert);
      // console.log();
      if (
        parseInt(alert) &&
        parseInt(alert) < interval &&
        parseInt(alert) === toEndMinutesLeft
      ) {
        console.log("Alert 3");
        if (showAlarm) {
          AlertFunction(3, title);
        }
      }

      if (toStartMinutesLeft <= getDataTimeBefore && toStartMinutesLeft >= 0) {
        let thisHour = Math.floor(toStartMinutesLeft / 60);
        let thisMinute = toStartMinutesLeft - thisHour * 60;
        if (showAlarm) {
          if (thisHour === 0 && thisMinute === 0) {
            console.log("Alert 1");
            AlertFunction(1, title);
          }
        }

        return (
          <Text style={styles.starting}>
            {text && "Do rozpoczęcia pozostało: "}- {thisMinute} minut
          </Text>
        );
      } else if (toEndMinutesLeft <= interval && toEndMinutesLeft >= 0) {
        let thisHour = Math.floor(toEndMinutesLeft / 60);
        let thisMinute = toEndMinutesLeft - thisHour * 60;
        if (showAlarm) {
          if (thisHour === 0 && thisMinute === 0) {
            console.log("Alert 2");
            AlertFunction(2, title);
          }
        }

        return (
          <Text style={styles.ending}>
            {text && "Do zakończenia pozostało: "}
            {thisMinute} minut
          </Text>
        );
      } else if (overtimeMinutes <= getDataTimeAfter && overtimeMinutes > 0) {
        let thisHour = Math.floor(overtimeMinutes / 60);
        let thisMinute = overtimeMinutes - thisHour * 60;
        return (
          <Text style={styles.overtime}>
            {text && "Po czasie: "} +{thisMinute} minut
          </Text>
        );
      }
    }
  };

  return <View>{checkTime()}</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontFamily: "Nunito_700Bold",
    fontSize: 20,
  },
  text: {
    fontFamily: "Nunito_700Bold",
    padding: 10,
  },
  starting: {
    color: "green",
    fontSize: 18,
  },
  ending: {
    color: "orange",
    fontSize: 16,
  },
  overtime: {
    color: "red",
    fontSize: 16,
  },
});
