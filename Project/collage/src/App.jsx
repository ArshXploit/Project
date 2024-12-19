import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main Page Layout
const MainPageLayout = () => {
  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('scroll') === 'about') {
      setTimeout(() => {
        document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <>
      <Header />
      <NotificationStrip />
      <CollegeBanner />
      <ButtonBox />
      <DynamicGallery />
      <PrincipalDesk />
      <ImportantLinks />
      <Footer />
    </>
  );
};

// Standalone Page Layout
const StandalonePage = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    {children}
  </div>
);

// Importing components
import Header from "./components/Header";
import NotificationStrip from "./components/NotificationStrip";
import CollegeBanner from "./components/CollegeBanner";
import ButtonBox from "./components/ButtonBox";
import DynamicGallery from "./components/DynamicGallery";
import PrincipalDesk from "./components/PrincipalDesk";
import ImportantLinks from "./components/ImportantLinks";
import Footer from "./components/Footer";
import PrivateRoute from './components/PrivateRoute';

// Standalone Components
import UserProfile from "./components/UserProfile";
import Chat from "./components/Chat";
import Graduation from "./components/Graduation";
import Contact from "./components/Contact";
import Undergrade from './components/Undergrade';

// Portal components
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";
import AdmissionFormPage from "./components/AdmissionFormPage";
import Administration from './components/administration';
import faculties from "./components/faculties";
import Alumni from "./components/Alumni";
import AdminPanel from './components/AdminPanel';

// Portal components
import ClassesAssigned from "./components/Portalcompo/ClassesAssigned";
import Grievance from "./components/Portalcompo/Grievance";
import StudentsQueries from "./components/Portalcompo/StudentsQueries";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPageLayout />} />

        <Route path="/Administration" element={<StandalonePage><Administration /></StandalonePage>} />
        {/* <Route path="/faculties" element={<StandalonePage><faculties /></StandalonePage>} /> */}
        <Route path="/Alumni" element={<StandalonePage><Alumni /></StandalonePage>} />
        <Route path="/AdminPanel" element={<StandalonePage><AdminPanel /></StandalonePage>} />
        <Route path="/Grieverance" element={<StandalonePage><Grievance /></StandalonePage>} />
        <Route
        path='/undergrade'
        element={
          <StandalonePage>
            <Undergrade />
          </StandalonePage>
        }
        />
        <Route 
          path="/user-profile" 
          element={
            <StandalonePage>
              <UserProfile />
            </StandalonePage>
          } 
        />
        <Route 
          path="/admission-form" 
          element={
            <StandalonePage>
              <AdmissionFormPage />
            </StandalonePage>
          }
          />
        <Route 
          path="/chat" 
          element={
            <StandalonePage>
              <Chat />
            </StandalonePage>
          } 
        />
        <Route 
          path="/graduation" 
          element={
            <StandalonePage>
              <Graduation />
            </StandalonePage>
          } 
        />
        <Route 
          path="/teacher-dashboard" 
          element={
            <StandalonePage>
              <TeacherDashboard />
            </StandalonePage>
          } 
        />
        <Route 
          path="/student-dashboard" 
          element={
            <StandalonePage>
              <StudentDashboard />
            </StandalonePage>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <StandalonePage>
              <Contact />
            </StandalonePage>
          } 
        />
        
      </Routes>
    </Router>
  );
}


export default App;
