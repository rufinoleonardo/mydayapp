import { textStyles } from "@/styles/globalStyles";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface CardProps {
  label: string;
  countValue: string | number;
  isTextLight: boolean;
  color?: string;
  onPressCard: () => void;
}

export const Card: React.FC<CardProps> = ({
  label,
  countValue,
  color,
  isTextLight = false,
  onPressCard,
}) => {
  return (
    <TouchableOpacity
      onPress={onPressCard}
      style={[styles.container, color ? { backgroundColor: color } : {}]}
    >
      <Text
        style={[textStyles.h6_label, isTextLight ? textStyles.textLight : {}]}
      >
        {label}
      </Text>
      <Text
        style={[
          textStyles.h3_subHeading,
          styles.countValue,
          isTextLight ? textStyles.textLight : {},
        ]}
      >
        {countValue}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffeb84",
    width: 160,
    maxWidth: "32%",
    padding: 8,
    borderRadius: 8,
  },
  countValue: {
    textAlign: "center",
  },
});
