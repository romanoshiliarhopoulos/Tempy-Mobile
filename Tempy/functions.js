import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";

export default function MidBody() {
  const [tempData, setTempData] = useState<number[]>(Array(24).fill(0));
  const [humidityData, setHumidityData] = useState<number[]>(Array(24).fill(0));
  const [timeLabels, setTimeLabels] = useState<string[]>(Array(24).fill("Now"));

  useEffect(() => {
    // Simulating fetching data and updating state
    const fetchData = async () => {
      // Replace this with real data-fetching logic
      const temperatures = Array.from({ length: 24 }, () =>
        Math.round(Math.random() * 40)
      );
      const humidities = Array.from({ length: 24 }, () =>
        Math.round(Math.random() * 100)
      );

      const timeArray = Array(24)
        .fill(null)
        .map((_, index) => {
          const date = new Date();
          date.setHours(date.getHours() - index);
          return `${date.getHours()}:00`;
        });

      setTempData(temperatures.reverse());
      setHumidityData(humidities.reverse());
      setTimeLabels(timeArray.reverse());
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Temperature Scroll View */}
      <View style={styles.view}>
        <View style={styles.row}>
          <Text style={styles.text}>Temperature:</Text>
          <Text style={styles.textLeft}>Past 12h</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {tempData.map((temp, index) => (
            <View key={index} style={styles.dataItem}>
              <Text style={styles.timeLabel}>{timeLabels[index]}</Text>
              <Text style={styles.dataValue}>{temp}°</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Humidity Scroll View */}
      <View style={styles.view2}>
        <View style={styles.row}>
          <Text style={styles.text}>Humidity:</Text>
          <Text style={styles.textLeft}>Past 12h</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {humidityData.map((humidity, index) => (
            <View key={index} style={styles.dataItem}>
              <Text style={styles.timeLabel}>{timeLabels[index]}</Text>
              <Text style={styles.dataValue}>{humidity}%</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  view: {
    backgroundColor: "#496481",
    borderRadius: 20,
    height: 200,
    width: screenWidth * 0.87,
    alignSelf: "center",
    marginTop: 20,
    padding: 10,
  },
  view2: {
    backgroundColor: "#496481",
    borderRadius: 20,
    height: 200,
    width: screenWidth * 0.87,
    alignSelf: "center",
    marginTop: 25,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 13,
    fontFamily: "Calibri",
    color: "white",
  },
  textLeft: {
    fontSize: 13,
    fontFamily: "Calibri",
    color: "white",
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  dataItem: {
    width: 60,
    height: 100,
    backgroundColor: "#3C4D5C",
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  timeLabel: {
    fontSize: 12,
    color: "white",
    marginBottom: 5,
  },
  dataValue: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
