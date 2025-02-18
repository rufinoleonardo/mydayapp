import { useTaskRepository } from "@/data/repositories/TaskRepository";
import { TaskPriority } from "@/enums/TaskPriority";
import { ProgressBar } from "@/ui/components/ProgressBar";
import { colors } from "@/ui/resources/colors";
import { textStyles } from "@/ui/styles/globalStyles";
import { compareDbDateWithToday } from "@/utils/compareDbDateWithToday";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface TaskCardProps {
  onPressDelete: (taskId: number) => void;
  onPressComplete: (taskId: number) => void;
  description: string;
  priority: TaskPriority | null;
  completedCount: number;
  daysToCompletion: number;
  lastCompletedAt: string;
  id: number;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  description,
  priority,
  completedCount,
  daysToCompletion,
  lastCompletedAt,
  onPressDelete,
  onPressComplete,
  id,
}) => {
  const { setTaskAsCompleted, safeDeleteTaskById } = useTaskRepository();

  const [percentual, setPercentual] = useState(0);

  async function completeTask(id: number) {
    try {
      await setTaskAsCompleted(id);
      onPressComplete(id);
      setPercentual(completedCount / daysToCompletion);
    } catch (err) {
      console.log("ERRO AO COMPLETAR TAREFA");
    }
  }

  async function safeDeleteTask(id: number) {
    try {
      await safeDeleteTaskById(id);
      onPressDelete(id);
      console.log("Safe Delete ID ", id);
    } catch (err) {
      console.log("Task not deleted. ", err);
    }
  }

  async function handleComplete(id: number) {
    await completeTask(id);
  }

  async function handleDelete(id: number) {
    await safeDeleteTask(id);
  }

  return (
    <Pressable style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleDelete(id)}>
          <Ionicons name="trash" size={24} color={colors.night.DANGER} />
        </TouchableOpacity>
        {compareDbDateWithToday(lastCompletedAt) ? (
          <View
            style={[
              styles.completeContainer,
              { backgroundColor: colors.night.SUCCESS },
            ]}
          >
            <Text
              style={[
                textStyles.h6_label,
                { color: colors.night.LIGHT, fontWeight: "800" },
              ]}
            >
              Completed
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => handleComplete(id)}
            style={styles.completeContainer}
          >
            <Text
              style={[
                textStyles.h6_label,
                { color: colors.night.SUCCESS, fontWeight: "800" },
              ]}
            >
              Set as complete
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.f1}>
        <Text style={[textStyles.p_paragraph, styles.text]}>{description}</Text>
      </View>

      <View style={styles.informationSection}>
        <View style={styles.tagContainer}>
          {lastCompletedAt != "-" ? (
            <Text style={[textStyles.h6_label]}>
              Last completed at: {lastCompletedAt}
            </Text>
          ) : (
            <Text style={[textStyles.h6_label]}>Not completed yet</Text>
          )}
        </View>
        <View style={[styles.tagContainer, styles.priorityContainer]}>
          <Text style={[styles.tagText, textStyles.h6_label]}>{priority}</Text>
        </View>
      </View>

      <ProgressBar percentual={percentual} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.night.LIGHT,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  completeContainer: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.night.SUCCESS,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  f1: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    minHeight: 40,
  },
  informationSection: {
    flexDirection: "row",
    flex: 1,
    gap: 16,
    justifyContent: "space-between",
    marginTop: 8,
  },
  text: {
    color: "#1C1c1c",
    marginBottom: 8,
    fontWeight: "500",
  },
  tagContainer: {
    height: 24,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  priorityContainer: {
    paddingHorizontal: 4,
    backgroundColor: colors.night.PRIMARY,
    width: 80,
  },
  tagText: {
    color: colors.night.LIGHT,
  },
  errorMsgContainer: {
    backgroundColor: colors.night.SECONDARY,
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
});
