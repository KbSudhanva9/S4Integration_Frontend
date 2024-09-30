import { collection, addDoc } from 'firebase/firestore';
import { db } from './FireBaseConfig'; // Your Firebase configuration file

const addData = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "Sudhanva Konakalla",
      email: "bhargava_konakalla@tecnics.com"
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
