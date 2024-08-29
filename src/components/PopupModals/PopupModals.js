import React, { useState } from "react";
import Joyride from "react-joyride";
import "./PopupModals.css";

const PopupModals = () => {
  const [run, setRun] = useState(true);

  const steps = [
    {
      target: "body", 
      content: (
        <>
          Welcome to the recommendations page!
          <br />
          Here, you can browse resources that will help you continue planning
          your career.
        </>
      ),
      placement: "center", // Centered placement
    },
    {
      target: ".sidebar .top_section", // Selector for the sidebar top section
      content: (
        <>
          Here, you can find the menu.
          <br /> Click here to expand or collapse it.
        </>
      ),
      placement: "bottom", // Tooltip below the sidebar top section
    },
    {
      target: ".tile .bookmark-button", 
      content:(
        <>
         This is the bookmark icon.
         <br /> You can click on it to bookmark a resource.</>
      )
       ,
      placement: "right", 
    },
    {
      target: ".sidebar .link:nth-child(2) .icon", 
      content: "Click here to view your bookmarked resources.",
      placement: "right", 
    },
    {
      target: ".subhead-option", 
      content:
        "You can click on these tabs to browse different types of resources.",
      placement: "bottom", 
    },
  ];

  return (
    <div>
      <Joyride
        steps={steps}
        run={run}
        continuous={true}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        styles={{
          options: {
            arrowColor: "#084b8a",
            backgroundColor: "#084b8a",
            textColor: "#fff",
            overlayColor: "rgba(0, 0, 0, 0.5)",
            primaryColor: "#084b8a",
          },
        }}
        callback={(data) => {
          const { status } = data;
          if (status === "finished") {
            setRun(false);
          }
        }}
        disableScrolling={true}
      />
    </div>
  );
};

export default PopupModals;
