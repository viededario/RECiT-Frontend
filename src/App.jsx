import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; // import the authservice
import RecommendationForm from './components/RecommendationForm/RecommendationForm';
import * as recommendationService from './services/recommendationService';



const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(authService.getUser())
  const [recommendations, setRecommendations] = useState([]);
  
  
  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

const handleAddRecommendation = async (recommendationFormData) => {
  const newRecommendation = await recommendationService.create(recommendationFormData);
  setRecommendations([...recommendations, newRecommendation]);
  navigate('/recommendations');
};


  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        { user ? (
        <>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/recommendations/new" element={<RecommendationForm handleAddRecommendation={handleAddRecommendation} />} />
        </>
        ) : (
          <Route path="/" element={<Landing />} />
        )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path='/signin' element={<SigninForm setUser={setUser} />} />
      </Routes>
    </>
  );
};

export default App;
