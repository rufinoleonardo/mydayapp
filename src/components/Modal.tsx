import {
  KeyboardAvoidingView,
  ModalProps,
  Platform,
  Modal as RNModal,
  StyleSheet,
  View,
} from "react-native";

type modalProps = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
};

export function Modal({ isOpen, withInput, children, ...rest }: modalProps) {
  const content = withInput ? (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View style={styles.container}>{children}</View>
  );

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      {content}
    </RNModal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20,
    backgroundColor: "#18181b",
    opacity: 0.9,
  },
});
