import { colors } from "@/ui/resources/colors";
import { appIcons } from "@/ui/resources/icons";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";
import { Image, View } from "react-native";

export const AppHeader: React.FC = () => {
  return (
    <View
      style={{
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.night.DARK,
        paddingHorizontal: 12,
        paddingVertical: 4,
      }}
    >
      <Image
        source={require("@/assets/logo_light.png")}
        style={{
          height: 50,
          width: 180,
          resizeMode: "contain",
          alignItems: "flex-start",
        }}
      />

      <Link href="/about" asChild>
        <Entypo name={appIcons.entypo.info} size={28} color="white" />
      </Link>
    </View>
  );
};
