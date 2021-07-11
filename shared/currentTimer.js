import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { globalStyles } from "../styles/global";
import AlertFunction from ".//alertFunction";

export default function CurrentTimer({
  title,
  day,
  startingHour,
  startingMinute,
  endingHour,
  endingMinute,
  alert,
  text,
}) {
  //   const [seconds, setSeconds] = useState(new Date().getSeconds());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [hours, setHours] = useState(new Date().getHours());

  const displayFrontZeros = (unit) => (unit < 10 ? `0${unit}` : unit);

  useEffect(() => {
    let secTimer = setInterval(() => {
      //   setSeconds(new Date().getSeconds());
      setMinutes(new Date().getMinutes());
      setHours(new Date().getHours());
    }, 55000);

    // let minTimer = setInterval(() => {
    //   setMinutes(new Date().getMinutes());
    // }, 10000);

    return () => clearInterval(secTimer);
  }, []);

  const alarm = () => {};

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

      console.log(alert);
      // console.log(toEndMinutesLeft);
      if (parseInt(alert) < interval && parseInt(alert) === toEndMinutesLeft) {
        console.log("Alert 3");
        AlertFunction(3, title);
      }

      if (toStartMinutesLeft <= 90 && toStartMinutesLeft >= 0) {
        let thisHour = Math.floor(toStartMinutesLeft / 60);
        let thisMinute = toStartMinutesLeft - thisHour * 60;
        if (thisHour === 0 && thisMinute === 0) {
          console.log("Alert 1");
          AlertFunction(1, title);
        }
        return (
          <Text style={styles.starting}>
            {text && "Do rozpoczęcia pozostało:"}+ {thisHour} godzin{", "}
            {thisMinute} minut
          </Text>
        );
      } else if (toEndMinutesLeft <= 90 && toEndMinutesLeft >= 0) {
        let thisHour = Math.floor(toEndMinutesLeft / 60);
        let thisMinute = toEndMinutesLeft - thisHour * 60;
        if (thisHour === 0 && thisMinute === 0) {
          console.log("Alert 2");
          AlertFunction(2, title);
        }
        return (
          <Text style={styles.ending}>
            {text && "Do zakończenia pozostało:"} {thisHour} godzin{", "}
            {thisMinute} minut
          </Text>
        );
      } else if (overtimeMinutes <= 15 && overtimeMinutes > 0) {
        let thisHour = Math.floor(overtimeMinutes / 60);
        let thisMinute = overtimeMinutes - thisHour * 60;
        return (
          <Text style={styles.overtime}>
            {text && "Po czasie:"}- {thisHour} godzin{", "}
            {thisMinute} minut
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
