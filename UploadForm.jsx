import React, { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/documents/upload",
        formData,
      );
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed. Try again.");
    }
  };

  const containerStyle = {
    padding: "24px",
    backgroundColor: "#ebf8ff",
    border: "1px solid #90cdf4",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "24px",
  };

  const headingStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1e40af",
    marginBottom: "12px",
  };

  const inputStyle = {
    border: "1px solid #90cdf4",
    padding: "8px",
    borderRadius: "6px",
    width: "100%",
    marginBottom: "12px",
  };

  const buttonStyle = {
    backgroundColor: "#3182ce",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    width: "100%",
    marginBottom: "12px",
  };

  const messageStyle = {
    color: "#1e40af",
    textAlign: "center",
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Upload Your Document</h2>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={inputStyle}
        />
        <button onClick={handleUpload} style={buttonStyle}>
          Upload
        </button>
        {message && <p style={messageStyle}>{message}</p>}
      </div>
    </div>
  );
}
