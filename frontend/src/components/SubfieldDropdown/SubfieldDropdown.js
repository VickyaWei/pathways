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
    <FormControl
      sx={{
        m: 1,
        width: {
          xs: '150px',
          sm: '300px',
          md: '400px',
        },
        '& .MuiOutlinedInput-root': {
          height: { xs: '30px', sm: '50px' },
          fontSize: { xs: '11px', sm: '12px' },
        },
        '& .MuiInputLabel-root': {
          fontSize: { xs: '11px', sm: '12px' },
          transform: 'translate(14px, 8px) scale(1)',
          '&.Mui-focused, &.MuiFormLabel-filled': {
            transform: 'translate(14px, -9px) scale(0.75)',
          }
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderRadius: '4px',
        },
        '& .MuiSelect-select': {
          fontSize: { xs: '11px', sm: '12px' },
          lineHeight: '1.2',
        },
        '& .MuiMenuItem-root': {
          fontSize: { xs: '5px', md: '12px' },
          minHeight: '32px',
        },
        '& .MuiListItemText-primary': {
          fontSize: { xs: '11px', md: '30px' },
        },
        '& .MuiCheckbox-root': {
          padding: '4px',
        }
      }}
    >
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