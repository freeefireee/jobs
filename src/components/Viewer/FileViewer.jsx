import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FileSaver from '../Saver/FileSaver';

const FileViewer = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchFilesFromIndexedDB();
  }, []);

  const fetchFilesFromIndexedDB = () => {
    const request = window.indexedDB.open('filesDB', 1);
    request.onerror = (event) => {
      console.log("Error opening database");
    };
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(["files"], "readonly");
      const objectStore = transaction.objectStore("files");
      const request = objectStore.getAll();
      request.onsuccess = (event) => {
        setFiles(event.target.result);
      };
      request.onerror = (event) => {
        console.log("Error fetching files");
      };
    };
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const downloadFile = () => {
    if (selectedFile) {
      const blob = new Blob([selectedFile.content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = selectedFile.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  const deleteAllFiles = () => {
    const request = window.indexedDB.open('filesDB', 1);
    request.onerror = (event) => {
      console.log("Error opening database");
    };
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(["files"], "readwrite");
      const objectStore = transaction.objectStore("files");
      const clearRequest = objectStore.clear();
      clearRequest.onsuccess = () => {
        setFiles([]);
      };
    };
  };

  return (
    <div>
      <h2>Saved Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index} onClick={() => handleFileClick(file)}>
            {file.name}
          </li>
        ))}
      </ul>
      {selectedFile && (
        <div>
          <h3>Selected File: {selectedFile.name}</h3>
          <button onClick={downloadFile}>Download</button>
        </div>
      )}
      <button onClick={deleteAllFiles}>Delete All Files</button>
      <Link to="/">Go to FileSaver</Link>
    </div>
  );
};

export default FileViewer;
