import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import RecommenderPage from "./pages/RecommenderPage/RecommenderPage";
import MentorPal from "./pages/Mentorpal/MentorPal";
import Transition from "./pages/Transition/Transition";
import { ContentPage } from "./pages/ContentPage/ContentPage";
import Login from "./pages/Login/Login";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5001");
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [user, setUser] = useState(null); // Track logged-in user

  const handleLoginSuccess = (userObject) => {
    setUser(userObject);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user; // Check if user is authenticated

  return (
    // <Router>
    //   <Routes>
    //     {/* Public Login Route */}
    //     <Route
    //       path="/login"
    //       element={isAuthenticated ? <Navigate to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />}
    //     />

    //     {/* Protected Routes */}
    //     <Route
    //       path="/"
    //       element={isAuthenticated ? <ContentPage onLogout={handleLogout} /> : <Navigate to="/login" />}
    //     />
    //     <Route
    //       path="/mentorpal"
    //       element={isAuthenticated ? <MentorPal /> : <Navigate to="/login" />}
    //     />
    //     <Route
    //       path="/transition"
    //       element={isAuthenticated ? <Transition /> : <Navigate to="/login" />}
    //     />
    //     <Route
    //       path="/recommenderpage/*"
    //       element={isAuthenticated ? <RecommenderPage /> : <Navigate to="/login" />}
    //     />
    //   </Routes>
    // </Router>
    <Router>
      <Routes>
        {/* Public Login Route */}
        {/* <Route
          path="/login"
          element={
            
              <Navigate to="/" />
          }
        /> */}

        {/* Protected Routes */}
        <Route path="/" element={<ContentPage onLogout={handleLogout} />} />
        <Route path="/mentorpal" element={<MentorPal />} />
        <Route path="/transition" element={<Transition />} />
        <Route path="/recommenderpage/*" element={<RecommenderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
