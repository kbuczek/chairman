import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from "../styles/global";

export default function CurrentTimer({
  day,
  startingHour,
  startingMinute,
  endingHour,
  endingMinute,
  text,
}) {
  //   const [seconds, setSeconds] = useState(new Date().getSeconds());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [hours, setHours] = useState(new Date().getHours());
  //   const { key, title, person, day, notes } = route.params.item;

  const displayFrontZeros = (unit) => (unit < 10 ? `0${unit}` : unit);

  useEffect(() => {
    let secTimer = setInterval(() => {
      //   setSeconds(new Date().getSeconds());
      setMinutes(new Date().getMinutes());
      setHours(new Date().getHours());
    }, 1000);

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

    // if (todayDate === day) {
    //   if (startingHour - hours === 1) {
    //     // console.log(startingHour);
    //     // console.log(hours);
    //     // console.log(startingHour - hours);
    //     return (
    //       <>
    //         {text && (
    //           <Text style={styles.starting}>Do rozpoczęcia pozostało:</Text>
    //         )}
    //         <Text>
    //           {displayFrontZeros(startingHour - (hours + 1))}:
    //           {startingMinute - minutes}
    //         </Text>
    //       </>
    //     );
    //   } else if (endingHour - hours <= endingHour - startingHour) {
    //     return (
    //       <>
    //         {text && (
    //           <Text style={styles.ending}>Do zakończenia pozostało:</Text>
    //         )}
    //         <Text style={styles.ending}>
    //           {endingHour - hours}:{endingMinute - minutes}
    //         </Text>
    //       </>
    //     );
    //   } else if (endingHour - hour > 1) {
    //     return (
    //       <>
    //         {text && <Text style={styles.overtime}>Przekroczony czas:</Text>}
    //         <Text style={styles.ending}>
    //           {endingHour - hours}:{endingMinute - minutes}
    //         </Text>
    //       </>
    //     );
    //   }
    // }

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

      if (toStartMinutesLeft <= 90 && toStartMinutesLeft >= 0) {
        let thisHour = Math.floor(toStartMinutesLeft / 60);
        let thisMinute = toStartMinutesLeft - thisHour * 60;
        return (
          <Text style={styles.starting}>
            {text && "Do rozpoczęcia pozostało:"}+ {thisHour} godzin{", "}
            {thisMinute} minut
          </Text>
        );
      } else if (toEndMinutesLeft <= 90 && toEndMinutesLeft >= 0) {
        let thisHour = Math.floor(toEndMinutesLeft / 60);
        let thisMinute = toEndMinutesLeft - thisHour * 60;
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

  return (
    <View style={globalStyles.container}>
      {/* <Text>
        {displayFrontZeros(hours)}:{displayFrontZeros(minutes)}:
        {displayFrontZeros(seconds)} */}
      {checkTime()}
      {/* </Text> */}
    </View>
  );
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
