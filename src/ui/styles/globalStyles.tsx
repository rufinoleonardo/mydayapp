import { StyleSheet } from "react-native";
import { colors } from "../resources/colors";
import { Sizes } from "./globalSizes";

export const globalStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.night.DARK,
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
    marginTop: 8,
  },
  h5_subTitle: {
    fontSize: 16,
    paddingVertical: 8,
  },
  p_paragraph: {
    fontSize: 12,
    lineHeight: 12 * 1.5,
  },
  h6_label: {
    fontSize: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontWeight: "500",
  },
  textLight: {
    color: colors.night.LIGHT,
  },
});

export const CommonInputStyles = StyleSheet.create({
  colors: {
    backgroundColor: colors.night.LIGHT,
  },
  field: {
    paddingHorizontal: 8,
    height: Sizes.PRESSABLE_HEIGHT,
    borderRadius: 8,
    justifyContent: "center",
  },
  container: {
    marginBottom: 8,
  },
  rowContainer: {
    marginBottom: 8,
    flex: 1,
  },
});

const buttons = StyleSheet.create({
  btnLg: {
    width: "100%",
    padding: Sizes.BUTTON_PADDING,
    borderRadius: Sizes.BORDER_RADIUS_MD,
    alignItems: "center",
    justifyContent: "center",
    height: Sizes.PRESSABLE_HEIGHT,
    textAlign: "center",
  },
  btnSuccess: {
    backgroundColor: colors.night.SUCCESS,
  },
});

const tab = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.night.DARK,
  },
  headerTitleStyle: {
    color: colors.night.LIGHT,
    fontSize: Sizes.TEXT_H1,
    backgroundColor: colors.night.DARK,
  },
});

const titles = StyleSheet.create({
  crudAction: {
    color: colors.night.LIGHT,
    fontSize: Sizes.TEXT_H3,
    fontStyle: "italic",
    marginBottom: 20,
    marginLeft: 4,
  },
  detailPage: {
    color: colors.night.LIGHT,
    fontSize: Sizes.TEXT_H4,
    marginBottom: 12,
  },
});

export const gStyles = {
  tab: tab,
  titles: titles,
  buttons: buttons,
};
