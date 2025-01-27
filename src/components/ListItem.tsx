import { Colors } from "@/styles/globalColors";
import { textStyles } from "@/styles/globalStyles";
import { TaskProps } from "@/types/TaskProps";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ListItemProps extends TaskProps {
  longPressDelete: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  description,
  priority,
  isMistake,
  observation,
  createdAt,
  longPressDelete,
}) => {
  return (
    <Pressable style={styles.container}>
      <Text style={{ fontSize: 10, alignSelf: "flex-end" }}>
        {createdAt?.toISOString().split("T")[0]}
      </Text>
      <Text style={[textStyles.p_paragraph, styles.text]}>{description}</Text>

      {isMistake && (
        <View style={styles.errorMsgContainer}>
          <Text style={textStyles.h6_label}>Observation</Text>
          <Text style={textStyles.p_paragraph}>{observation}</Text>
        </View>
      )}

      <View style={styles.header}>
        <View style={styles.tagContainer}>
          <Text style={[styles.tagText, textStyles.h6_label]}>{priority}</Text>
        </View>
        <TouchableOpacity onPress={longPressDelete}>
          <Ionicons name="trash" size={24} color={Colors.RED_MEDIUM} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GRAY_LIGHT,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    flex: 1,
    alignSelf: "flex-end",
    gap: 16,
  },
  text: {
    color: "#1C1c1c",
    marginBottom: 8,
    fontWeight: "500",
  },
  tagContainer: {
    backgroundColor: Colors.BLUE_MEDIUM,
    paddingHorizontal: 4,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    alignSelf: "flex-end",
    width: 80,
  },
  tagText: {
    color: Colors.GRAY_LIGHT,
  },
  errorMsgContainer: {
    backgroundColor: Colors.BLUE_LIGHT,
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
});
