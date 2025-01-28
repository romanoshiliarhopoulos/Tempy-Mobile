import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

export default function MidBody() {
  //return
  return (
    <View style={styles.view}>
      <View style={styles.row}>
        <Text style={styles.text}>Temperature:</Text>
        <Text style={styles.textLeft}>Past 12h</Text>
      </View>
    </View>
  );
}

const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#496481",
    color: "white",
    borderRadius: 20,
    height: 200,
    width: screenWidth * 0.87, //takes up 87% of the screens width...
    alignSelf: "center", // Centers the element horizontally
  },
  text: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 13,
    fontFamily: "Calibri",
    color: "white",
  },
  textLeft: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    fontSize: 13,
    fontFamily: "Calibri",
    textAlign: "right",
    color: "white",
  },
  row: {
    flexDirection: "row", // Places children in a row
    justifyContent: "space-between", // Adds space between the text elements
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
