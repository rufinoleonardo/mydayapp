import { TargetProps } from "@/data/types/TargetProps";
import { colors } from "@/ui/resources/colors";
import { appIcons } from "@/ui/resources/icons";
import { textStyles } from "@/ui/styles/globalStyles";
import Foundation from "@expo/vector-icons/Foundation";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ProgressBar } from "./ProgressBar";

interface TargetCardProps {
  onCardPress: () => void;
  title: string;
  color: string;
  target: TargetProps;
}

export const TargetCard: React.FC<TargetCardProps> = ({
  onCardPress,
  title,
  color,
  target,
}) => {
  function calculatePercentual(target: TargetProps): number {
    const createdAt = target.createdAt.valueOf() / 1000 / 3600 / 24;
    const todayStr = new Date().toISOString().split("T")[0];
    const today = new Date(todayStr).valueOf() / 1000 / 3600 / 24;

    let percent = ((today - createdAt) / target.daysToCompletion) * 100;
    return percent;
  }

  return (
    <TouchableOpacity
      style={[styles.cardContainer, { backgroundColor: color }]}
      onPress={onCardPress}
    >
      <View style={styles.cardHeader}>
        <Foundation
          name={appIcons.foundation.target}
          size={24}
          color={colors.night.LIGHT}
        />
        <Text style={[textStyles.textLight]}>{title}</Text>
      </View>
      <ProgressBar
        percentual={calculatePercentual(target)}
        barColor="#7f7f7f"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#a6157f",
    padding: 18,
    borderRadius: 8,
    gap: 8,
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    alignItems: "center",
  },
});
