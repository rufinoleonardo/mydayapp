import { colors } from "@/ui/resources/colors";
import { appIcons } from "@/ui/resources/icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { Link, usePathname } from "expo-router";
import { Image, View } from "react-native";

export const AppHeader: React.FC = () => {
  const pageName = usePathname();

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
      <Link href="/home" asChild>
        <Image
          source={require("@/assets/logo_light.png")}
          style={{
            height: 50,
            width: 180,
            resizeMode: "contain",
            alignItems: "flex-start",
          }}
        />
      </Link>

      {pageName === "/about" ? (
        <Link href="/home" asChild>
          <AntDesign name={appIcons.antDesign.close} size={28} color="white" />
        </Link>
      ) : (
        <Link href="/about" asChild>
          <Entypo name={appIcons.entypo.info} size={28} color="white" />
        </Link>
      )}
    </View>
  );
};
