import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FileViewer from '../Viewer/FileViewer';

  const FileSaver = () => {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileName(file.name);
        setFileContent(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const saveFileToIndexedDB = () => {
    const request = window.indexedDB.open('filesDB', 1);
    request.onerror = (event) => {
      console.log("Error opening database");
    };
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(["files"], "readwrite");
      const objectStore = transaction.objectStore("files");
      const request = objectStore.add({ name: fileName, content: fileContent });
      request.onsuccess = (event) => {
        console.log("File saved successfully");
      };
      request.onerror = (event) => {
        console.log("Error saving file");
      };
    };
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={saveFileToIndexedDB}>Save File to IndexedDB</button>
      <Link to="/file-viewer">Go to FileViewer</Link>
    </div>
  );
};

export default FileSaver;
