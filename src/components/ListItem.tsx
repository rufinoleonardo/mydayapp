import { textStyles } from "@/styles/globalStyles";
import { TaskProps } from "@/types/TaskProps";
import { Pressable, Text } from "react-native";

export const ListItem: React.FC<TaskProps> = ({
  description,
  priority,
  isMistake,
  observation,
}) => {
  return (
    <Pressable>
      <Text style={[textStyles.p_paragraph, textStyles.textLight]}>
        {description}
      </Text>
    </Pressable>
  );
};
