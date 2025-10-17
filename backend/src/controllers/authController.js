import { auth, db } from "../config/firebase.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;

    // Create Firebase user
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // Store user profile in Firestore
    await db.collection("users").doc(userRecord.uid).set({
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      message: "User registered successfully",
      uid: userRecord.uid,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (err) {
    next(err);
  }
};
