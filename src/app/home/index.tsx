import { ListItem } from "@/components/ListItem";
import { Sizes } from "@/styles/globalSizes";
import { TaskProps } from "@/types/TaskProps";
import { useHomeViewModel } from "@/viewmodels/HomeViewModel";
import { Link } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItemInfo,
  Text,
  View,
} from "react-native";
import {
  gButtonsStyles,
  globalStyles,
  textStyles,
} from "../../styles/globalStyles";

const Home: React.FC = () => {
  const { tasks, loading, removeTask } = useHomeViewModel();

  function renderListItems({ item }: ListRenderItemInfo<TaskProps>) {
    return (
      <ListItem
        description={item.description}
        isMistake={item.isMistake}
        priority={item.priority}
        observation={item.observation}
        longPressDelete={() => {
          if (item.id) {
            handleDelete(item.id);
          } else {
            console.log("Elemento sem ID");
          }
        }}
      />
    );
  }

  function handleDelete(id: number) {
    console.log(`id: ${id.toString()}`);
    Alert.alert(
      "ATTENTION: Delete action",
      `Are you sure you want to delete this item? The action can't be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => removeTask(id),
        },
      ]
    );
  }

  return (
    <View style={globalStyles.pageContainer}>
      <Text style={[textStyles.textLight, textStyles.h2_headline]}>
        Home page
      </Text>
      <Link href={"/newtask"} style={{ marginBottom: Sizes.MARGIN_BETWEEN_SM }}>
        <View style={[gButtonsStyles.successLg]}>
          <Text style={textStyles.textLight}>Criar tarefa</Text>
        </View>
      </Link>

      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderListItems}
          keyExtractor={(item) => (item.id ? item.id.toString() : "no-id")}
        />
      )}
    </View>
  );
};

export default Home;
