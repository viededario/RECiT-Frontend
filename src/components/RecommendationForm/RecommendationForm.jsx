// src/components/HootForm/HootForm.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as recommendationService from "../../services/recommendationService";

const RecommendationForm = (props) => {
  const { recommendationId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    category: "Books",
    content: "",
  });

  useEffect(() => {
    const fetchRecommendation = async () => {
      const recommendation = await recommendationService.show(recommendationId);
      setFormData(recommendation);
    };
    if (recommendationId) fetchRecommendation();
  }, [recommendationId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (recommendationId) props.handleAddRecommendation(formData);
    else {
      props.handleAddRecommendation(formData);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="content-input">Content</label>
        <textarea
          required
          type="text"
          name="content"
          id="content-input"
          value={formData.content}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Books">Books</option>
          <option value="Explore">Explore</option>
          <option value="Films">Films</option>
          <option value="Games">Games</option>
          <option value="Location">Location</option>
          <option value="Movies">Movies</option>
          <option value="Music">Music</option>
          <option value="Restarants">Restaurants</option>
          <option value="Sports">Sports</option>
          <option value="Vacation">Vacation</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default RecommendationForm;
