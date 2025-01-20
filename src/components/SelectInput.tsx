import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Colors } from "../styles/globalColors";
import { CommonInputStyles as Input, textStyles } from "../styles/globalStyles";

interface SelectInputProps {
  label: string;
  dataList: string[];
  placeholder: string;
  selectedValue: String;
  onValueChange: (value: string) => void;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  dataList,
  placeholder,
  label,
  selectedValue,
  onValueChange,
}) => {
  return (
    <View style={[Input.container]}>
      <Text style={[textStyles.h6_label, textStyles.textLight]}>{label}</Text>

      <SelectDropdown
        data={dataList}
        onSelect={(selectedItem) => {
          onValueChange(selectedItem);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View
              style={[styles.dropdownButtonStyle, Input.colors, Input.field]}
            >
              <Text style={styles.dropdownButtonTxtStyle}>
                {selectedItem || placeholder}
              </Text>
              <Icon
                name="arrow-down-drop-circle"
                style={styles.dropdownButtonArrowStyle}
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: "#b0bcc6" }),
              }}
            >
              <Text style={[styles.dropdownItemTxtStyle]}>{item}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
        defaultValue={selectedValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 12,
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
    color: "#9c9c9c",
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 12,
    color: Colors.BLUE_DARK,
  },
});
