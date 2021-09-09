import * as Notification from "expo-notifications";

const handleNotification = (
  titleText = "Brak tytułu notyfikacji",
  bodyText = "Brak treści notyfikacji",
  secondsToDisplay
) => {
  Notification.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldPlaySound: true,
        shouldShowAlert: true,
      };
    },
  });

  Notification.scheduleNotificationAsync({
    content: {
      title: titleText,
      body: bodyText,
    },
    trigger: {
      seconds: secondsToDisplay,
      repeats: false,
    },
  });
};

export default handleNotification;
