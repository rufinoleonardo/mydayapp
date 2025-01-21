import { db, DB_NAME } from "@/database/initializeDatabase";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar, Text, View } from "react-native";
import migrations from "../../drizzle/migrations";

export default function Layout() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <SQLiteProvider databaseName={DB_NAME}>
      <StatusBar barStyle={"light-content"} />
      <Slot />
    </SQLiteProvider>
  );
}
