import React, { useEffect, useState } from "react";
import * as recommendationService from "../../services/recommendationService";
import "./Favorite.css";
import { Link } from "react-router-dom";

const Favorite = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const allFavorites = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
        const data = await recommendationService.allFavorites(token);
        console.log("Raw JSON data:", data); // This logs the raw JSON data
        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    allFavorites();
  }, []);

  const handleRemoveFavorite = async (id) => {
    try {
      await recommendationService.handleDeleteFavorite(id);
      window.location.reload();
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <main>
      {recommendations.map((recommendation) => (
        <div key={recommendation._id} className="favorite-content">
                        <article>
          <Link to={`/recommendations/${recommendation._id}`}>
              <header>
                <h2>{recommendation.title}</h2>
                <p>
                  {recommendation.author.username} posted on
                  {new Date(recommendation.createdAt).toLocaleDateString()}
                </p>
              </header>
              <p>{recommendation.text}</p>
              </Link>
              <button onClick={() => handleRemoveFavorite(recommendation._id)}>
            Remove from Favorites
          </button>
            </article>   
        </div>
      ))}
    </main>
  );
};

export default Favorite;
