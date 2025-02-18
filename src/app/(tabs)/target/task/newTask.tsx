import { TaskPriority } from "@/enums/TaskPriority";
import { textContentType } from "@/enums/TextInputType";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/ui/components/buttons/Button";
import { Checkbox } from "@/ui/components/inputs/CheckBox";
import { SelectInput } from "@/ui/components/inputs/SelectInput";
import { CustomTextInput } from "@/ui/components/inputs/TextInput";
import { globalStyles, gStyles } from "@/ui/styles/globalStyles";
import { useNewTaskViewModel } from "@/viewmodels/NewTaskViewModel";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FormData = {
  description: string;
  priority: TaskPriority;
  isMistake: boolean;
  observation: string;
  targetId: string;
  daysToCompletion: number;
};

const NewTaskScreen: React.FC = () => {
  const { strings } = useAppSelector((state) => state.language);
  const { targetId, daysToCompletion } = useLocalSearchParams();
  const { addTask, addMistake } = useNewTaskViewModel();
  const [isMistakeChecked, setIsMistakeChecked] = useState(false);
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      description: "",
      priority: TaskPriority.COMMON,
      isMistake: false,
      observation: "",
      daysToCompletion: Number(daysToCompletion),
    },
  });

  const handleSave: SubmitHandler<FormData> = (data) => {
    if (isMistakeChecked) {
      addMistake(data, targetId as string);
    } else {
      addTask(data, targetId as string, daysToCompletion as string);
    }
  };

  return (
    <SafeAreaView style={globalStyles.pageContainer}>
      <Text style={gStyles.titles.crudAction}>New task or Mistake</Text>

      <Controller
        name="isMistake"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            label={strings.screen_NewTask.mistakeLabel}
            onCheckChange={(isChecked) => {
              onChange(isChecked);
              setIsMistakeChecked(isChecked);
            }}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field: { value, onChange } }) => (
          <CustomTextInput
            label={strings.screen_NewTask.descriptionLabel}
            placeholder={strings.screen_NewTask.descriptionPlaceholder}
            textContentType={textContentType.name}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {isMistakeChecked ? (
        <Controller
          name="observation"
          control={control}
          render={({ field: { value, onChange } }) => (
            <CustomTextInput
              label={strings.screen_NewTask.observationLabel}
              placeholder={strings.screen_NewTask.observationPlaceholder}
              multiline={true}
              customStyle={style.custom}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      ) : (
        <Controller
          name="priority"
          control={control}
          render={({ field: { value, onChange } }) => (
            <SelectInput
              dataList={Object.values(TaskPriority)}
              placeholder={strings.screen_NewTask.priorityPlaceholder}
              label={strings.screen_NewTask.priorityLabel}
              onValueChange={onChange}
              selectedValue={value}
            />
          )}
        />
      )}

      <Button
        text={strings.screen_NewTask.saveBtnText}
        onButtonPress={handleSubmit(handleSave)}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  custom: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default NewTaskScreen;
