import { colors } from "@/ui/resources/colors";
import { appIcons } from "@/ui/resources/icons";
import { textStyles } from "@/ui/styles/globalStyles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface FabProps {
  btnText?: string;
  onFabPress: () => void;
}

export const FloatActionButton: React.FC<FabProps> = ({
  btnText,
  onFabPress,
}) => {
  return (
    <TouchableOpacity style={styles.circleBtn} onPress={onFabPress}>
      <FontAwesome5
        name={appIcons.fontAwesome5.plus}
        color={colors.night.LIGHT}
        size={18}
      />
      {btnText != undefined && (
        <Text style={textStyles.textLight}>{btnText}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circleBtn: {
    backgroundColor: colors.night.PRIMARY,
    height: 60,
    position: "absolute",
    bottom: 32,
    right: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
  },
});
