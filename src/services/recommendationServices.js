const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/recommendations`

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getitItem('token')}`}
        });
        return res.json();
    } catch (error) {
        console.log(error)
    }
}

export {index};