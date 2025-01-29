import { Card } from "@/components/Card";
import { SelectInput } from "@/components/SelectInput";
import { Colors } from "@/styles/globalColors";
import {
  CommonInputStyles,
  globalStyles,
  textStyles,
} from "@/styles/globalStyles";
import { useReportViewModel } from "@/viewmodels/ReportViewModel";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ReportScreen = () => {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    nMistakes,
    nRegularTasks,
    nMonthlyTasks,
    researchData,
    loadTasks,
    tasks,
  } = useReportViewModel();

  return (
    <View style={globalStyles.pageContainer}>
      <View style={globalStyles.rowCentered}>
        <SelectInput
          label="Year"
          placeholder="select year"
          dataList={["2025"]}
          selectedValue={year}
          onValueChange={setYear}
          isRowDirection={true}
        />
        <SelectInput
          label="Month"
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
          onPress={() => researchData(month, year)}
          style={[
            CommonInputStyles.field,
            {
              backgroundColor: Colors.PRIMARY,
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
        Results for {month}.{year}
      </Text>

      <View
        style={{
          maxHeight: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Card
          label="Montly Tasks"
          countValue={nMonthlyTasks}
          isTextLight={false}
          onPressCard={() => loadTasks(month, year)}
        />
        <Card
          label="Mistakes"
          countValue={nMistakes}
          color={"#e9a7a7"}
          isTextLight={false}
          onPressCard={() => loadTasks(month, year, true)}
        />
        <Card
          label="Regular Tasks"
          countValue={nRegularTasks}
          color={Colors.BLUE_LIGHT}
          isTextLight={false}
          onPressCard={() => loadTasks(month, year, false)}
        />
      </View>

      {tasks.length &&
        tasks.map((task) => (
          <Text style={textStyles.textLight} key={task.id}>
            {task.description} - Exibir na recycler view
          </Text>
        ))}
    </View>
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
