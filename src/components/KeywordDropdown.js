import React, { useState } from "react";
import MultilevelDropdown from "react-multilevel-dropdown";


const KeywordDropdown = () => {
  const keywordItems = [
    {
      title: "Select Keywords",
      id: "1",
      children: [
        {
          title: "Gender & Sexuality",
          id: "one-one",
          children: [
            { title: "Man", id: "one-one-one" },
            { title: "Woman", id: "one-one-two" },
            { title: "Trans", id: "one-one-three" },
            { title: "Non-binary", id: "one-one-four" },
            { title: "Gender-fluid", id: "one-one-five" },
            { title: "LGBTQ++", id: "one-one-six" },
          ],
        },
        {
          title: "Age",
          id: "one-two",
          children: [
            { title: "<20s", id: "one-two-one" },
            { title: "20s", id: "one-two-two" },
            { title: "30s", id: "one-two-three" },
            { title: "40s", id: "one-two-four" },
            { title: "50s", id: "one-two-five" },
            { title: "60s", id: "one-two-six" },
            { title: "70s", id: "one-two-seven" },
            { title: "80s", id: "one-two-eight" },
          ],
        },
        {
          title: "Ethnicity",
          id: "one-three",
          children: [
            { title: "Asian", id: "one-three-one" },
            { title: "Black/African American", id: "one-three-two" },
            { title: "Hispanic/Latino", id: "one-three-three" },
            { title: "Native American/Alaskan", id: "one-three-four" },
            { title: "Pacific Islander", id: "one-three-five" },
            { title: "White", id: "one-three-six" },
          ],
        },
        {
          title: "Education",
          id: "one-four",
          children: [
            { title: "First Generation", id: "one-four-one" },
            { title: "Community College", id: "one-four-two" },
            { title: "Graduate School", id: "one-four-three" },
            { title: "Bachelors", id: "one-four-four" },
            { title: "Masters", id: "one-four-five" },
            { title: "Doctorate", id: "one-four-six" },
            { title: "Technical Program", id: "one-four-seven" },
            { title: "Professional Degree", id: "one-four-eight" },
          ],
        },
      ],
    },
  ];

  // State to track selected items
  const [selectedItems, setSelectedItems] = useState([]);

  // Function to handle checkbox toggle
  const handleCheckboxToggle = (itemId) => {
    const currentIndex = selectedItems.indexOf(itemId);
    const newSelectedItems = [...selectedItems];

    if (currentIndex === -1) {
      newSelectedItems.push(itemId);
    } else {
      newSelectedItems.splice(currentIndex, 1);
    }

    setSelectedItems(newSelectedItems);
  };

  const renderDropdownItems = (items) => {
    return items.map((item) => (
      <MultilevelDropdown.Item key={item.id}>
        {item.title}
        {item.children && item.children.length > 0 && (
          <MultilevelDropdown.Submenu position="right" style = {{width: '200px'}}>
            {item.children.map((submenu) => (
              <div key={submenu.id}>
                <label className="submenu-item">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(submenu.id)}
                    onChange={() => handleCheckboxToggle(submenu.id)}
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

export default KeywordDropdown;
