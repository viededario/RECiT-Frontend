import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './RecommendationList.css'

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
    <>
    <main>
      {recommendations.map((recommendation) => (
        <div key={recommendation._id}>
          <Link to={`/recommendations/${recommendation._id}`}>
            <article>
              <header>
                <h2>{recommendation.title}</h2>
                <p>
                  {recommendation.author.username} posted on 
                  {new Date(recommendation.createdAt).toLocaleDateString()}
                </p>
              </header>
              <p>{recommendation.text}</p>
            </article>
          </Link>
          <div>
            <button onClick={(e) => handleLikeClick(e, recommendation._id)}>
              Like ({recommendation.likes.length})
            </button>
            <button onClick={(e) => handleDislikeClick(e, recommendation._id)}>
              Dislike ({recommendation.dislikes.length})
            </button>
          </div>
        </div>
      ))}
    </main>
    </>
  );
};


export default RecommendationList;