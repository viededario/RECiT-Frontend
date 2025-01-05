import React from 'react'
import { Link } from 'react-router-dom';

const MyRecommendations = ({ recommendations, user }) => {
  return (
    <main>
    {user && recommendations.map((recommendation) => (
        recommendation.author && recommendation.author.username === user.username ? (
        <Link key={recommendation._id} to={`/recommendations/${recommendation._id}` }>
            <article>
                <header>
                    <h2>{recommendation.title}</h2>
                    <p>{recommendation.author.username} posted on 
                        {new Date(recommendation.createdAt).toLocaleDateString()}
                    </p>
                </header>
                <p>{recommendation.text}</p>
            </article>
            </Link>
        ) : null
    ))}
    </main>
  )
}

export default MyRecommendations