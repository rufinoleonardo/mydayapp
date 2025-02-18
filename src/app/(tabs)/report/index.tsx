import { useAppSelector } from "@/redux/hooks";
import { Card } from "@/ui/components/CardCount";
import { SelectInput } from "@/ui/components/inputs/SelectInput";
import { TasksFlatList } from "@/ui/components/task/FlatListTasks";
import { colors } from "@/ui/resources/colors";
import {
  CommonInputStyles,
  globalStyles,
  textStyles,
} from "@/ui/styles/globalStyles";
import { useReportViewModel } from "@/viewmodels/ReportViewModel";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ReportScreen = () => {
  const { strings } = useAppSelector((state) => state.language);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [resultTitle, setResultTitle] = useState(
    `${strings.screen_Report.resultsTitle} ${month}.${year}`
  );
  const {
    nMistakes,
    nRegularTasks,
    nMonthlyTasks,
    researchData,
    loadTasks,
    tasks,
    removeTask,
  } = useReportViewModel();

  function handleDelete(id: string) {
    Alert.alert(
      "Deleting task",
      "Are you sure you want to delete this task? The action can't be undone.",
      [
        { style: "cancel", text: "cancel" },
        {
          text: "delete",
          onPress: () => {
            removeTask(Number(id));
            researchData();
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={globalStyles.pageContainer}>
      <View style={globalStyles.rowCentered}>
        <SelectInput
          label={strings.screen_Report.yearLabel}
          placeholder={strings.screen_Report.yearPlaceholder}
          dataList={["2025"]}
          selectedValue={year}
          onValueChange={setYear}
          isRowDirection={true}
        />
        <SelectInput
          label={strings.screen_Report.monthLabel}
          onValueChange={setMonth}
          selectedValue={month}
          dataList={[
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
          ]}
          placeholder="01"
          isRowDirection={true}
        />
        <TouchableOpacity
          onPress={() => {
            researchData(month, year);
            setResultTitle(
              `${strings.screen_Report.resultsTitle} ${month}.${year}`
            );
          }}
          style={[
            CommonInputStyles.field,
            {
              backgroundColor: colors.night.SECONDARY,
              alignSelf: "center",
              marginTop: 10,
            },
          ]}
        >
          <MaterialCommunityIcons
            name="database-search"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <Text style={[textStyles.textLight, textStyles.h4_title]}>
        {resultTitle}
      </Text>

      <View
        style={{
          maxHeight: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Card
          label={strings.screen_Report.montlyTasksLabel}
          countValue={nMonthlyTasks}
          isTextLight={false}
          onPressCard={() => {
            loadTasks(month, year);
            setSelectedCategory(
              `${strings.screen_Report.listTitle} ${strings.screen_Report.montlyTasksLabel}`
            );
          }}
        />
        <Card
          label={strings.screen_Report.mistakesLabel}
          countValue={nMistakes}
          color={"#e9a7a7"}
          isTextLight={false}
          onPressCard={() => {
            loadTasks(month, year);
            setSelectedCategory(
              `${strings.screen_Report.listTitle} ${strings.screen_Report.mistakesLabel}`
            );
          }}
        />
        <Card
          label={strings.screen_Report.regularTasksLabel}
          countValue={nRegularTasks}
          color={colors.night.SECONDARY}
          isTextLight={false}
          onPressCard={() => {
            loadTasks(month, year);
            setSelectedCategory(
              `${strings.screen_Report.listTitle} ${strings.screen_Report.regularTasksLabel}`
            );
          }}
        />
      </View>

      {tasks.length > 0 && (
        <View style={{ flex: 1 }}>
          <Text style={[textStyles.textLight, textStyles.h4_title]}>
            {selectedCategory}
          </Text>

          <TasksFlatList tasks={tasks} longPressDelete={console.log} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, marginTop: 10 },
  picker: { height: 50, width: "100%" },
  resultsTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  taskCard: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default ReportScreen;
