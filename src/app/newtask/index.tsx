import { useNewTaskViewModel } from "@/viewmodels/NewTaskViewModel";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/CheckBox";
import { SelectInput } from "../../components/SelectInput";
import { CustomTextInput } from "../../components/TextInput";
import { TaskPriority } from "../../enums/TaskPriority";
import { textContentType } from "../../enums/TextInputType";
import { globalStyles, textStyles } from "../../styles/globalStyles";

type FormData = {
  description: string;
  priority: TaskPriority;
  isMistake: boolean;
  observation: string;
};

const NewTaskScreen: React.FC = () => {
  const { addTask } = useNewTaskViewModel();
  const [isMistakeChecked, setIsMistakeChecked] = useState(false);
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      description: "",
      priority: TaskPriority.COMMON,
      isMistake: false,
      observation: "",
    },
  });

  const handleSave: SubmitHandler<FormData> = (data) => {
    addTask(data);
  };

  return (
    <View style={globalStyles.pageContainer}>
      <Text style={[textStyles.h3_subHeading, textStyles.textLight]}>
        New Task
      </Text>

      <Controller
        name="description"
        control={control}
        render={({ field: { value, onChange } }) => (
          <CustomTextInput
            label="Description"
            placeholder="Description here"
            textContentType={textContentType.name}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        name="priority"
        control={control}
        render={({ field: { value, onChange } }) => (
          <SelectInput
            dataList={Object.values(TaskPriority)}
            placeholder="Select the priority"
            label="Priority"
            onValueChange={onChange}
            selectedValue={value}
          />
        )}
      />

      <Controller
        name="isMistake"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            label="It was a mistake"
            onCheckChange={(isChecked) => {
              onChange(isChecked);
              setIsMistakeChecked(isChecked);
            }}
          />
        )}
      />

      {isMistakeChecked && (
        <Controller
          name="observation"
          control={control}
          render={({ field: { value, onChange } }) => (
            <CustomTextInput
              label="Observation"
              placeholder="If it was a mistake, why did it occur or how did you solve it"
              multiline={true}
              customStyle={style.custom}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      )}

      <Button text="Save" onButtonPress={handleSubmit(handleSave)} />
    </View>
  );
};

const style = StyleSheet.create({
  custom: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default NewTaskScreen;
