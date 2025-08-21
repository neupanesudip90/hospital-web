import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)} // go back one page in history
      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
    >
      ← Back
    </button>
  );
};

export default BackButton;
