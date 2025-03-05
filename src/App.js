import { useState, useEffect } from "react";
import './App.css';
import backgroundImage from "./assets/background-image.jpg"; // Add your local background image

function App() {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/vercel-headless/resources/image`
      );
      const data = await response.json();
      setImages(data.resources);
    } catch (error) {
      console.error("Failed to fetch images", error);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vercel"); // Replace with actual preset
    
    if (tags.trim() !== "") {
      formData.append("tags", tags.replace(/\s*,\s*/g, ","));
    }

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/vercel-headless/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImages([data, ...images]); // Add new image to grid
      console.log("Upload successful!", data);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div className="flex h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
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
      <div className="flex-1 p-8">
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

        {/* Image Gallery */}
        <div className="grid grid-cols-4 gap-4 mt-8">
          {images.map((image) => (
            <div key={image.public_id} className="bg-white p-4 rounded shadow-lg">
              <img src={image.secure_url} alt={image.public_id} className="w-full h-auto rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;