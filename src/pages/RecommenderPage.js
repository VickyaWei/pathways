import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Subhead from '../components/Subhead';
import GetResearchExperience from './GetResearchExperience';
import ExploreCareers from './ExploreCareers';
import FindGraduateSchools from './FindGraduateSchools';
import TalkToAnExpert from './TalkToAnExpert';
import FindInternships from './FindInternships';


export const RecommenderPage = () => {
  return (
    <Router>
      <div>
        <Header />
        <Subhead />
        <Routes>
          <Route path="/get-research-experience" element={<GetResearchExperience />} />
          <Route path="/explore-careers" element={<ExploreCareers />} />
          <Route path="/find-graduate-schools" element={<FindGraduateSchools />} />
          <Route path="/talk-to-an-expert" element={<TalkToAnExpert />} />
          <Route path="/find-internships" element={<FindInternships />} />
        </Routes>
      </div>
    </Router>
  )
}
