import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="newTarget" options={{ title: "New Target" }} />
      <Stack.Screen name="details/[targetId]" />
      <Stack.Screen name="task/newTask" />
    </Stack>
  );
}
