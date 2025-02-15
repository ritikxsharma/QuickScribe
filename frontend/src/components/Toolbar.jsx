import "../assets/css/toolbar.css";
import React, { useEffect, useState } from "react";
import { FaBold, FaHighlighter, FaItalic } from "react-icons/fa";

const Toolbar = ({ editor }) => {
  
  const [isHighlighted, setIsHighlighted] = useState(false)

  if (!editor) return null;

  useEffect(() => {
    const updateHighlightState = () => {
      setIsHighlighted(editor.isActive("highlight", { color: "orange" }))
    }
    editor.on('selectionUpdate', updateHighlightState)
    return () => editor.off("selectionUpdate", updateHighlightState)
  }, [editor])

  const handleHighlightChange = () => {

    const { from, to } = editor.state.selection
    let isAllHighlighted = true;
    
    editor.state.doc.nodesBetween(from, to, (node) => {
      if(node.isText && !node.marks.some((mark) => mark.type.name === 'highlight')){
        isAllHighlighted = false
        return false
      }
    })

    console.log(isAllHighlighted);
    

    if(isAllHighlighted){
      editor.chain().focus().unsetHighlight().setColor().run()
    }else{
      editor.chain().focus().setHighlight({ color: 'orange' }).setColor("black").run()
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
        className={isHighlighted ? 'is-active' : ''}
      >
        <FaHighlighter />
      </button>
    </div>
  );
};

export default Toolbar;
