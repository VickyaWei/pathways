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
    { title: "Welcome to Psychology Pathways!", 
      message: "This Psychology Pathways portal consists of two main parts. In the first part, you can select and engage in conversations with mentor(s) or mentor panel(s) that align with your interests. In the second part, you will discover resources tailored to your needs.", 
      image: './images/mentorpanel.jpg'
    },
    { title: "What do you want to ask a mentor?", 
      message: "You have the opportunity to engage directly with experienced mentors who are here to help guide you on your career path. Whether you have questions about specific fields within psychology, career advice, our mentors are available to provide insights and support.",
      image: './images/mentor.jpg'
    },    
    { title: "Ask any question", 
      // leftNote: "Type in the questions",
      message: "Feel free to ask the mentor any questions you have!  If you are participating in our research study, you will be asked to spend 30 minutes interacting with mentor(s).",
      // rightNote: "Point-and-Click any questions you what to ask",
      image: './images/mentorpal_intro.jpg'
    },
    { title: "Personalized recommendations ", 
      message: "After you finish chatting with mentor(s), the Pathways portal will provide personalized resources based on the questions you asked mentor(s), to help plan the next steps in your career exploration.",
      addition: "Remember, if you are participating in the research study, you will want to go finish the rest of the Qualtrics survey after you browse the recommendations.",
      image: './images/mentorpal_intro.jpg' 
    },
  ];

  return (
    <div className="PopPages">
      {currentPopup < popupsContent.length && (
        <Popups
          title={popupsContent[currentPopup].title}
          message={popupsContent[currentPopup].message}
          leftNote={popupsContent[currentPopup].leftNote}
          rightNote={popupsContent[currentPopup].rightNote}
          image={popupsContent[currentPopup].image}
          addition={popupsContent[currentPopup].addition}
          onNext={nextPopup}
          onPrevious={previousPopup}
          showPrevious={currentPopup > 0} // Only show previous arrow if not on the first popup
          currentPopup={currentPopup}
          totalPopups={popupsContent.length}
        />
      )}
    </div>
  );
};

export default PopPages;
