import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import ScheduleCalendar from "../screens/schedule/scheduleCalendar";
import ScheduleList from "../screens/schedule/scheduleList";
import ListItemDetails from "../screens/schedule/ListItemDetails";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default scheduleStackNav = ({ navigation }) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#427ad4",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="Schedule"
        component={ScheduleList}
        options={{
          title: "Harmonogram Konferencji",
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              size={28}
              color="white"
              onPress={openDrawer}
            />
          ),
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
      />
      <Stack.Screen
        name="ListItemDetails"
        component={ListItemDetails}
        options={{
          title: "Szczegóły wykładu",
          headerStyle: {
            backgroundColor: "#a9b9d1",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};
