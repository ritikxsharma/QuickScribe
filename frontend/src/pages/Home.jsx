import React, { useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { createNote } from "../api/apiClient";
import { toast } from "react-toastify";

const Home = () => {
  const [noteName, setNoteName] = useState("");
  const navigate = useNavigate();

  const handleCreateNote = async () => {
    try {
      if (!noteName.trimEnd()) {
        setError("Please enter notepad name!");
        return;
      }

      await createNote(noteName);
      navigate(`/${noteName}`);
    } catch (error) {
      toast.error("Notepad already found")
    }
  };

  return (
    <div className="home-container">
      <h2>Create a real time notepad</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="enter a unique notepad name"
          value={noteName}
          onChange={(e) => setNoteName((prev) => e.target.value)}
        />
        <button onClick={handleCreateNote}>Create</button>
      </div>
    </div>
  );
};

export default Home;
