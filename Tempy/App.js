import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import Body from "./Body";
import { LinearGradient } from "expo-linear-gradient";
import Charts from "./Charts";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#487eb8", "#1a1b24"]}
        style={[StyleSheet.absoluteFill]}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false} // Hides the horizontal scroll bar
        showsVerticalScrollIndicator={false}
      >
        <Text> </Text>
        <Body />

        <View style={styles.header}>
          <Text> </Text>
          <Text> </Text>
          <Text style={styles.text}>This is Tempy!</Text>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F3A6D",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  header: {},
  text: {
    color: "white",
    textAlign: "center",
  },
});
