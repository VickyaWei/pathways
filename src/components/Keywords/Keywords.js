import React from "react";
import MultilevelDropdown from "react-multilevel-dropdown";
import "./Keywords.css";

const Keywords = ({ selectedKeywords, handleCheckboxChange }) => {
  const keywordItems = [
    {
      title: "Select Keywords",
      id: "1",
      children: [
        {
          title: "Gender & Sexuality",
          id: "gender",
          children: [
            { title: "Man", id: "man" },
            { title: "Woman", id: "woman" },
            { title: "Trans", id: "trans" },
            { title: "Non-binary", id: "non-binary" },
            { title: "Gender-fluid", id: "gender-fluid" },
            { title: "LGBTQ++", id: "lgbtq" },
          ],
        },
        {
          title: "Age",
          id: "age",
          children: [
            { title: "<20s", id: "<20s" },
            { title: "20s", id: "20s" },
            { title: "30s", id: "30s" },
            { title: "40s", id: "40s" },
            { title: "50s", id: "50s" },
            { title: "60s", id: "60s" },
            { title: "70s", id: "70s" },
            { title: "80s", id: "80s" },
          ],
        },
        {
          title: "Ethnicity",
          id: "ethnicity",
          children: [
            { title: "Asian", id: "asian" },
            { title: "Black/African American", id: "black/african american" },
            { title: "Hispanic/Latino", id: "hispanic/latino" },
            { title: "Native American/Alaskan", id: "native american/alaskan" },
            { title: "Pacific Islander", id: "pacific islander" },
            { title: "White", id: "white" },
          ],
        },
        {
          title: "Education",
          id: "education",
          children: [
            { title: "First Generation", id: "first generation" },
            { title: "Community College", id: "community college" },
            { title: "Graduate School", id: "graduate school" },
            { title: "Bachelors", id: "bachelors" },
            { title: "Masters", id: "masters" },
            { title: "Doctorate", id: "doctorate" },
            { title: "Technical Program", id: "technical program" },
            { title: "Professional Degree", id: "professional degree" },
          ],
        },
      ],
    },
  ];


  const renderDropdownItems = (items) => {
    return items.map((item) => (
      <MultilevelDropdown.Item key={item.id}>
        {item.title}
        {item.children && item.children.length > 0 && (
          <MultilevelDropdown.Submenu
            position="right"
            style={{ width: "200px" }}
          >
            {item.children.map((submenu) => (
              <div key={submenu.id}>
                <label className="submenu-item">
                  <input
                    type="checkbox"
                    checked={selectedKeywords.includes(submenu.id)}
                    onChange={() => handleCheckboxChange(submenu.id)}
                  />
                  <span>{submenu.title}</span>
                </label>
              </div>
            ))}
          </MultilevelDropdown.Submenu>
        )}
      </MultilevelDropdown.Item>
    ));
  };

  return (
    <div className="KeywordDropdown">
      {keywordItems.map((menu) => (
        <MultilevelDropdown
          key={menu.id}
          title={menu.title}
          menuClassName="dropdown-item"
        >
          {renderDropdownItems(menu.children)}
        </MultilevelDropdown>
      ))}
    </div>
  );
};

export default Keywords;
