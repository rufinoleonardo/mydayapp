import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveLanguage = async (language: "en" | "pt") => {
  try {
    await AsyncStorage.setItem("@app_language", language);
  } catch (err) {
    console.log(err);
  }
};

export const getSavedLanguage = async () => {
  try {
    const language = await AsyncStorage.getItem("@app_language");
    return language || "en";
  } catch (err) {
    return "en";
  }
};
