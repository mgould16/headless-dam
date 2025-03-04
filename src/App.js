import { useState } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vercel"); // Replace with actual preset

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/vercel-headless/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      
      console.log("Upload successful!", data);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {/* Upload Section */}
      <div className="flex flex-col items-center justify-center p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Upload an Image</h1>
        
        <input 
          type="file" 
          className="mb-4 border p-2"
          onChange={(e) => setFile(e.target.files[0])} 
        />

        <input 
          type="text" 
          placeholder="Enter tags (comma separated)" 
          className="border p-2 w-80 mb-4"
          onChange={(e) => setTags(e.target.value)} 
        />

        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default App;
