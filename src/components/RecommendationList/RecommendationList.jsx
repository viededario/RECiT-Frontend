import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as recommendationService from '../../services/recommendationService';
import './RecommendationList.css';

const RecommendationList = ({ recommendations, handleLikeRecommendation, handleDislikeRecommendation }) => {
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleLikeClick = (event, recommendationId) => {
    event.preventDefault();
    handleLikeRecommendation(recommendationId);
  };

  const handleDislikeClick = (event, recommendationId) => {
    event.preventDefault();
    handleDislikeRecommendation(recommendationId);
  };

  const handleFavoriteClick = async (event, recommendationId) => {
    event.preventDefault();
    const isCurrentlyFavorite = favorites[recommendationId];

    try {
      if (isCurrentlyFavorite) {
        await recommendationService.handleRemoveFavorite(recommendationId);
      } else {
        await recommendationService.handleAddFavorite(recommendationId);
      }

      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [recommendationId]: !isCurrentlyFavorite,
      }));
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  return (
    <main>
      {recommendations.map((recommendation) => (
        <div key={recommendation._id} className='recommendation-content'>
          <Link to={`/recommendations/${recommendation._id}`}>
            <article>
              <header>
                <h2>{recommendation.title}</h2>
                <p>
                  {recommendation.author?.username} posted on{' '}
                  {new Date(recommendation.createdAt).toLocaleDateString()}
                </p>
                <button onClick={(e) => handleLikeClick(e, recommendation._id)}>
                  🔥 {recommendation.likes.length}
                </button>
                <button onClick={(e) => handleDislikeClick(e, recommendation._id)}>
                  💩 {recommendation.dislikes.length}
                </button>
                <button
                  onClick={(e) => handleFavoriteClick(e, recommendation._id)}
                  className={favorites[recommendation._id] ? 'fav-button active' : 'fav-button'}
                >
                  {favorites[recommendation._id] ? 'Remove' : 'Fav'}
                </button>
              </header>
              <p>{recommendation.text}</p>
            </article>
          </Link>
        </div>
      ))}
    </main>
  );
};

export default RecommendationList;
