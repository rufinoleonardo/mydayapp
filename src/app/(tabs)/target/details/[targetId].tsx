import { TaskProps } from "@/data/types/TaskProps";
import { FloatActionButton } from "@/ui/components/buttons/FloatActionButton";
import { TargetCard } from "@/ui/components/target/CardTarget";
import { TasksFlatList } from "@/ui/components/task/FlatListTasks";
import { TasksFilter } from "@/ui/components/task/TasksFilter";
import { globalStyles } from "@/ui/styles/globalStyles";
import { filterTasks } from "@/utils/filterTasks";
import { selectBackgroundColor } from "@/utils/selectBackgroundColors";
import { useTargetDetailsViewModel } from "@/viewmodels/target/TargetDetailsViewModel";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Details() {
  const { targetId } = useLocalSearchParams();
  const { targetData, tasks, isLoading, removeTask } =
    useTargetDetailsViewModel();
  const [filteredTasks, setFilteredTasks] = useState<TaskProps[]>(tasks);
  const [selectedFilter, setSelectedFilter] = useState<"completed" | "to do">(
    "to do"
  );

  const router = useRouter();

  useEffect(() => {
    const filtered = filterTasks(selectedFilter, tasks);
    setFilteredTasks(filtered);
  }, [selectedFilter, tasks]);

  function navigateToNewTask() {
    router.push({
      pathname: `/target/task/newTask`,
      params: { targetId, daysToCompletion: targetData?.daysToCompletion },
    });
  }

  function handleFilter(filter: "completed" | "to do") {
    setSelectedFilter(filter);
    const filtered = filterTasks(filter, filteredTasks);
    setFilteredTasks(filtered);
  }

  const handleTaskComplete = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, lastCompletedAt: new Date() } : task
    );
    filterTasks(selectedFilter, updatedTasks); // Atualiza o estado no viewModel
    setFilteredTasks(updatedTasks);
  };

  const handleTaskDelete = (taskId: number) => {
    removeTask(taskId);
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setFilteredTasks(updatedTasks);
  };

  function handleDeleteTarget(id: number) {
    router.replace("/target");
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={[globalStyles.pageContainer, styles.page]}>
      {targetData != undefined ? (
        <TargetCard
          title={targetData.title}
          onCardPress={() => ""}
          color={selectBackgroundColor(targetData.id)}
          target={targetData}
          id={targetData.id}
          onTargetLongPress={handleDeleteTarget}
        />
      ) : (
        <ActivityIndicator size={"large"} />
      )}

      <TasksFilter
        onFilterPress={handleFilter}
        selectedFilter={selectedFilter}
      />

      <TasksFlatList
        listTitle={"Tasks: " + selectedFilter.toUpperCase()}
        tasks={filteredTasks != undefined ? filteredTasks : []}
        onPressDelete={handleTaskDelete}
        onPressComplete={handleTaskComplete}
      />

      <FloatActionButton onFabPress={navigateToNewTask} btnText="new task" />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    gap: 10,
  },
});
