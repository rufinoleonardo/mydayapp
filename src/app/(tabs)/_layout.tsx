import { useAppSelector } from "@/redux/hooks";
import { appIcons } from "@/ui/resources/icons";
import { gStyles } from "@/ui/styles/globalStyles";
import Entypo from "@expo/vector-icons/Entypo";
import Foundation from "@expo/vector-icons/Foundation";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScreenProps, Tabs, useRouter } from "expo-router";

export default function Layout() {
  const { strings } = useAppSelector((state) => state.language);
  const router = useRouter();

  return (
    <Tabs initialRouteName="home/index">
      <Tabs.Screen
        name="report/index"
        options={{
          title: strings.general_TabBar.report,
          headerStyle: gStyles.tab.headerStyle,
          headerTitleStyle: gStyles.tab.headerTitleStyle,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialIcons
                name={appIcons.materialcons.report}
                size={24}
                color={color}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="home/index"
        options={{
          title: strings.general_TabBar.home,
          headerStyle: gStyles.tab.headerStyle,
          headerTitleStyle: gStyles.tab.headerTitleStyle,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Entypo name={appIcons.entypo.home} size={24} color={color} />
            );
          },
        }}
      />

      <Tabs.Screen
        name="target"
        options={{
          title: strings.screen_Targets.title,
          headerStyle: gStyles.tab.headerStyle,
          headerTitleStyle: gStyles.tab.headerTitleStyle,
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <Foundation
                name={appIcons.foundation.target}
                size={28}
                color={color}
              />
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            // Redireciona para a rota index ao clicar no ícone da TabBar
            e.preventDefault();
            router.replace("/target");
          },
        }}
      />
    </Tabs>
  );
}

const sprops: ScreenProps = {
  options: {},
};
