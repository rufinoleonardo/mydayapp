import { ListItem } from "@/components/ListItem";
import * as tasksSchema from "@/database/schemas/taskSchema";
import { TaskProps } from "@/types/TaskProps";
import { useNewTaskViewModel } from "@/viewmodels/NewTaskViewModel";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import { globalStyles, textStyles } from "../../styles/globalStyles";

const Home: React.FC = () => {
  const { getAllTasks } = useNewTaskViewModel();
  const dbInstance = useSQLiteContext();
  const db = drizzle(dbInstance, { schema: tasksSchema });
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await getAllTasks();
    let list = response.data;
    setTasks((tasks) => [...tasks, ...list]);
  }

  function renderData({ item }: ListRenderItemInfo<TaskProps>) {
    return (
      <ListItem
        description={item.description}
        isMistake={item.isMistake}
        priority={item.priority}
        observation={item.observation}
      />
    );
  }

  return (
    <View style={globalStyles.pageContainer}>
      <Text style={[textStyles.textLight, textStyles.h2_headline]}>
        Home page
      </Text>
      <Link href={"/newtask"} style={[textStyles.textLight]}>
        Criar tarefa
      </Link>

      <FlatList
        data={tasks}
        renderItem={renderData}
        keyExtractor={(item) => (item.id ? item.id.toString() : "no-id")}
      />
    </View>
  );
};

export default Home;
