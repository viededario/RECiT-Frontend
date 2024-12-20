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
  
  export { create, index };
  