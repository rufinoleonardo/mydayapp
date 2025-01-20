import { Text, TextInput, TextInputProps, View } from "react-native";

import {
  CommonInputStyles as Input,
  textStyles as text,
} from "../styles/globalStyles";

interface CustomTextInputProps extends TextInputProps {
  label: string;
  customStyle?: {};
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (value: string) => void;
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  label,
  textContentType,
  customStyle,
  multiline = false,
  secureTextEntry = false,
  value,
  onChangeText,
}) => {
  return (
    <View style={[Input.container]}>
      <Text style={[text.h6_label, text.textLight]}>{label}</Text>
      <TextInput
        textContentType={textContentType}
        placeholder={placeholder}
        multiline={multiline}
        style={[text.p_paragraph, Input.colors, Input.field, customStyle]}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
