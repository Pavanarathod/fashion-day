import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore, onSnapshot } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const createNewUser = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = onSnapshot(doc(db, "users", userAuth.uid), (doc) =>
    doc.data() ? doc.data() : null
  );

  try {
    if (!userRef) {
      await setDoc(doc(db, "users", userAuth.uid), {
        name: userAuth.displayName,
        email: userAuth.email,
        userId: userAuth.uid,
        createdAt: new Date(),
      });
    }
  } catch (error) {
    alert(error.message);
  }

  return userRef;
};

export { auth, provider, db, createNewUser };
