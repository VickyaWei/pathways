import React, { useState } from "react";


import {
  Sidebar,
  Menu,
  MenuItem,
} from "react-pro-sidebar";

import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";


const AppSidebar = () => {
  const [menuCollapse, setMenuCollapse] = useState(false)

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <div className="sidebar">
      <Sidebar collapsed={menuCollapse}>
        <div className="pathways-logo">
          <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
        </div>

        <div className="close-menu" onClick={menuIconClick}>
          {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
        </div>
        
        <Menu iconShape="square">
          <MenuItem icon={<FiHome />}>Homepage</MenuItem>
          <MenuItem icon={<FaRegHeart />}>Bookmarks</MenuItem>
          <MenuItem icon={<RiPencilLine />}>Profiles</MenuItem>
          <MenuItem icon={<BiCog />}>Settings</MenuItem>
          <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
        </Menu>
        
      </Sidebar>
    </div>
  );
};

export default AppSidebar;

