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

export const AuthedUserContext = createContext(null);


import './components/SignupForm/SignupForm.css'


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

const handleDeleteRecommendation = async (recommendationId) => {
  console.log('recommendationId', recommendationId);
  setRecommendations(recommendations.filter((recommendation) => recommendation._id !== recommendationId));
  navigate('/recommendations');
};

const handleAddComment = async (recommendationId, commentFormData) => {
  const newComment = await recommendationService.createComment(recommendationId, commentFormData);
  console.log('newComment', newComment);
  const updatedRecommendations = recommendations.map((recommendation) => {
    if (recommendation._id === recommendationId) {
      return { ...recommendation, comments: [...recommendation.comments, newComment] };
    }
    return recommendation;
  });
  setRecommendations(updatedRecommendations);
  navigate(`/recommendations`);
};

  return (
    <>
    <AuthedUserContext.Provider value={user}>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        { user ? (
        <>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/recommendations/new" element={<RecommendationForm handleAddRecommendation={handleAddRecommendation} />} />
          <Route path="/recommendations" element={<RecommendationList recommendations={recommendations} /> } />
          <Route path="/recommendations/:recommendationId" element={<RecommendationDetails handleDeleteRecommendation={handleDeleteRecommendation} />} />
          <Route path="/recommendations/:recommendationId/comments" element={<RecommendationDetails handleAddComment={handleAddComment} />} />
        </>
          
        ) : (

          //not protected
          <Route path="/" element={<Landing />} />
        )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path='/signin' element={<SigninForm setUser={setUser} />} />
          <Route path="/recommendations/new" element={<h1>New Recommendation</h1>} />
      </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
