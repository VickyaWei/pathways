import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import "./DegreeDropdown.css";

const degreeOptions = [
  { value: 'Masters', label: 'Masters' },
  { value: 'Doctorate', label: 'Doctorate' },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const DegreeDropdown = ({ onDegreeChange }) => {
  const [selectedDegrees, setSelectedDegrees] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selected = typeof value === 'string' ? value.split(',') : value;
    setSelectedDegrees(selected);
    onDegreeChange(selected);
  };

  return (
    <div className="degree-dropdown-container">
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="degree-dropdown-label">Filter by Degree Level</InputLabel>
        <Select
          labelId="degree-dropdown-label"
          id="degree-dropdown"
          multiple
          value={selectedDegrees}
          onChange={handleChange}
          input={<OutlinedInput label="Filter by Degree Level" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {degreeOptions.map((degree) => (
            <MenuItem key={degree.value} value={degree.value}>
              <Checkbox checked={selectedDegrees.indexOf(degree.value) > -1} />
              <ListItemText primary={degree.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DegreeDropdown;
