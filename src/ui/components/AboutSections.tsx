import { textStyles } from "@/ui/styles/globalStyles";
import { Text, View } from "react-native";

interface AboutSectionProps {
  title: string;
  description: string;
  imgSrc?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  description,
  imgSrc,
}) => {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={[textStyles.h4_title, textStyles.textLight]}>{title}</Text>
      <Text style={[textStyles.p_paragraph, textStyles.textLight]}>
        {description}
      </Text>
    </View>
  );
};
