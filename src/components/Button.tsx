import { Feather } from "@expo/vector-icons/";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { CommonInputStyles } from "../styles/globalStyles";

interface ButtonProps {
  text: string;
  iconName?: keyof typeof Feather.glyphMap;
  iconSize?: number;
  onButtonPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  iconName,
  iconSize = 24,
  onButtonPress,
}) => {
  return (
    <TouchableOpacity
      style={[CommonInputStyles.field, styles.btnField]}
      onPress={onButtonPress}
    >
      {iconName && <Feather name={iconName} size={iconSize} />}

      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnField: {
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    textTransform: "uppercase",
    width: "100%",
    textAlign: "center",
    letterSpacing: 1,
    fontWeight: "500",
  },
});
