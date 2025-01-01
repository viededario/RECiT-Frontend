const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/recommendations`;


const index = async () => {
    try {
      const token = localStorage.getItem("token");
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${token}`
          }
        });
        return res.json();
    } catch (error) {
        console.log(error)
    }
}

const create = async (recommendationFormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recommendationFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const show = async (RecommendationId) => {
    try {
      const res = await fetch(`${BASE_URL}/${RecommendationId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
      });
      return res.json();
    } catch (error) {
      console.log(error)
    }
  }


  const createComment = async (recommendationId, commentFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${recommendationId}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(commentFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecommendation = async (recommendationId) => {
    try {
      const res = await fetch(`${BASE_URL}/${recommendationId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const updateRecommendation = async (recommendationId, recommendationFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${recommendationId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recommendationFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }
  
  export { index, create, show, createComment, deleteRecommendation, updateRecommendation };
  