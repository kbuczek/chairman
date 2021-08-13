import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import ScheduleStackNav from "./scheduleStackNav";
import SettingsStackNav from "./settingsStackNav";

const Drawer = createDrawerNavigator();

export default DrawerNav = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Harmonogram">
        <Drawer.Screen name="Harmonogram" component={ScheduleStackNav} />
        {/* <Drawer.Screen name="Home" component={HomeStackNav} /> */}
        <Drawer.Screen name="Ustawienia" component={SettingsStackNav} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
