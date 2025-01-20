import * as tasksSchema from "@/database/schemas/taskSchema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { StatusBar, Text, View } from "react-native";
import { globalStyles, textStyles } from "../../styles/globalStyles";

const Home: React.FC = () => {
  const dbInstance = useSQLiteContext();
  const db = drizzle(dbInstance, { schema: tasksSchema });

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await db.query.tasks.findMany();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={globalStyles.pageContainer}>
      <Text style={[textStyles.textLight, textStyles.h2_headline]}>
        Home page
      </Text>
      <Link href={"/newtask"} style={[textStyles.textLight]}>
        Criar tarfa
      </Link>
      <StatusBar barStyle={"light-content"} />
    </View>
  );
};

export default Home;
