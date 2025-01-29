import { Colors } from "@/styles/globalColors";
import { Sizes } from "@/styles/globalSizes";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScreenProps, Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs initialRouteName="home/index">
      <Tabs.Screen
        name="report/index"
        options={{
          title: "Report",
          headerStyle: {
            backgroundColor: Colors.BLUE_DARK,
          },
          headerTitleStyle: {
            color: Colors.GRAY_LIGHT,
            fontSize: Sizes.TEXT_H1,
          },
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialIcons name="description" size={24} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: Colors.BLUE_DARK,
          },
          headerTitleStyle: {
            color: Colors.GRAY_LIGHT,
            fontSize: Sizes.TEXT_H1,
          },
          tabBarIcon: ({ focused, color, size }) => {
            return <Entypo name="home" size={24} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="newtask/index"
        options={{
          title: "New Task",
          headerStyle: {
            backgroundColor: Colors.BLUE_DARK,
          },
          headerTitleStyle: {
            color: Colors.GRAY_LIGHT,
            fontSize: Sizes.TEXT_H1,
          },
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialIcons name="add-task" size={24} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}

const sprops: ScreenProps = {
  options: {},
};
