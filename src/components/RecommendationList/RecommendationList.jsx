import React from 'react'
import { Link } from 'react-router-dom';

export const RecommendationList = () => {
  return (
<main>
{props.recommendations.map((recommendation) => (
    <Link key={recommendation._id} to={`/recommendations/${recommendation.id}` }>
        <article>
            <header>
                <h2>{recommendation.title}</h2>
                <p>{recommendation.author.username} posted on 
                    {new Date(recommendation.createdAt).toLocaleString()}
                </p>
            </header>
            <p>{recommendation.text}</p>
        </article>
        </Link>
))}
</main>
  );
};


export default RecommendationList;