import logo from './logo.svg';
import './App.css';
import { Upload } from "./Upload";
import React from 'react';


function App() {
  return (
    <div className="App">
     
      <Upload >
        <button>Upload Files</button>
      </Upload>
    </div>
  );
}

export default App;
