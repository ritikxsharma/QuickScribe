import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNote } from "../api/apiClient";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Editor from "../components/Editor";

const socket = io(import.meta.env.VITE_SOCKET_URL || window.location.origin, {
  transports: ["websocket"],
});

const NoteEditor = () => {
  const naviagte = useNavigate();
  const { name } = useParams();
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await getNote(name);
        setContent(data.content || "<p></p>");
      } catch (error) {
        naviagte("/");
        toast.error("No such notepad found!");
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchNote();
    }, 1500)
  }, [name]);

  if (loading) return <Loader />;

  return <Editor name={name} content={content} setContent={setContent} socket={socket} />;
};

export default NoteEditor;
