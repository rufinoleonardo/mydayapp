import { Button } from "@/components/Button";
import { CustomCalendar } from "@/components/Calendar";
import { ListItem } from "@/components/ListItem";
import { Colors } from "@/styles/globalColors";
import { Sizes } from "@/styles/globalSizes";
import { TaskProps } from "@/types/TaskProps";
import { useHomeViewModel } from "@/viewmodels/HomeViewModel";
import { Link } from "expo-router";
import { useState } from "react";
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
} from "../../../styles/globalStyles";

const Home: React.FC = () => {
  const { tasks, loading, removeTask, fetchTasks } = useHomeViewModel();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  function renderListItems({ item }: ListRenderItemInfo<TaskProps>) {
    return (
      <ListItem
        description={item.description}
        isMistake={item.isMistake}
        priority={item.priority}
        observation={item.observation}
        createdAt={item.createdAt}
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

  function handleSelectDate(dateString: string) {
    console.log(dateString);
    setSelectedDate(dateString);
    fetchTasks(dateString);
    setModalVisible(false);
  }

  return (
    <View style={globalStyles.pageContainer}>
      <Text style={[textStyles.textLight, textStyles.h2_headline]}>
        Home page
      </Text>

      <CustomCalendar
        modalVisible={modalVisible}
        onClosePress={() => setModalVisible(false)}
        onSelectDay={handleSelectDate}
      />

      <Button
        text={selectedDate}
        onButtonPress={() => setModalVisible(true)}
        iconName="calendar"
        background="transparent"
        color={Colors.GRAY_LIGHT}
      />

      {tasks.length ? (
        loading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <FlatList
            data={tasks}
            renderItem={renderListItems}
            keyExtractor={(item) => (item.id ? item.id.toString() : "no-id")}
          />
        )
      ) : (
        <View>
          <Text
            style={[
              textStyles.h3_subHeading,
              textStyles.textLight,
              { textAlign: "center", fontStyle: "italic" },
            ]}
          >
            {" "}
            No registers yet.
          </Text>
          <Link
            href={"/newtask"}
            style={{ marginBottom: Sizes.MARGIN_BETWEEN_SM }}
          >
            <View style={[gButtonsStyles.successLg]}>
              <Text style={textStyles.textLight}>Criar tarefa</Text>
            </View>
          </Link>
        </View>
      )}
    </View>
  );
};

export default Home;
