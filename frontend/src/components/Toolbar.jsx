import "../assets/css/toolbar.css";
import React, { useState } from "react";
import { FaBold, FaHighlighter, FaItalic } from "react-icons/fa";

const Toolbar = ({ editor }) => {
    
  if (!editor) return null;

  const handleHighlightChange = () => {
    
    const isAllHighlighted = editor.isActive("highlight", { color: "orange" });
    if (isAllHighlighted) {
      editor.chain().focus().unsetHighlight().setColor("#fff").run();
    } else {
      editor
        .chain()
        .focus()
        .setHighlight({ color: "orange" })
        .setColor("#000000")
        .run();
    }
  };

  return (
    <div className="toolbar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <FaItalic />
      </button>

      <button
        onClick={() => handleHighlightChange()}
        disabled={!editor.can().chain().focus().setHighlight().run()}
      >
        <FaHighlighter />
      </button>
    </div>
  );
};

export default Toolbar;
