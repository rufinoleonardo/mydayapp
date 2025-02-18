import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/ui/components/buttons/Button";
import { CustomCalendar } from "@/ui/components/Calendar";
import { TasksFlatList } from "@/ui/components/task/FlatListTasks";
import { colors } from "@/ui/resources/colors";
import { globalStyles, textStyles } from "@/ui/styles/globalStyles";
import { useHomeViewModel } from "@/viewmodels/HomeViewModel";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home: React.FC = () => {
  const { tasks, loading, removeTask, fetchTasks } = useHomeViewModel();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const { strings } = useAppSelector((state) => state.language);

  function handleDelete(id: number) {
    Alert.alert(
      strings.screen_Home.delModalTitle,
      strings.screen_Home.delModalDesc,
      [
        { text: strings.screen_Home.delModalCancel, style: "cancel" },
        {
          text: strings.screen_Home.delModalConfirm,
          onPress: () => removeTask(id),
        },
      ]
    );
  }

  function handleSelectDate(dateString: string) {
    setSelectedDate(dateString);
    fetchTasks(dateString);
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={globalStyles.pageContainer}>
      <CustomCalendar
        modalVisible={modalVisible}
        onClosePress={() => setModalVisible(false)}
        onSelectDay={handleSelectDate}
      />

      <Text style={[textStyles.h6_label, textStyles.textLight]}>
        {strings.screen_Home.dateLabel}
      </Text>
      <Button
        text={selectedDate}
        onButtonPress={() => setModalVisible(true)}
        iconName="calendar"
        background="transparent"
        color={colors.night.LIGHT}
      />

      {tasks.length ? (
        loading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <View style={{ flex: 1 }}>
            <Text style={[textStyles.textLight, textStyles.h4_title]}>
              {strings.screen_Home.resultTitle} {selectedDate}
            </Text>

            <TasksFlatList tasks={tasks} longPressDelete={console.log} />
          </View>
        )
      ) : (
        <View style={{ flex: 1 }}>
          <Text
            style={[
              textStyles.h3_subHeading,
              textStyles.textLight,
              {
                textAlign: "center",
                fontStyle: "italic",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                textAlignVertical: "center",
              },
            ]}
          >
            {strings.screen_Home.noRegisters}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
