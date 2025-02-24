import { colors } from "@/ui/resources/colors";
import { textStyles } from "@/ui/styles/globalStyles";
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
        style={[
          textStyles.h6_label,
          isTextLight ? textStyles.textLight : {},
          styles.label,
        ]}
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
    backgroundColor: colors.night.WARN,
    width: 160,
    height: 112,
    maxWidth: "32%",
    padding: 16,
    borderRadius: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  countValue: {
    textAlign: "center",
    height: 52,
  },
  label: {
    textAlign: "center",
    height: 36,
  },
});
