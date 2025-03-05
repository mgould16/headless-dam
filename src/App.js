import { useState } from "react";
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
      
      // Display a styled success message instead of an alert
      const successMessage = document.createElement("div");
      successMessage.className = "fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg";
      successMessage.innerText = "✅ Image uploaded successfully!";
      document.body.appendChild(successMessage);
      
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed.");
    }
  };

  return (

<div className="flex h-screen">
  {/* Sidebar */}
  <div className="w-64 bg-gray-800 text-white p-6 flex flex-col">
    <h2 className="text-2xl font-bold mb-6">Headless DAM</h2>
    <nav className="space-y-4">
      <a href="#" className="block p-2 bg-gray-700 rounded">Dashboard</a>
      <a href="#" className="block p-2 hover:bg-gray-700 rounded">Uploads</a>
      <a href="#" className="block p-2 hover:bg-gray-700 rounded">Manage Tags</a>
      <a href="#" className="block p-2 hover:bg-gray-700 rounded">Settings</a>
    </nav>
  </div>

  {/* Main Content */}
  <div className="flex-1 p-8 bg-gray-100">
    <h1 className="text-3xl font-bold mb-6">Upload an Image</h1>

    <div className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto">
      <input 
        type="file" 
        className="mb-4 border p-2 w-full"
        onChange={(e) => setFile(e.target.files[0])} 
      />

      <input 
        type="text" 
        placeholder="Enter tags (comma separated)" 
        className="border p-2 w-full mb-4"
        onChange={(e) => setTags(e.target.value)} 
      />

      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  </div>
</div>
  );
}

export default App;