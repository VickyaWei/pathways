import React from 'react'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'; 

const Popups = ({ title, message, onNext, onPrevious, showPrevious  }) => {
  return (
    <div className='popupBackground'>
      <div className='popupContainer'>
        <div className='title'>
          <h1>{title}</h1>
        </div>

        <div className='body'>
          <p>{message}</p>
        </div>  
        <div className='footer'>
          {showPrevious && <FaArrowLeft className="arrowButton" onClick={onPrevious} />}
          <FaArrowRight className="arrowButton" onClick={onNext} />
        </div>       
      </div>
    </div>
  )
}

export default Popups