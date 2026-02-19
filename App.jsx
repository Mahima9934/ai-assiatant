import React from "react";
import UploadForm from "./components/UploadForm";
import QueryForm from "./components/QueryForm";

function App() {
  const appStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px",
    background: "linear-gradient(to right, #d0ebff, #90cdf4)", // soft blue gradient
  };

  const headingStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "24px",
    color: "#1e40af", // dark blue
    textAlign: "center",
  };

  return (
    <div style={appStyle}>
      <h1 style={headingStyle}>AI Knowledge & Workflow Assistant</h1>
      <UploadForm />
      <QueryForm />
    </div>
  );
}

export default App;
