import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNav from "./homeStackNav";
import AboutStackNav from "./aboutStackNav";

const Drawer = createDrawerNavigator();

export default DrawerNav = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Harmonogram" component={HomeStackNav} />
        <Drawer.Screen name="About" component={AboutStackNav} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
