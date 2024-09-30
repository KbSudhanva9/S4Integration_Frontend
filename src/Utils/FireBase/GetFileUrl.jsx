import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './FireBaseConfig';

const getFileUrl = async (fileName) => {
  const storageRef = ref(storage, `images/${fileName}`); // Adjust path to where your files are stored
  try {
    const url = await getDownloadURL(storageRef);
    console.log('File available at: ', url);
    return url; // Return the URL for later use
  } catch (error) {
    console.error('Error getting file URL:', error);
  }
};

export default getFileUrl