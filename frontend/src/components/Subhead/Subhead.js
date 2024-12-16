import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Subhead.css";

const Subhead = ({ isSidebarOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
    className={`subhead-container ${isSidebarOpen ? 'md:left-64' : 'left-0'}`}
    >
      <Link
        to="/recommenderpage/get-research-experience"
        className={`subhead-option ${
          currentPath === "/recommenderpage/get-research-experience" ? "active" : ""
        }`}
      >
        Get Research Experience
      </Link>
      <Link
        to="/recommenderpage/explore-careers"
        className={`subhead-option ${
          currentPath === "/recommenderpage/explore-careers" ? "active" : ""
        }`}
      >
        Explore Careers
      </Link>
      <Link
        to="/recommenderpage/find-graduate-schools"
        className={`subhead-option ${
          currentPath === "/recommenderpage/find-graduate-schools" ? "active" : ""
        }`}
      >
        Find Graduate Schools
      </Link>
      <Link
        to="/recommenderpage/talk-to-an-expert"
        className={`subhead-option ${
          currentPath === "/recommenderpage/talk-to-an-expert" ? "active" : ""
        }`}
      >
        Talk to an Expert
      </Link>
      <Link
        to="/recommenderpage/find-internships"
        className={`subhead-option ${
          currentPath === "/recommenderpage/find-internships" ? "active" : ""
        }`}
      >
        Find Internships
      </Link>
    </div>
  );
};
export default Subhead;