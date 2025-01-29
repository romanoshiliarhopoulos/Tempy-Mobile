/* MidBody.js */
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
import { lastNentries, get24HourTime } from "./functions";

export default function MidBody({ live }) {
  const [data, setEntries] = useState([]);
  const [avgdata, setAvgdata] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const fetchedData = await lastNentries(12 * 6); // Await the data
        setEntries(fetchedData); // Store the data in state

        const avgDataArray = [];
        avgDataArray.push({
          temperature: live.temp.toFixed(1),
          humidity: live.hum,
          time: "Now",
        });

        for (let i = 0; i < 72; i += 3) {
          const avgtemp =
            (fetchedData[i].temperature +
              fetchedData[i + 1].temperature +
              fetchedData[i + 2].temperature) /
            3;
          const avghum =
            (fetchedData[i].humidity +
              fetchedData[i + 1].humidity +
              fetchedData[i + 2].humidity) /
            3;
          const avgtime =
            (fetchedData[i].time.seconds +
              fetchedData[i + 1].time.seconds +
              fetchedData[i + 2].time.seconds) /
            3;

          avgDataArray.push({
            temperature: avgtemp.toFixed(1),
            humidity: avghum.toFixed(1),
            time: get24HourTime(avgtime),
          });
        }

        setAvgdata(avgDataArray); // Update state with the new data
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, [live]);

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
            {avgdata.map((data, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardTime}>{data.time}</Text>
                <Text style={styles.cardValue}>{data.temperature}°</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* The humidity scroll window */}
      <View style={styles.view2}>
        <View style={styles.row}>
          <Text style={styles.text}>Humidity:</Text>
          <Text style={styles.textLeft}>Past 12h</Text>
        </View>
        <View>
          <ScrollView style={styles.scrollable} horizontal>
            {avgdata.map((data, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardTime}>{data.time}</Text>
                <Text style={styles.cardValue}>{data.humidity}%</Text>
              </View>
            ))}
          </ScrollView>
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
    borderRadius: 15,
    width: screenWidth * 0.93, //takes up 93% of the screens width...
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
    backgroundColor: "#2d3e50",
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
    borderRadius: 15,
    width: screenWidth * 0.93, //takes up 87% of the screens width...
    alignSelf: "center", // Centers the element horizontally
    marginTop: 25,
  },
  card: {
    backgroundColor: "#2d3e50",
    borderRadius: 10,
    width: 70,
    height: "100%",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTime: {
    color: "white",
    fontSize: 14,
    marginBottom: 14,
  },
  cardValue: {
    color: "#80bfff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
