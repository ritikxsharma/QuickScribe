import React, { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNote } from "../api/apiClient";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const Editor = lazy(() => import("../components/Editor"));

const socket = io(import.meta.env.VITE_SOCKET_URL || window.location.origin, {
  transports: ["websocket"],
});

const NoteEditor = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await getNote(name);
        setContent(data.content || "<p></p>");
      } catch (error) {
        navigate("/");
        toast.error("No such notepad found!");
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchNote();
    }, 1500);
  }, [name]);

  if(loading) return <Loader text="Finding Notepad.." />

  return (
    <Suspense fallback={<Loader text="Loading Editor..." />}>
      <Editor
        name={name}
        content={content}
        setContent={setContent}
        socket={socket}
      />
    </Suspense>
  );
};

export default NoteEditor;
