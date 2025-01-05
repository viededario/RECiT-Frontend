import React, { useEffect, useState } from 'react';
import * as recommendationService from '../../services/recommendationService';

const Favorite = () => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const allFavorites = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
                const data = await recommendationService.allFavorites(token);
                console.log('Raw JSON data:', data); // This logs the raw JSON data
                setRecommendations(data);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        allFavorites();
    }, []);

    return (
        <div>
            {recommendations.map((recommendation) => (
                <div key={recommendation._id}>
                    <h3>{recommendation.title}</h3>
                    <p>Category: {recommendation.category}</p>
                    <p>Content: {recommendation.content}</p>
                    <p>Author: {recommendation.author}</p>
                    <p>Likes: {recommendation.likes.length}</p>
                    <p>Dislikes: {recommendation.dislikes.length}</p>
                    <button onClick={() => recommendationService.handleDeleteFavorite(recommendation._id)}>Remove from Favorites</button>
                </div>
            ))}
        </div>
    );
};

export default Favorite;