import { Feather } from "@expo/vector-icons/";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { CommonInputStyles } from "../styles/globalStyles";

interface ButtonProps {
  text: string;
  iconName?: keyof typeof Feather.glyphMap;
  iconSize?: number;
  background?: string;
  color?: string;
  onButtonPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  iconName,
  iconSize = 24,
  onButtonPress,
  background,
  color,
}) => {
  return (
    <TouchableOpacity
      style={[
        CommonInputStyles.field,
        styles.btnField,
        background ? { backgroundColor: background } : {},
        { borderColor: color, borderWidth: 1 },
      ]}
      onPress={onButtonPress}
    >
      {iconName && <Feather name={iconName} size={iconSize} color={color} />}

      <Text style={[styles.btnText, { color: color }, { fontStyle: "italic" }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnField: {
    flexDirection: "row-reverse",
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  btnText: {
    textTransform: "uppercase",
    textAlign: "center",
    letterSpacing: 1,
    fontWeight: "500",
  },
});
