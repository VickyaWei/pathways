import React from 'react';
import Select from 'react-select';
import './SubfieldDropdown.css';

const subfields = [
  { value: 'Brain Science and Cognitive Psychology', label: 'Brain Science and Cognitive Psychology' },
  { value: 'Climate and Environmental Psychology', label: 'Climate and Environmental Psychology' },
  { value: 'Clinical Psychology', label: 'Clinical Psychology' },
  { value: 'Counseling Psychology', label: 'Counseling Psychology' },
  { value: 'Developmental Psychology', label: 'Developmental Psychology' },
  { value: 'Experimental Psychology', label: 'Experimental Psychology' },
  { value: 'Forensic and Public Service Psychology', label: 'Forensic and Public Service Psychology' },
  { value: 'Health Psychology', label: 'Health Psychology' },
  { value: 'Human Factors and Engineering Psychology', label: 'Human Factors and Engineering Psychology' },
  { value: 'Industrial and Organizational Psychology', label: 'Industrial and Organizational Psychology' },
  { value: 'Psychology of Teaching and Learning', label: 'Psychology of Teaching and Learning' },
  { value: 'Quantitative Psychology', label: 'Quantitative Psychology' },
  { value: 'Rehabilitation Psychology', label: 'Rehabilitation Psychology' },
  { value: 'Social Psychology', label: 'Social Psychology' },
  { value: 'Sport and Performance Psychology', label: 'Sport and Performance Psychology' },
];

const SubfieldDropdown = ({ onSubfieldChange }) => {

  const handleChange = (selectedOptions) => {
    // selectedOptions is an array of selected items
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    onSubfieldChange(values);
  };

  return (
    <div className="dropdown-container">
      <Select
        isMulti
        options={subfields}
        onChange={handleChange}
        className="subfield-select"
        placeholder="--Filter by Subfield--"
      />
    </div>
  );
};

export default SubfieldDropdown;
