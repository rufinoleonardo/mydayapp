import { StyleSheet } from "react-native";
import { Colors } from "./globalColors";

export const globalStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.BLUE_DARK,
    padding: 20,
  },
});

export const textStyles = StyleSheet.create({
  h1_emphasis: {
    fontSize: 35,
    paddingVertical: 16,
  },
  h2_headline: {
    fontSize: 30,
    paddingVertical: 16,
  },
  h3_subHeading: {
    fontSize: 25,
    paddingVertical: 12,
    fontWeight: "500",
  },
  h4_title: {
    fontSize: 20,
    paddingVertical: 12,
  },
  h5_subTitle: {
    fontSize: 16,
    paddingVertical: 8,
  },
  p_paragraph: {
    fontSize: 12,
  },
  h6_label: {
    fontSize: 10,
    paddingBottom: 4,
    paddingHorizontal: 8,
    fontWeight: "500",
  },
  textLight: {
    color: Colors.GRAY_LIGHT,
  },
});

export const CommonInputStyles = StyleSheet.create({
  colors: {
    backgroundColor: Colors.GRAY_LIGHT,
  },
  field: {
    paddingHorizontal: 8,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    marginBottom: 8,
  },
  container: {
    marginBottom: 8,
  },
});
