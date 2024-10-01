import { Button, Typography } from "@mui/material";
import { useRef, useState } from "react";
import uploadImage from "../../Utils/FireBase/UploadImage"; // Ensure this path is correct

const MobileView = () => {
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);
    const [filePreview, setFilePreview] = useState(null);
    const [file, setFile] = useState(null);

    // Function to trigger file input click
    const handleFileUploadClick = () => {
        fileInputRef.current.click();
    };

    // Function to trigger camera input click
    const handleCameraClick = () => {
        cameraInputRef.current.click();
    };

    // Function to handle file selection (file picker or camera)
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const fileURL = URL.createObjectURL(selectedFile); // Create URL for file preview
            setFilePreview(fileURL);
        }
    };

    // Function to handle file submission
    const handleSubmit = async () => {
        if (file) {
            try {
                await uploadImage(file); // Upload file to Firebase
                alert("File uploaded successfully!");
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    return (
        <div
            style={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                padding: '20px'
            }}
        >
            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange} // Same handler for file and camera
            />

            {/* Hidden camera input */}
            <input
                type="file"
                ref={cameraInputRef}
                accept="image/*"
                capture="environment" // This opens the back camera on mobile
                style={{ display: 'none' }}
                onChange={handleFileChange} // Same handler for file and camera
            />

            {/* Button to trigger file upload */}
            <Button variant="contained" color="primary" onClick={handleFileUploadClick}>
                Choose to Uplode
            </Button>

            {/* Button to trigger camera */}
            {/* <Button variant="contained" color="secondary" onClick={handleCameraClick}>
                Open Camera
            </Button> */}

            {/* Display the file preview */}
            {filePreview && (
                <div style={{ border: '1px solid #ddd', padding: '10px', marginTop: '20px', width: '100%' }}>
                    {file.type.startsWith("image/") ? (
                        <img src={filePreview} alt="Preview" style={{ width: '100%' }} />
                    ) : file.type === "application/pdf" ? (
                        <iframe
                            src={filePreview}
                            title="PDF Preview"
                            style={{ width: '100%', height: '300px' }}
                        ></iframe>
                    ) : (
                        <Typography variant="body2">File: {file.name}</Typography>
                    )}
                </div>
            )}

            {/* Submit button */}
            <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                disabled={!file} // Disable button if no file is selected
            >
                Submit
            </Button>
        </div>
    );
};

export default MobileView;
