import { StyleSheet } from "react-native";
import { Colors } from "./globalColors";
import { Sizes } from "./globalSizes";

export const globalStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.BLUE_DARK,
    padding: 20,
  },
  rowCentered: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Sizes.GAP_INPUT,
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
    height: Sizes.PRESSABLE_HEIGHT,
    borderRadius: 8,
    justifyContent: "center",
    marginBottom: 8,
  },
  container: {
    marginBottom: 8,
  },
  rowContainer: {
    marginBottom: 8,
    flex: 1,
  },
});

export const gButtonsStyles = StyleSheet.create({
  successLg: {
    width: "100%",
    backgroundColor: Colors.GREEN_MEDIUM,
    padding: Sizes.BUTTON_PADDING,
    borderRadius: Sizes.BORDER_RADIUS_MD,
    alignItems: "center",
    justifyContent: "center",
    height: Sizes.PRESSABLE_HEIGHT,
    textAlign: "center",
  },
});
