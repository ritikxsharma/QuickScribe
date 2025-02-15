import '../assets/css/loader.css'
import React from 'react'

const Loader = () => {
  return (
    <div className='loader-container'>
      <div className="spinner" />
      <p className='loading-text'>Loading Editor</p>
    </div>
  )
}

export default Loader