import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNote, updateNote } from "../api/apiClient";
import { io } from "socket.io-client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from '@tiptap/extension-highlight'
import Color from '@tiptap/extension-color'
import TextStyle from "@tiptap/extension-text-style";

import { toast } from "react-toastify";

const socket = io(import.meta.env.VITE_SOCKET_URL || window.location.origin, {
  transports: ["websocket"],
});

const NoteEditor = () => {
  const naviagte = useNavigate();
  const { name } = useParams();
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true)

  const debounce = (callback, delay = 500) => {
    let timeout;
    return (...args) => {
      console.log(...args);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  const debouncedUpdate = useCallback(
    debounce((editor) => {
      const newText = editor.getHTML().trim();
      setContent(newText);
      socket.emit("edit-note", { name, content: newText });
      updateNote(name, newText);
    }, 800),
    [name]
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextStyle,
      Color,
      Placeholder.configure({
        placeholder: "Click here to start Writing...",
        emptyEditorClass: "is-empty"
      }),
    ],
    content: "",
    parseOptions: {
      preserveWhitespace: "full",
    },
    onUpdate: ({ editor }) => debouncedUpdate(editor),
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await getNote(name);

        setContent(data.content);
        if (editor) {
          setTimeout(() => {
            editor.commands.setContent(data.content, false, {
              preserveWhitespace: "full",
            });
          }, 10);
        }
        setContent(data.content || "<p></p>");
      } catch (error) {
        naviagte("/");
        toast.error("No such notepad found!");
      }
    };

    if (editor) {
      fetchNote();
    }
  }, [name, editor]);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    socket.on("update-note", (data) => {
      if (data.name === name && editor) {
        setContent(data.content);
        editor.commands.setContent(data.content, false, {
          preserveWhitespace: "full",
        });
      }
    });

    return () => {
      clearTimeout()
      socket.off("update-note")
    };
  }, [name]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  if (!editor || loading) {
    return <h2>Loading editor...</h2>;
  }

  return (
    <div className="editor-container">
      <button className="copy-button" onClick={copyToClipboard}>
        {copied ? "Copied!" : "Copy URL"}
      </button>
      <EditorContent className="tiptap" editor={editor} />
    </div>
  );
};

export default NoteEditor;
