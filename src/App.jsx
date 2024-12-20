import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import RecommendationForm from './components/RecommendationForm/RecommendationForm';
import * as recommendationService from './services/recommendationService';
import * as authService from '../src/services/authService'; 
import RecommendationList from './components/recommendationList/RecommendationList';
import RecommendationDetails from './components/RecommendationDetails/recommendationDetails';



const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(authService.getUser())  
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchAllRecommendations = async () => {
      const recommendationsData = await recommendationService.index();
      setRecommendations(recommendations);
    };
    if (user) fetchAllRecommendations();
  }, [user]);
  
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
          <Route path="/recommendations" element={<RecommendationList recommendations={recommendations} /> } />
          <Route path="/recommendations/:recommendationId" element={<RecommendationDetails  /> } />

          </>
          
        ) : (

          //not protected
          <Route path="/" element={<Landing />} />
        )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path='/signin' element={<SigninForm setUser={setUser} />} />
          <Route path="/recommendations/new" element={<h1>New Recommendation</h1>} />
      </Routes>
    </>
  );
};

export default App;
