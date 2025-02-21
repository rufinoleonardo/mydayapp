import { TaskProps } from "@/data/types/TaskProps";
import { useAppSelector } from "@/redux/hooks";
import { TasksFlatList } from "@/ui/components/task/FlatListTasks";
import { TasksFilter } from "@/ui/components/task/TasksFilter";
import { globalStyles, textStyles } from "@/ui/styles/globalStyles";
import { filterTasks } from "@/utils/filterTasks";
import { useHomeViewModel } from "@/viewmodels/HomeViewModel";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home: React.FC = () => {
  const { tasks, loading, setTasks, removeTask } = useHomeViewModel();
  const [selectedFilter, setSelectedFilter] = useState<"completed" | "to do">(
    "to do"
  );
  const [filteredTasks, setFilteredTasks] = useState<TaskProps[]>(tasks);

  const { strings } = useAppSelector((state) => state.language);

  useEffect(() => {
    const filtered = filterTasks(selectedFilter, tasks);
    setFilteredTasks(filtered);
  }, [selectedFilter, tasks]);

  function handleFilter(filter: "completed" | "to do") {
    setSelectedFilter(filter);
    const filtered = filterTasks(selectedFilter, tasks);
    setFilteredTasks(filtered);
  }

  function handleCompleteTask(taskId: number) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, lastCompletedAt: new Date() } : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  }

  function handleDeleteTaks(taskId: number) {
    removeTask(taskId);
    const updatedTasks = tasks.filter((task) => task.id != taskId);
    setFilteredTasks(updatedTasks);
  }

  return (
    <SafeAreaView style={globalStyles.pageContainer}>
      {tasks.length ? (
        loading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <View style={{ flex: 1 }}>
            <TasksFilter
              onFilterPress={handleFilter}
              selectedFilter={selectedFilter}
            />

            <TasksFlatList
              tasks={filteredTasks != undefined ? filteredTasks : []}
              listTitle="Today Tasks"
              onPressComplete={handleCompleteTask}
              onPressDelete={handleDeleteTaks}
            />
          </View>
        )
      ) : (
        <View style={{ flex: 1 }}>
          <Text
            style={[
              textStyles.h3_subHeading,
              textStyles.textLight,
              styles.noRegistersText,
            ]}
          >
            {strings.screen_Home.noRegisters}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  noRegistersText: {
    textAlign: "center",
    fontStyle: "italic",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
  },
});

export default Home;
