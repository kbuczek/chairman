import { Alert } from "react-native";
import notification from "./notification.js";

const alertFunction = (option, title) => {
  if (option === 1) {
    Alert.alert("Rozpocznij wykład:", title, [
      {
        text: "Ok",
      },
    ]);
    notification();
  }
  if (option === 2) {
    Alert.alert("Nastąpił koniec czasu wykładu:", title, [
      {
        text: "Ok",
      },
    ]);
    notification();
  }
  if (option === 3) {
    Alert.alert("Twój alert przed końcem wykładu", title, [
      {
        text: "Ok",
      },
    ]);
    notification();
  }
};

export default alertFunction;
