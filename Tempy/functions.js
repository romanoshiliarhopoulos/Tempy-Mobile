import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD38K9ZpLZpFQbGruwO3EnoGSOrhmY45Ug",
  authDomain: "iot-app-20b70.firebaseapp.com",
  databaseURL: "https://iot-app-20b70-default-rtdb.firebaseio.com",
  projectId: "iot-app-20b70",
  storageBucket: "iot-app-20b70.appspot.com",
  messagingSenderId: "206130198957",
  appId: "1x:206130198957:web:a8d92d4c0c923d92004924",
  measurementId: "G-HQCMWBSZK4",
};

// Initialize Firebase App (Avoid Duplicate Initialization)
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // Use the existing initialized app
}

// Firestore Initialization
const dbFirestore = getFirestore(app);

// Function to Get Last N Entries
export async function lastNentries(n) {
  try {
    const readingsCollection = collection(dbFirestore, "readings"); // Reference to the Firestore collection
    const q = query(readingsCollection, orderBy("time", "desc"), limit(n)); // Firestore query
    const querySnapshot = await getDocs(q); // Execute the query

    if (querySnapshot.empty) {
      console.log("No matching documents!");
      return [];
    }

    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push(doc.data()); // Collect document data
    });

    return documents;
  } catch (error) {
    console.error("Error getting last entries: ", error);
    return [];
  }
}
export function get24HourTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);

  // Extract hours and minutes
  const hours = date.getHours(); // Returns 0-23
  const minutes = date.getMinutes(); // Returns 0-59

  // Format hours and minutes to always be two digits
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  // Combine into a 24-hour time string
  return `${formattedHours}:${formattedMinutes}`;
}
