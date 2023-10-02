import React from "react";

function ErrorEl({ message }) {
  return (
    <>
      <div style={{ textAlign: "center", padding: "30px 0" }}>
        <h1>Sorry, Page not found!!!</h1>
        <h2>{message || "Please check your url?"}</h2>
      </div>
    </>
  );
}

export default ErrorEl;
