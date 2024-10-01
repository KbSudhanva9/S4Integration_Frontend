import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Checkbox } from '@mui/material';
import { getStorage, ref, listAll, deleteObject } from 'firebase/storage';

const ClearFireBaseStorage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(new Set());

  const storage = getStorage();

  // Fetch existing documents from Firebase Storage
  const fetchFiles = async () => {
    const listRef = ref(storage, 'images/'); // Adjust path if necessary
    const res = await listAll(listRef);
    const fileNames = res.items.map(item => item.name);
    setFiles(fileNames);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Handle selecting files
  const handleSelectFile = (fileName) => {
    const updatedSelection = new Set(selectedFiles);
    if (updatedSelection.has(fileName)) {
      updatedSelection.delete(fileName);
    } else {
      updatedSelection.add(fileName);
    }
    setSelectedFiles(updatedSelection);
  };

  // Handle delete operation
  const handleDeleteFiles = async () => {
    const deletePromises = Array.from(selectedFiles).map(async (fileName) => {
      const fileRef = ref(storage, `images/${fileName}`);
      await deleteObject(fileRef);
    });
    
    await Promise.all(deletePromises);
    setSelectedFiles(new Set()); // Clear selection
    fetchFiles(); // Refresh file list after deletion
  };

  // Handle select all files
  const handleSelectAll = () => {
    if (selectedFiles.size === files.length) {
      setSelectedFiles(new Set()); // Deselect all
    } else {
      setSelectedFiles(new Set(files)); // Select all
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Clear Firebase Storage</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={fetchFiles} // Refresh the file list
      >
        Refresh
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteFiles}
        disabled={selectedFiles.size === 0}
      >
        Delete Selected
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectedFiles.size === files.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel>File Name</TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file} selected={selectedFiles.has(file)}>
                <TableCell>
                  <Checkbox
                    checked={selectedFiles.has(file)}
                    onChange={() => handleSelectFile(file)}
                  />
                </TableCell>
                <TableCell>{file}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ClearFireBaseStorage;
