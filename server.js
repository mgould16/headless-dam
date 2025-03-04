const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const crypto = require("crypto");
const axios = require("axios");


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

app.post("/upload", async (req, res) => {
  try {
    const { file } = req.body;

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = crypto
      .createHash("sha1")
      .update(`timestamp=${timestamp}${CLOUDINARY_API_SECRET}`)
      .digest("hex");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("timestamp", timestamp);
    formData.append("api_key", CLOUDINARY_API_KEY);
    formData.append("signature", signature);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

