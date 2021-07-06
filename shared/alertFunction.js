import { Alert } from "react-native";

const alertFunction = (option, title) => {
  if (option === 1) {
    Alert.alert("Rozpocznij wykład:", title, [
      {
        text: "Ok",
      },
    ]);
  }
  if (option === 2) {
    Alert.alert("Nastąpił koniec czasu wykładu:", title, [
      {
        text: "Ok",
      },
    ]);
  }
};

export default alertFunction;
