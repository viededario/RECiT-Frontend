import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import * as RecommendationService from "../../services/recommendationService.js";
import CommentForm from "../CommentForm/commentForm.jsx";
import { AuthedUserContext } from "../../App";

const RecommendationDetails = (props) => {
  const user = useContext(AuthedUserContext);
  const { recommendationId } = useParams();
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchRecommendation = async () => {
      const recommendationData = await RecommendationService.show(
        recommendationId
      );
      setRecommendation(recommendationData);
    };
    fetchRecommendation();
  }, [recommendationId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await RecommendationService.createComment(
      recommendationId,
      commentFormData
    );
    setRecommendation({
      ...recommendation,
      comments: [...recommendation.comments, newComment],
    });
  };

  if (!recommendation) {
    return <main>There are no recommendations</main>;
  }

  return (
    <main>
      <header>
        <p>{recommendation.category.toUpperCase()}</p>
        <h1>{recommendation.title}</h1>
        <p>
          {recommendation.author.username} posted on
          {new Date(recommendation.createdAt).toLocaleDateString()}
          {new Date(recommendation.createdAt).toLocaleTimeString()}
        </p>
        {recommendation.author._id === user._id && (
          <>
            <button
              onClick={() => props.handleDeleteRecommendation(recommendationId)}
            >
              Delete
            </button>
          </>
        )}
      </header>
      <p>{recommendation.content}</p>
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {recommendation.comments.length === 0 && <p>No comments yet</p>}
        {recommendation.comments.length > 0 &&
          recommendation.comments.map((comment) => (
            <div key={comment._id}>
              <p>{comment.text}</p>
              <p>
                {comment.author.username} posted on
                {new Date(comment.createdAt).toLocaleDateString()}
                {new Date(comment.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
      </section>
    </main>
  );
};

export default RecommendationDetails;
