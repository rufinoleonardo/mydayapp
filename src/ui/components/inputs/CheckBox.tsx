import { CommonInputStyles, textStyles } from "@/ui/styles/globalStyles";
import { View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { colors } from "../../resources/colors";

interface CheckBoxProps {
  label: string;
  onCheckChange: (value: boolean) => void;
  isChecked?: boolean;
}

export const Checkbox: React.FC<CheckBoxProps> = ({
  label,
  onCheckChange,
  isChecked = false,
}) => {
  return (
    <View style={CommonInputStyles.field}>
      <BouncyCheckbox
        size={25}
        fillColor={colors.night.DARK}
        unFillColor="#FFFFFF"
        text={label}
        iconStyle={{ borderColor: colors.night.LIGHT }}
        innerIconStyle={{ borderWidth: 2 }}
        textStyle={[
          textStyles.p_paragraph,
          textStyles.textLight,
          { textDecorationLine: "none" },
        ]}
        onPress={(isChecked: boolean) => {
          onCheckChange(isChecked);
        }}
        isChecked={isChecked}
      />
    </View>
  );
};
