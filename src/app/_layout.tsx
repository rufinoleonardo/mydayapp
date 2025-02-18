import { db, DB_NAME } from "@/data/database/initializeDatabase";
import store from "@/redux/store";
import { AppHeader } from "@/ui/components/AppHeader";
import { colors } from "@/ui/resources/colors";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar, Text, View } from "react-native";
import { Provider } from "react-redux";
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
      <Provider store={store}>
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={colors.night.DARK}
        />
        <AppHeader />
        <Slot initialRouteName="(tabs)" />
      </Provider>
    </SQLiteProvider>
  );
}
