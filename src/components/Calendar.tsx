import { Colors } from "@/styles/globalColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { DateData, Theme } from "react-native-calendars/src/types";
import { Modal } from "./Modal";

interface CustomCalendarProps {
  modalVisible: boolean;
  onClosePress: () => void;
  onSelectDay: (dateString: string) => void;
}

export const CustomCalendar: React.FC<CustomCalendarProps> = ({
  modalVisible,
  onClosePress,
  onSelectDay,
}: CustomCalendarProps) => {
  const [day, setDay] = useState<DateData>();

  return (
    <Modal isOpen={modalVisible}>
      <View
        style={{
          backgroundColor: Colors.BLUE_DARK,
          padding: 12,
          borderRadius: 16,
        }}
      >
        <Pressable style={{ padding: 8 }} onPress={onClosePress}>
          <Ionicons
            name="close-circle"
            size={28}
            color="white"
            style={{ alignSelf: "flex-end" }}
          />
        </Pressable>

        <Calendar
          style={styles.calendar}
          headerStyle={styles.header}
          theme={themeStyle}
          onDayPress={(dateObject: DateData) => {
            setDay(dateObject);
            onSelectDay(dateObject.dateString);
          }}
          markedDates={
            day && {
              [day.dateString]: { selected: true },
            }
          }
          maxDate={new Date().toDateString()}
          hideExtraDays={true}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: "transparent",
  },
  header: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.PRIMARY,
    marginBottom: 10,
    color: "#fefefe",
  },
});

const themeStyle: Theme = {
  // CALENDAR
  calendarBackground: "transparent",

  arrowColor: Colors.PRIMARY,

  // MONTH
  textMonthFontSize: 18,
  monthTextColor: "#eaeaea",

  // DAY
  dayTextColor: Colors.GRAY_LIGHT,

  // TODAY
  todayTextColor: Colors.PRIMARY,

  // SELECTED_DAY
  selectedDayBackgroundColor: Colors.PRIMARY,
  selectedDayTextColor: Colors.GRAY_LIGHT,

  // DISABLED
  textDisabledColor: "#717171",
};
