import React, { useState } from "react";
import axios from "axios";

export default function QueryForm() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQuery = async () => {
    if (!query) return;
    try {
      const res = await axios.post("http://localhost:5000/query", { query });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Failed to get answer. Try again.");
    }
  };

  const containerStyle = {
    padding: "24px",
    backgroundColor: "#d0ebff",
    border: "1px solid #90cdf4",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const inputStyle = {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #90cdf4",
    width: "100%",
  };

  const buttonStyle = {
    backgroundColor: "#3182ce",
    color: "white",
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
  };

  const answerStyle = {
    backgroundColor: "#ebf8ff",
    borderLeft: "4px solid #3182ce",
    padding: "8px",
    borderRadius: "6px",
    color: "#1e40af",
  };

  const headingStyle = {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1e40af",
    textAlign: "center",
    marginBottom: "12px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h2 style={headingStyle}>AI Assistant</h2>
      <div style={containerStyle}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search something..."
          style={inputStyle}
        />
        <button onClick={handleQuery} style={buttonStyle}>
          Ask AI
        </button>
        {answer && <div style={answerStyle}>{answer}</div>}
      </div>
    </div>
  );
}
