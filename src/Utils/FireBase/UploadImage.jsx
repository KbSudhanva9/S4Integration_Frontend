import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './FireBaseConfig';

const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  console.log("File available at:", downloadURL);
};

export default uploadImage;
