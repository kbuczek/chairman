import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import ReviewDetails from "../screens/reviewDetails";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default homeStackNav = ({ navigation }) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    // <NavigationContainer headerMode="none">
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#427ad4",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        height: 60,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Harmonogram konferencji",
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
        name="ReviewDetails"
        component={ReviewDetails}
        options={{
          title: "Review Details",
          headerStyle: {
            backgroundColor: "#bbb",
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
