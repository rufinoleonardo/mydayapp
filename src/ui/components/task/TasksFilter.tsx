import { colors } from "@/ui/resources/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface TaskFilterProps {
  onFilterPress: (filter: "completed" | "to do") => void;
  selectedFilter: string;
}

export const TasksFilter: React.FC<TaskFilterProps> = ({
  onFilterPress,
  selectedFilter,
}) => {
  return (
    <View style={[styles.filterContainer]}>
      <Pressable
        style={[
          styles.filterTagContainer,
          selectedFilter == "to do" ? styles.selectedTag : {},
        ]}
        onPress={() => onFilterPress("to do")}
      >
        <Text style={styles.tagText}>To do</Text>
      </Pressable>

      <Pressable
        style={[
          styles.filterTagContainer,
          selectedFilter == "completed" ? styles.selectedTag : {},
        ]}
        onPress={() => onFilterPress("completed")}
      >
        <Text style={styles.tagText}>Completed</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 8,
    gap: 4,
  },
  filterTagContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.night.SECONDARY,
    alignItems: "center",
    paddingVertical: 4,
  },
  tagText: {
    color: colors.night.SECONDARY,
  },
  selectedTag: {
    backgroundColor: colors.night.PRIMARY,
  },
});
