import { useAppSelector } from "@/redux/hooks";
import { Card } from "@/ui/components/CardCount";
import { SelectInput } from "@/ui/components/inputs/SelectInput";
import { colors } from "@/ui/resources/colors";
import {
  CommonInputStyles,
  globalStyles,
  textStyles,
} from "@/ui/styles/globalStyles";
import { useReportViewModel } from "@/viewmodels/ReportViewModel";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ReportScreen = () => {
  const {
    loadTasks,
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
    nTargets,
    nMistakes,
    nTasks,
  } = useReportViewModel();
  const { strings } = useAppSelector((state) => state.language);
  const [resultTitle, setResultTitle] = useState(
    `${strings.screen_Report.resultsTitle}`
  );

  return (
    <SafeAreaView style={globalStyles.pageContainer}>
      <View style={globalStyles.rowCentered}>
        <SelectInput
          label={strings.screen_Report.yearLabel}
          placeholder={strings.screen_Report.yearPlaceholder}
          dataList={["2025"]}
          selectedValue={selectedYear as string}
          onValueChange={setSelectedYear}
          isRowDirection={true}
        />

        <SelectInput
          label={strings.screen_Report.monthLabel}
          onValueChange={setSelectedMonth}
          selectedValue={selectedMonth as string}
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
          onPress={() =>
            loadTasks(selectedMonth as string, selectedYear as string)
          }
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

      <View style={styles.countCardsContainers}>
        <Card
          label={strings.screen_Report.label_completedTasks}
          countValue={nTasks}
          isTextLight={false}
          onPressCard={console.log}
        />
        <Card
          label={strings.screen_Report.label_mistakes}
          countValue={nMistakes}
          color={"#e9a7a7"}
          isTextLight={false}
          onPressCard={console.log}
        />
        <Card
          label={strings.screen_Report.label_completedTargets}
          countValue={nTargets}
          color={colors.night.SECONDARY}
          isTextLight={false}
          onPressCard={console.log}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, marginTop: 10 },
  picker: { height: 50, width: "100%" },
  resultsTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  countCardsContainers: {
    maxHeight: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskCard: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default ReportScreen;
