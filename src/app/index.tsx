import { Redirect } from "expo-router";

export default function Index() {
  console.log("app/index");
  return <Redirect href={"home"} />;
}
