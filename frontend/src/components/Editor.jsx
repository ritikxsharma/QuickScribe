import '../assets/css/editor.css'
import React, { useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { updateNote } from "../api/apiClient";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-text-style"
import { FaCheckCircle, FaCopy } from "react-icons/fa";
import Toolbar from './Toolbar';

const Editor = ({ name, content, setContent, socket }) => {
  
  const [copied, setCopied] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle.configure({ types: ['textStyle'] }),
      Highlight.configure({ multicolor: true }),
      Color,
      Underline,
      Placeholder.configure({
        placeholder: "Click here to start writing...",
        emptyEditorClass: "is-empty",
      })
    ],
    content,
    parseOptions:{
      preserveWhitespace: "full"
    },
    onUpdate: ({editor}) => debounceUpdateNote(editor)
  })

  const debounce = (callback, delay = 500) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  const debounceUpdateNote = useCallback(
    debounce((editor) => {
      const newText = editor.getHTML().trim()
      setContent(newText)
      socket.emit("edit-note", { name, content: newText })
      updateNote(name, newText)
    }, 800),
    [name]
  )

  useEffect(() => {
    socket.on("update-note", (data) => {
      if(data.name === name && editor){
        editor.commands.setContent(data.content, false, {
          preserveWhitespace: "full"
        })
      }
    })
    return () => {
      socket.off("update-note")
    }
  }, [name, editor])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    .then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 800)
    })
  }

  return (
    <div className="editor-container">
      <Toolbar editor={editor} />
      <button className="copy-btn" onClick={copyToClipboard}>
        { copied ? <FaCheckCircle/> : <FaCopy/>}
      </button>
      <EditorContent className="tiptap" editor={editor}/>
    </div>
  );
};

export default Editor;
