// App.js

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Popups from "./Users/Popups";
import Poppages from "./Users/Poppages";
import Login from "./Users/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import your page components
import Homepage from "./pages/Homepage";
import Bookmarks from "./pages/Bookmarks";
import Profiles from "./pages/Profiles";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";
import SideBar from "./components/Sidebar";
import "./App.css";
import MentorPal from "./pages/MentorPal";
import KeywordDropdown from "./components/KeywordDropdown";



function App() {
  return (
    <MentorPal /> 
  );
}
// <Login />
// <div className="App">
//   <Header />
//   <div className="content-wrapper">
//     <Sidebar />
//   </div>
// </div>
//   );
// }

// const App = () => {
// const [sidebarIsOpen, setSidebarOpen] = useState(true);
// const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

// return (
//   <Router>
//     <div className="App wrapper">
//       <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
//       <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
//     </div>
//   </Router>
// );
// };

export default App;
