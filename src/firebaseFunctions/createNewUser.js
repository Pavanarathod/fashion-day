import { doc, setDoc } from "firebase/firestore";
import { db } from "../database/firebase";

const createNewUser = async (user) => {
  if (!user) return;

  await setDoc(doc(db, "users", user.uid), {
    name: user.displayName,
    email: user.email,
    userId: user.uid,
    createdAt: new Date(),
  });
};

export default createNewUser;
