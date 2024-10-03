import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './FireBaseConfig';

const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  // const storageRef = ref(storage, `documents/${file.name}`);


  // console.log("Uploading file:", file.name);

  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  console.log("File available at:", downloadURL);

  // const downloadURL = await getDownloadURL(storageRef);
  // console.log("File available at:", downloadURL);
};

export default uploadImage;


// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from './FireBaseConfig';

// const uploadImage = async (file) => {
//     // You might need to generate the actual file from the document name or handle it appropriately
//     const storageRef = ref(storage, `images/${file.name}`); // Upload to the Firebase storage under 'documents' folder
//     // Assuming you're uploading some generated file or a blob here
//     // await uploadBytes(storageRef, actualFileData);

//     // Example: If you have the actual file, uncomment the line above and remove the file mock below
//     console.log("Uploading file:", file.name);

//     // Get download URL after uploading
//     const downloadURL = await getDownloadURL(storageRef);
//     console.log("File available at:", downloadURL);
// };

// export default uploadImage;
