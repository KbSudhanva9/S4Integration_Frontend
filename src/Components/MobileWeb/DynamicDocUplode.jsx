import { Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import uploadImage from "../../Utils/FireBase/UploadImage"; // Ensure this path is correct
import { useParams } from "react-router-dom";
import imageCompression from "browser-image-compression"; // Import image compression
import FullScreenLoader from "../../Utils/Loading/FullScreenLoader";

const DynamicDocUplode = () => {
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);
    const [filePreview, setFilePreview] = useState(null);
    const [file, setFile] = useState(null);
    const { docName } = useParams(); // Extract docName from the URL
    const [loading, setLoading] = useState(false);

    // Function to trigger file input click
    const handleFileUploadClick = () => {
        fileInputRef.current.click();
    };

    // Function to handle file selection (file picker or camera)
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            try {
                // Set image compression options
                const options = {
                    maxSizeMB: 1, // Target 1MB or lower
                    maxWidthOrHeight: 800, // Resize to a max dimension
                    useWebWorker: true // Optional: for background compression
                };

                // Compress image if it's an image file
                let compressedFile = selectedFile;
                if (selectedFile.type.startsWith("image/")) {
                    compressedFile = await imageCompression(selectedFile, options);
                }

                setFile(compressedFile); // Set the compressed file
                const fileURL = URL.createObjectURL(compressedFile); // Create URL for file preview
                setFilePreview(fileURL);
            } catch (error) {
                console.error("Error compressing the file:", error);
            }
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        if (file) {
            try {
                await uploadImage(file, docName); // Upload compressed file to Firebase
                setFile(null);  // Clear the file
                setFilePreview(null);  // Clear the file preview
                alert("File uploaded successfully!");
                setLoading(false);
            } catch (error) {
                console.error("Error uploading file:", error);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        // Reset the file and preview states
        setFile(null);
        setFilePreview(null);

        // Clear localStorage or sessionStorage if needed
        localStorage.clear();
        sessionStorage.clear();
    }, []);

    return (

        <>
            {loading && <FullScreenLoader />}
            <div
                style={{
                    height: '100vh',
                    // width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px',
                    padding: '20px'
                    // display: 'grid',
                    // placeContent: 'center',
                    // display: 'flex',
                    // alignItems: 'center',
                    // justifyContent: 'center',
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
                    Choose to Upload
                </Button>

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
            </div >
        </>
    );
};

export default DynamicDocUplode;
