import React, { useState } from 'react';
import Modal from 'react-modal';
import './PopupModals.css'; // Import the CSS file

// Set the root element for accessibility
Modal.setAppElement('#root');

const PopupModals = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true); // Start with the modal open
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      content: 'This is the personalized resource.',
      position: { top: '32%', left: '20%' },
      className: 'modal-step-0',
    },
    {
      content: 'You can bookmark the resources',
      position: { top: '85%', left: '30%' },
      className: 'modal-step-1',
    },
    {
      content: 'You can find the bookmarked resources in the sidebar.',
      position: { top: '20%', left: '15%' },
      className: 'modal-step-2',
    },
    {
      content: 'This is the personalized resource.',
      position: { top: '32%', left: '80%' },
      className: 'modal-step-3',
    },
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setModalIsOpen(false); // Close the modal when the tour is finished
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            ...steps[currentStep].position, 
            color:'white',
          },
        }}
        className="custom-modal"
        overlayClassName="custom-overlay"
        contentLabel="Example Modal"
      >
        <h2 className='modal-content'>{steps[currentStep].content}</h2>
        <button className="next-button" onClick={handleNextStep}>
          {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
        </button>
      </Modal>
    </div>
  );
};

export default PopupModals;
