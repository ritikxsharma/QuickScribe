import "../assets/css/toolbar.css";
import React from "react";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaHighlighter,
  FaItalic,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="toolbar">
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        <FaBold />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>
        <FaItalic />
      </button>
      <button onClick={() => editor.chain().focus().toggleHighlight().run()}>
        <FaHighlighter />
      </button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <FaUnderline />
      </button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()}>
        <FaStrikethrough />
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>
        <FaAlignLeft />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <FaAlignCenter />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <FaAlignRight />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <FaUndo/>
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <FaRedo/>
      </button>
    </div>
  );
};

export default Toolbar;
