import { StyleSheet, View } from "react-native";

interface ProgressBarProps {
  percentual: number;
  barColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentual,
  barColor,
}) => {
  return (
    <View style={styles.progressBar}>
      <View
        style={[
          { width: `${percentual}%` },
          styles.completedColor,
          barColor ? { backgroundColor: barColor } : {},
        ]}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: "100%",
    backgroundColor: "white",
    height: 8,
    justifyContent: "center",
    padding: 2,
    borderRadius: 8,
    marginTop: 8,
  },
  completedColor: {
    maxWidth: "100%",
    backgroundColor: "green",
    height: 6,
    borderRadius: 8,
  },
});
