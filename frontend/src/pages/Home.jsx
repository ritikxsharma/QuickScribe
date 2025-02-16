import "../assets/css/homepage.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNote } from "../api/apiClient";
import { toast } from "react-toastify";
import { FaPencilAlt } from "react-icons/fa";

const Home = () => {
  const [noteName, setNoteName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleCreateNote = async () => {
    if (!noteName.trimEnd()) {
      toast.error("Please enter notepad name!");
      return;
    }

    try {
      setIsCreating(true);
      await createNote(noteName);
      setTimeout(() => {
        navigate(`/${noteName}`);
      }, 800);
    } catch (error) {
      setTimeout(() => {
        toast.error("Name already take. You can do better.");
        setIsCreating(false);
      }, 800);
    }
  };

  return (
    <div className="home-container">
      <h1 className="title">QuickScribe</h1>
      <p className="tagline">Fast. Simple. Real-Time</p>
      <div className="input-group">
        <input
          type="text"
          placeholder="enter a unique notepad name"
          value={noteName}
          onChange={(e) => setNoteName(e.target.value)}
        />
        <button
          className="create-btn"
          onClick={handleCreateNote}
          disabled={isCreating}
        >
          <FaPencilAlt className="icon" />
          {isCreating ? "Creating..." : "Start Writing"}
        </button>
      </div>
    </div>
  );
};

export default Home;
