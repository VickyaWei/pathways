import React, { useState } from 'react';
import Popups from '../Users/Popups';

const PopPages = () => {
  const [currentPopup, setCurrentPopup] = useState(0);

  const nextPopup = () => {
    setCurrentPopup((prev) => prev + 1);
  };

  const previousPopup = () => {
    setCurrentPopup((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const popupsContent = [
    { title: "Popup 1", message: "This is the first popup." },
    { title: "Popup 2", message: "This is the second popup." },
    { title: "Popup 3", message: "This is the third popup." },
  ];

  return (
    <div className="PopPages">
      {currentPopup < popupsContent.length && (
        <Popups
          title={popupsContent[currentPopup].title}
          message={popupsContent[currentPopup].message}
          onNext={nextPopup}
          onPrevious={previousPopup}
          showPrevious={currentPopup > 0} // Only show previous arrow if not on the first popup
        />
      )}
    </div>
  );
};

export default PopPages;
