import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

export default function MidBody() {
  //return
  return (
    <View>
      <View style={styles.view}>
        <View style={styles.row}>
          <Text style={styles.text}>Temperature:</Text>
          <Text style={styles.textLeft}>Past 12h</Text>
        </View>
        <View>
          <ScrollView style={styles.scrollable} horizontal>
            <Text style={styles.text}>Ro</Text>
          </ScrollView>
        </View>
      </View>

      {/* The humidity scroll window */}
      <View style={styles.view2}>
        <View style={styles.row}>
          <Text style={styles.text}>Humidity:</Text>
          <Text style={styles.textLeft}>Past 12h</Text>
        </View>
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
    width: screenWidth * 0.93, //takes up 87% of the screens width...
    alignSelf: "center", // Centers the element horizontally
  },
  text: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 13,
    fontFamily: "Calibri",
    color: "white",
  },
  scrollable: {
    backgroundColor: "black",
    width: 100,
    height: 100,
    width: "95%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 10,
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
  view2: {
    backgroundColor: "#496481",
    color: "white",
    borderRadius: 20,
    height: 200,
    width: screenWidth * 0.93, //takes up 87% of the screens width...
    alignSelf: "center", // Centers the element horizontally
    marginTop: 25,
  },
});
