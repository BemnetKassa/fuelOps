import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Load credentials from environment or file
const serviceAccount = JSON.parse(fs.readFileSync("./fuelops-firebase-adminsdk.json", "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fuelops-aac06.firebaseio.com",
});

export const auth = admin.auth();
export const db = admin.firestore();
