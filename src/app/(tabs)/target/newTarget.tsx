import { TargetProps } from "@/data/types/TargetProps";
import { Button } from "@/ui/components/buttons/Button";
import { CustomTextInput } from "@/ui/components/inputs/TextInput";
import { colors } from "@/ui/resources/colors";
import { globalStyles, gStyles } from "@/ui/styles/globalStyles";
import { useNewTargetViewModel } from "@/viewmodels/target/NewTargetViewModel";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Text } from "react-native";

const newTargetItems: Omit<TargetProps, "id" | "isActive" | "completed"> = {
  title: "string",
  createdAt: new Date(),
  daysToCompletion: 90,
};

type FormData = typeof newTargetItems;

const NewTarget: React.FC = () => {
  const { newTarget } = useNewTargetViewModel();
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: "",
      createdAt: new Date(),
      daysToCompletion: 90,
    },
  });

  async function handleSave(data: FormData) {
    await newTarget(data);
    reset();
  }

  return (
    <KeyboardAvoidingView style={globalStyles.pageContainer}>
      <Text style={gStyles.titles.crudAction}>New Target</Text>

      <Controller
        name="title"
        control={control}
        render={({ field: { value, onChange } }) => (
          <CustomTextInput
            label="title"
            value={value}
            placeholder="Titulo do Target"
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        name="daysToCompletion"
        control={control}
        render={({ field: { value, onChange } }) => (
          <CustomTextInput
            keyboardType="numeric"
            label="Days to completion"
            onChangeText={onChange}
            value={String(value)}
          />
        )}
      />

      <Button
        text="Save"
        onButtonPress={handleSubmit(handleSave)}
        background={colors.night.SECONDARY}
      />
    </KeyboardAvoidingView>
  );
};

export default NewTarget;
