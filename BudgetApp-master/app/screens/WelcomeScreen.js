import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import AppButton from "./components/AppButton";

function WelcomeScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/black.jpg")}
    >
      <View style={styles.buttonContainer}>
        <AppButton title="Login" />
        <AppButton title="Register" />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
  },
});
export default WelcomeScreen;
