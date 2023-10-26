// Import the functions you need from the SDKs you need
import { error } from "console";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove,
  push,
} from "firebase/database"; // Update the import path
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFZjbBnAowTs7jBTlDqErserc_6jDZy8E",
  authDomain: "health-guard-v1.firebaseapp.com",
  databaseURL:
    "https://health-guard-v1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "health-guard-v1",
  storageBucket: "health-guard-v1.appspot.com",
  messagingSenderId: "25738976542",
  appId: "1:25738976542:web:6688d8de3f2c82a64d7d0f",
  measurementId: "G-V6ZL7FGYW5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Creating object for getDatabase function
const db = getDatabase(app);

// Creating global variable to get latest data from realtime database
let realtimeDatabaseData;

// Creating global variable to keep record of length of root node
let SIZE_OF_ROOT = 0;

// Global variable to prevent duplicate parent node creation
let SAME_EVENT = false;

// Function to Insert data
async function InsertData(numberOfEvent) {
  // calling push function
  for (let i = 0; i < 25; i++) {
    // Heartrate Calculation
    const heartRateValue = Math.floor(Math.random() * 11) + 70;

    // data to be used
    let data = {
      heartRate: heartRateValue,
    };

    push(ref(db, "Heartrate-Sensor-0/" + numberOfEvent), data); // firebase push function
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay for 0.5 seconds
  }
}

// Function to Update data

// Function to Read data
async function SelectData() {
  const dbref = ref(db); // Creating reference for Database

  try {
    const snapshot = await get(child(dbref, "Heartrate-Sensor-0/")); // Calling get function with required Node

    // Checking if the specified Node exists or not
    if (snapshot.exists()) {
      const resultData = snapshot.val();
      // console.log("Result Data: ", resultData);
      return resultData; // Return response from function
    } else {
      console.log("No data found");
      return null;
    }
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

// Main function to call the required functions sequentially
async function main() {
  // Check if the function call is in the same event or not
  if (!SAME_EVENT) {
    // Calling SelectData function
    realtimeDatabaseData = await SelectData();
  }

  // Printing global realtimeDatabaseData
  console.log("Database Data: ", realtimeDatabaseData);
  //console.log("Size of node: ", realtimeDatabaseData.length);

  console.log("SAME_EVENT: ", SAME_EVENT);

  // Calculating size of root node
  SIZE_OF_ROOT = realtimeDatabaseData.length;
  console.log("SIZE_OF_ROOT: ", SIZE_OF_ROOT);

  // Setting SAME_EVENT to be true
  SAME_EVENT = true;
  console.log("SAME_EVENT: ", SAME_EVENT);

  if (SAME_EVENT) {
    // Calling InsertData function
    InsertData(SIZE_OF_ROOT);
  }
}

// Calling InsertData function
// InsertData();

// Calling main function
main();
