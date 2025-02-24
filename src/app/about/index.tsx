import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeLanguage } from "@/redux/slices/languageSlice";
import { AboutSection } from "@/ui/components/AboutSections";
import { colors } from "@/ui/resources/colors";
import { globalStyles } from "@/ui/styles/globalStyles";
import { saveLanguage } from "@/utils/asyncStorageFns";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AboutScreen() {
  const { language, strings } = useAppSelector((state) => state.language);
  const dispatch = useAppDispatch();

  const handleChangeLanguage = async (language: "en" | "pt") => {
    dispatch(changeLanguage(language));
    await saveLanguage(language);
  };

  return (
    <View style={globalStyles.pageContainer}>
      <View style={[globalStyles.rowCentered, { paddingBottom: 12 }]}>
        <TouchableOpacity onPress={() => handleChangeLanguage("en")}>
          <Text
            style={[
              styles.langText,
              language == "en" ? styles.langSelected : {},
            ]}
          >
            English
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeLanguage("pt")}>
          <Text
            style={[
              styles.langText,
              language == "pt" ? styles.langSelected : {},
            ]}
          >
            Português
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity></TouchableOpacity>
      <ScrollView
        style={{ flex: 1, paddingBottom: 12 }}
        showsVerticalScrollIndicator={true}
      >
        <AboutSection
          title={strings.screen_About.title}
          description={strings.screen_About.description}
        />

        <AboutSection
          title={strings.screen_About.section0Title}
          description={strings.screen_About.section0Desc}
        />

        <AboutSection
          title={strings.screen_About.section1Title}
          description={strings.screen_About.section1Desc}
        />

        <AboutSection
          title={strings.screen_About.section2Title}
          description={strings.screen_About.section2Desc}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  langText: {
    backgroundColor: colors.night.DISABLED,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    color: "#b4b4b4",
  },
  langSelected: {
    backgroundColor: colors.night.SECONDARY,
    color: colors.night.DARK,
    fontWeight: "500",
  },
});
