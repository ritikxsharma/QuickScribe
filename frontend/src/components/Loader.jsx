import '../assets/css/loader.css'
import React from 'react'

const Loader = ({ text }) => {
  return (
    <div className='loader-container'>
      <div className="spinner" />
      <p className='loading-text'>{text}</p>
    </div>
  )
}

export default Loader