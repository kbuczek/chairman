import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Button } from "react-native";
import BackgroundTimer from "react-native-background-timer";
import { globalStyles } from "../styles/global";
import Card from "./card";

export default function Timer() {
  const [secondsLeft, setSecondsLeft] = useState(61);
  const [isTimerOn, setIsTimerOn] = useState(false);

  //stop the timer when seconds go to zero
  useEffect(() => {
    if (secondsLeft === 0) {
    //   BackgroundTimer.stopBackgroundTimer();
    }
  }, [secondsLeft]);

  const startTimer = () => {
    //runs timer in the background every second
    // BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft((prevSecondsLeft) => {
        if (prevSecondsLeft > 0) return prevSecondsLeft - 1;
        else return 0;
      });
    }, 1000);
  };

  useEffect(() => {
    if (isTimerOn) {
      startTimer();
    } else {
    //   BackgroundTimer.stopBackgroundTimer();
    }

    return () => {
    //   BackgroundTimer.stopBackgroundTimer();
    };
  }, [isTimerOn]); //whenever the timerOn value changes

  const displayFrontZeros = (unit) => (unit < 10 ? `0${unit}` : unit);

  const secToMinAndHours = () => {
    let hours = Math.floor(secondsLeft / 60 / 60);
    let minutes = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);

    let displayHours = displayFrontZeros(hours);
    let displayMinutes = displayFrontZeros(minutes);
    let displaySeconds = displayFrontZeros(seconds);

    return {
      displayHours,
      displayMinutes,
      displaySeconds,
    };
  };

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.time}>Czasomierz</Text>
        <Text>
          {secToMinAndHours().displayHours} :{secToMinAndHours().displayMinutes}
          :{secToMinAndHours().displaySeconds}
        </Text>
        <Button title="Start/Stop" onPress={() => setIsTimerOn(!isTimerOn)} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  time: {
    fontSize: 20,
  },
});
