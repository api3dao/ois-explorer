import logo from './logo.svg';
import './App.css';
import { Upload } from "./Upload";
import React from 'react';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Upload>
        <button>Upload Files</button>
      </Upload>
      </header>
    </div>
  );
}

export default App;
