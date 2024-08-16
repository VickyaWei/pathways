import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import './SubfieldDropdown.css';

const subfields = [
  'Brain Science and Cognitive Psychology',
  'Climate and Environmental Psychology',
  'Clinical Psychology',
  'Counseling Psychology',
  'Developmental Psychology',
  'Experimental Psychology',
  'Forensic and Public Service Psychology',
  'Health Psychology',
  'Human Factors and Engineering Psychology',
  'Industrial and Organizational Psychology',
  'Psychology of Teaching and Learning',
  'Quantitative Psychology',
  'Rehabilitation Psychology',
  'Social Psychology',
  'Sport and Performance Psychology',
];

const SubfieldDropdown = ({ onSubfieldChange }) => {
  const [selectedSubfields, setSelectedSubfields] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const values = typeof value === 'string' ? value.split(',') : value;
    setSelectedSubfields(values);
    onSubfieldChange(values);
  };

  return (
    <FormControl sx={{ m: 1, width: 400 }}>
      <InputLabel id="subfield-dropdown-label">Filter by Subfield</InputLabel>
      <Select
        labelId="subfield-dropdown-label"
        id="subfield-dropdown"
        multiple
        value={selectedSubfields}
        onChange={handleChange}
        input={<OutlinedInput label="Filter by Subfield" />}
        renderValue={(selected) => selected.join(', ')}
      >
        {subfields.map((subfield) => (
          <MenuItem key={subfield} value={subfield}>
            <Checkbox checked={selectedSubfields.indexOf(subfield) > -1} />
            <ListItemText primary={subfield} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SubfieldDropdown;
