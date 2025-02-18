import enStrings from "@/ui/resources/lang/en";
import ptStrings from "@/ui/resources/lang/pt-br";
import { getSavedLanguage } from "@/utils/asyncStorageFns";
import { createSlice } from "@reduxjs/toolkit";

let lang = "en";

async function getLang() {
  lang = await getSavedLanguage();
}

getLang();

const initialState = {
  language: lang,
  strings: enStrings,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      const newLanguage = action.payload;
      state.language = newLanguage;
      state.strings = newLanguage === "en" ? enStrings : ptStrings;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
