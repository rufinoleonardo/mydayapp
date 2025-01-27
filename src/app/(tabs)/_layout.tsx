import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs initialRouteName="home/index">
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Entypo name="home" size={24} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="newtask/index"
        options={{
          title: "New Task",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialIcons name="add-task" size={24} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
