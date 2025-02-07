import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';


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
