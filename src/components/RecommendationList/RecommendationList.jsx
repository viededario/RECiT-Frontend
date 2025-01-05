import React from 'react'
import { Link } from 'react-router-dom';
import * as recommendationService from '../../services/recommendationService';

export const RecommendationList = (props) => {
  return (
    <main>
      {props.recommendations.map((recommendation) => (
        <Link key={recommendation._id} to={`/recommendations/${recommendation._id}`}>
          <article>
            <header>
              <h2>{recommendation.title}</h2>
              <p>{recommendation.author?.username} posted on 
                {new Date(recommendation.createdAt).toLocaleDateString()}
              </p>
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
      ))}
    </main>
  );
};

export default RecommendationList;