import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as recommendationService from '../../services/recommendationService';
import './RecommendationList.css';

const RecommendationList = ({ recommendations, handleLikeRecommendation, handleDislikeRecommendation }) => {
  const handleLikeClick = (event, recommendationId) => {
    event.preventDefault(); // Prevent navigation
    handleLikeRecommendation(recommendationId);
  };

  const handleDislikeClick = (event, recommendationId) => {
    event.preventDefault(); 
    handleDislikeRecommendation(recommendationId);
  };

  return (
    <main>
      {recommendations.map((recommendation) => (
        <div key={recommendation._id}>
          <Link to={`/recommendations/${recommendation._id}`}>
            <article>
              <header>
                <h2>{recommendation.title}</h2>
                <p>
                  {recommendation.author?.username} posted on {new Date(recommendation.createdAt).toLocaleDateString()}
                </p>
                <button onClick={(e) => handleLikeClick(e, recommendation._id)}>
              Like ({recommendation.likes.length})
            </button>
            <button onClick={(e) => handleDislikeClick(e, recommendation._id)}>
              Dislike ({recommendation.dislikes.length})
            </button>
                <button onClick={(e) => { 
                  e.preventDefault(); 
                  if (recommendation.isFavorite) {
                    recommendationService.handleRemoveFavorite(recommendation._id);
                  } else {
                    recommendationService.handleAddFavorite(recommendation._id);
                  }
                }}>
                  {recommendation.isFavorite ? 'Remove' : 'Fav'}
                </button>
              </header>
              <p>{recommendation.text}</p>
            </article>
          </Link>
          <div>
           
          </div>
        </div>
      ))}
    </main>
  );
};

export default RecommendationList;
