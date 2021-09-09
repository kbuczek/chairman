import * as Notification from "expo-notifications";

const handleNotification = () => {
  console.log("notification");

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
      title: "Rozpocznij wykład",
      body: "Wszystko o falach grawitacyjnych",
    },
    trigger: {
      // hour: 10,
      // minute: 42,
      // repeats: false,
      seconds: 5,
    },
  });
};

export default handleNotification;
