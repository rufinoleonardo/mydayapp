import { useAppDispatch } from "@/redux/hooks";
import { changeLanguage } from "@/redux/slices/languageSlice";
import { getSavedLanguage } from "@/utils/asyncStorageFns";
import { Redirect } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getAppLang() {
      const lang = await getSavedLanguage();
      dispatch(changeLanguage(lang));
    }

    getAppLang();
  }, []);

  return <Redirect href={"home"} />;
}
