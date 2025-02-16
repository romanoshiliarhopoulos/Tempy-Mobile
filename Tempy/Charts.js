import { StyleSheet, Text, View, Dimensions, LogBox } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit";
import { get24HourTime, lastNentries } from "./functions";

LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews",
]);

const { width: screenWidth } = Dimensions.get("window");

export default function Charts() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [items, setItems] = useState([
    { label: "24h", value: 1 },
    { label: "3 d", value: 3 },
    { label: "5d", value: 5 },
    { label: "7d", value: 7 },
    { label: "1M", value: 30 },
    { label: "3M", value: 90 },
  ]);

  //for getting the data to use for the graph.
  const [fetchedData, setFetchedData] = useState(null);
  const [tempdata, setTemp] = useState(Array(24 * 10).fill(0));
  const [humdata, setHum] = useState(Array(24 * 10).fill(0));
  const [labels, setLabels] = useState(Array(24 * 10).fill(""));

  useEffect(() => {
    const getData = async () => {
      console.log("Changed!");
      try {
        const data = await lastNentries(value * 6 * 24);
        console.log(value);
        //process the data to make sense in charts.
        //data should be an array of objects with fields [temperature, humidity, time(seconds)]
        let temps = Array(data.length).fill(0);
        let hums = Array(data.length).fill(0);
        let labels = Array(data.length).fill("");

        //to populate the three arrays
        for (let i = 0; i < data.length; i++) {
          temps[i] = data[i].temperature;
          hums[i] = data[i].humidity;
          if (i % (value * 20) == 0) {
            labels[i] = get24HourTime(data[i].time.seconds);
          }
        }
        labels[0] = " ";
        setLabels(labels.reverse());
        setTemp(temps.reverse());
        setHum(hums.reverse());
        setFetchedData(data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };
    getData();
  }, [value]); // Re-run when value changes

  const data = {
    labels: labels,
    datasets: [
      {
        data: tempdata,
        strokeWidth: 2, // optional
      },
    ],
  };
  const dataHum = {
    labels: labels,
    datasets: [
      {
        data: humdata,
        strokeWidth: 2, // optional
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#1a1b24",
    backgroundGradientTo: "#1a1b24",
    decimalPlaces: 1, // Matches precision of web version
    color: (opacity = 1) => `rgba(80, 191, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    fillShadowGradient: "#80bfff", // Bright light blue shadow
    fillShadowGradientOpacity: 0.6,
    style: {
      borderRadius: 10,
      paddingRight: 0,
      paddingLeft: 0,
      marginRight: 0,
      color: "white",
    },
    propsForDots: {
      r: "0", // No dots, similar to web
    },
    propsForBackgroundLines: {
      stroke: "transparent", // Hide grid lines like in the web
    },
    propsForLabels: {
      fontSize: 10, // Adjust the font size for both x and y axis labels
    },
  };
  const chartConfigHum = {
    backgroundGradientFrom: "#1a1b24",
    backgroundGradientTo: "#1a1b24",
    decimalPlaces: 1, // Matches precision of web version
    color: (opacity = 1) => `rgba(80, 191, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    fillShadowGradient: "#80bfff", // Bright light blue shadow
    fillShadowGradientOpacity: 0.6,
    style: {
      borderRadius: 10,
      paddingRight: 0,
      paddingLeft: 0,
      marginRight: 0,
      color: "white",
    },
    propsForDots: {
      r: "0", // No dots,
    },
    propsForBackgroundLines: {
      stroke: "transparent", //  in the web
    },
    propsForLabels: {
      fontSize: 10,
    },
  };

  return (
    <View style={styles.parent}>
      <Text style={styles.header}>Data charts</Text>
      <View style={styles.chartView}>
        {/* For the Temperature and drop down menu row*/}
        <View style={styles.row}>
          <Text style={styles.text}>Temperature:</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={[styles.drop, { backgroundColor: "white", borderWidth: 0 }]} // White background and no border
            textStyle={{ color: "black" }} // Black textx
            dropDownContainerStyle={{
              backgroundColor: "white", // White dropdown background
              borderWidth: 0,
              width: 90, // Ensures the dropdown is the same width as the button
              marginTop: 10, // Makes sure the dropdown appears just below the button
              alignSelf: "flex-end", // Prevent it from affecting the layout above
              top: "100%", // Ensures it opens below the button
              right: 100,
            }}
            renderArrowIcon={({ open }) => (
              <FontAwesome
                name={open ? "angle-up" : "angle-down"}
                size={20}
                color="black" // Arrow color matches text
              />
            )}
          />
        </View>
        {/* For the Temperature chart */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LineChart
            data={data}
            width={screenWidth} // from react-native
            height={300}
            style={{
              width: "100%",
              borderRadius: 18,
              paddingLeft: -10,
              marginLeft: -25,
              marginTop: 40,
              marginRight: 10,
            }}
            chartConfig={chartConfig}
          />
        </View>
      </View>

      <View style={styles.chartViewHum}>
        {/* For the Temperature and drop down menu row*/}
        <View style={styles.row}>
          <Text style={styles.text}>Humidity:</Text>
        </View>
        {/* For the Temperature Chart */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LineChart
            data={dataHum}
            width={screenWidth} // from react-native
            height={300}
            style={{
              width: "100%",
              borderRadius: 18,
              paddingLeft: -10,
              marginLeft: -25,
              marginTop: 40,
              marginRight: 10,
            }}
            chartConfig={chartConfigHum}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    color: "white",
    borderRadius: 20,
    width: screenWidth * 0.93, //takes up 93% of the screens width...
    alignSelf: "center", // Centers the element horizontally
    marginTop: 40,
  },
  header: {
    color: "white",
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 20,
  },
  chartView: {
    backgroundColor: "#496481",
    width: "100%",
    borderRadius: 15,
  },
  chartViewHum: {
    backgroundColor: "#496481",
    width: "100%",
    borderRadius: 15,
    marginTop: 40,
  },
  row: {
    flexDirection: "row", // Places children in a row
    justifyContent: "space-between", // Adds space between the text elements
    alignItems: "center",
    paddingHorizontal: 10,
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
    flex: 1, // Allows the picker to expand within its parent
    marginHorizontal: 10,
    marginTop: 10,
    fontFamily: "Calibri",
    textAlign: "right",
    color: "white",
    alignContent: "right",
  },
  drop: {
    backgroundColor: "black",
    borderColor: "white",
    width: 90,
    height: 0,
    marginTop: 30,
    alignSelf: "flex-end",
    marginRight: 100,
  },
});
