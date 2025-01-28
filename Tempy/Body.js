/* Body.js */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import MidBody from "./MidBody";
import { getApps, getApp } from "firebase/app";

//this array will hold the live temperature and humidity values, temp at index 0 and hum at index 1

export default function Body() {
  const [live, setLive] = useState({ temp: 0, hum: 0, time: "" });
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    // Call a function to set up the Firebase listener
    const unsubscribe = updateLiveTemp(setLive, setLoading);
    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <>
          <Text style={styles.header}> {live.temp.toFixed(1)}°</Text>
          <Text style={styles.subtext}>● Live: {live.time} </Text>

          {/* Add a View with margin to create the 50px space */}
          <View style={styles.margin}>
            <MidBody live={live}></MidBody>
          </View>
        </>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header: {
    color: "white",
    fontSize: "60",
    fontFamily: "Roboto, sans-serif",
    textAlign: "center",
  },
  subtext: {
    color: "#7eed9a",
    fontSize: "15",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  margin: {
    marginTop: "50",
  },
});

//function that fetches and updates the live temperature.
function updateLiveTemp(setLive, setLoading) {
  //fireabse configuration properties.
  const firebaseConfig = {
    apiKey: "AIzaSyD38K9ZpLZpFQbGruwO3EnoGSOrhmY45Ug",
    authDomain: "iot-app-20b70.firebaseapp.com",
    databaseURL: "https://iot-app-20b70-default-rtdb.firebaseio.com",
    projectId: "iot-app-20b70",
    storageBucket: "iot-app-20b70.firebasestorage.app",
    messagingSenderId: "206130198957",
    appId: "1x:206130198957:web:a8d92d4c0c923d92004924",
    measurementId: "G-HQCMWBSZK4",
  };
  //console.log("entered function");

  // Initialize Firebase App (Avoid Duplicate Initialization)
  let app;
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp(); // Use the existing initialized app
  }
  const db = getDatabase(app);
  const readingsRef = ref(db, "readings");

  const unsubscribe = onValue(readingsRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const timestamp = data.timestamp;
      setLoading(false);
      setLive({
        temp: data.tempdata || 0, // Fallback to 0 if tempdata is missing
        hum: data.humiditydata || 0, // Fallback to 0 if humiditydata is missing
        time: timestamp.substring(11, 16) || "N/A",
      });
    } else {
      console.log("No data available");
    }
  });

  // Return a cleanup function to remove the listener
  return () => unsubscribe();
}
