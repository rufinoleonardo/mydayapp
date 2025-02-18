import { TaskProps } from "@/data/types/TaskProps";
import { TaskCard } from "@/ui/components/task/CardTask";
import { colors } from "@/ui/resources/colors";
import { convertDateToString } from "@/utils/convertDateToString";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface TasksFlatListProps {
  tasks: TaskProps[];
  listTitle: string;
  onPressDelete: (taskId: number) => void;
  onPressComplete: (taskId: number) => void;
}

export function TasksFlatList({
  tasks,
  listTitle,
  onPressDelete,
  onPressComplete,
}: TasksFlatListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <TaskCard
          id={item.id}
          description={item.description}
          completedCount={item.completedCount}
          priority={item.priority}
          daysToCompletion={item.daysToCompletion}
          lastCompletedAt={
            item.lastCompletedAt != undefined
              ? convertDateToString(item.lastCompletedAt)
              : "-"
          }
          onPressDelete={onPressDelete}
          onPressComplete={onPressComplete}
        />
      )}
      ListHeaderComponent={() => (
        <View>
          <Text style={styles.title}>{listTitle}</Text>
        </View>
      )}
      ListEmptyComponent={() => (
        <View style={styles.noTasksContainer}>
          <Text style={styles.noTasksText}>No Items</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.night.LIGHT,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  noTasksContainer: {
    backgroundColor: colors.night.LIGHT,
    padding: 16,
    borderRadius: 8,
  },
  noTasksText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.night.TEXT_MEDIUM,
    fontStyle: "italic",
  },
});
