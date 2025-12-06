import React, { useState } from "react";

function App() {
  const [searchName, setSearchName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [uploadName, setUploadName] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [message, setMessage] = useState("");

  const backend = "http://localhost:3000";  // your backend server

  const handleSearch = async () => {
    if (!searchName) {
      alert("Please type a name (tom, jerry, dog)");
      return;
    }

    try {
      const res = await fetch(`${backend}/api/getImage?name=${searchName}`);
      const data = await res.json();

      if (data.url) {
        setImageUrl(backend + data.url);
      } else {
        alert("Image not found");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching image");
    }
  };

  const handleUpload = async () => {
    if (!uploadName) {
      alert("Please type a name (tom, jerry, dog)");
      return;
    }
    if (!uploadFile) {
      alert("Please choose a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", uploadFile);

    try {
      const res = await fetch(`${backend}/api/upload?name=${uploadName}`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      setMessage(data.message || "Upload complete!");

      if (uploadName === searchName) {
        setImageUrl(`${backend}/${uploadName}.jpg?ts=${Date.now()}`);
      }

    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Image Search & Upload</h1>

      <h2>Search Image</h2>

      <input
        value={searchName}
        onChange={(e
