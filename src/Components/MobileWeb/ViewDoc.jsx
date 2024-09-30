import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import getFileUrl from '../../Utils/FireBase/GetFileUrl';

const ViewDoc = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [fileName, setFileName] = useState(''); // Start with an empty file name
  const [searchFileName, setSearchFileName] = useState(''); // For storing the user search input

  // Fetch file URL whenever fileName changes
  useEffect(() => {
    const fetchFileUrl = async () => {
      if (fileName) {
        const url = await getFileUrl(fileName);
        setFileUrl(url); // Store the download URL
      }
    };
    fetchFileUrl();
  }, [fileName]);

  // Handle form submission when the user clicks the button or presses Enter
  const handleSearch = () => {
    setFileName(searchFileName); // Set the fileName to trigger file fetching
  };

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
      {/* Input field to enter the file name */}
      <TextField
        label="Enter file name"
        variant="outlined"
        value={searchFileName}
        onChange={(e) => setSearchFileName(e.target.value)} // Update search input state
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch(); // Trigger search on Enter key
          }
        }}
        style={{ marginBottom: '20px', width: '300px' }}
      />
      
      {/* Button to trigger the search */}
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search Document
      </Button>

      {/* Conditionally render the file based on the file URL */}
      {fileUrl ? (
        <>
          {/* Example for images */}
          {fileName.endsWith('.jpg') || fileName.endsWith('.png') ? (
            <img src={fileUrl} alt="Uploaded file" style={{ width: '200px', height: '200px' }} />
          ) : (
            // Example for PDFs or DOCs: Display a link
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              Open {fileName}
            </a>
          )}
        </>
      ) : (
        fileName && <p>Loading file...</p>
      )}

      {/* Submit button if you need to perform an action */}
      {fileUrl && (
        <Button variant="contained" color="secondary" onClick={() => console.log('Perform action after displaying the file')}>
          Submit
        </Button>
      )}
    </div>
  );
};

export default ViewDoc;
