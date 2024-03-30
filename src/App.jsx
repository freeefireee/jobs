// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileSaver from './components/Saver/FileSaver';
import FileViewer from './components/Viewer/FileViewer';
import './app.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FileSaver />} />
          <Route path="/file-viewer" element={<FileViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

