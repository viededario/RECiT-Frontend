import React from 'react'
import {useEffect, useState} from 'react'
import * as recommendationService from '../../services/recommendationService'

const CommentForm = (props) => {
    const [formData, setFormData] = useState({text: ''});

    const handleChange = (evt) => {
        setFormData({...formData, [evt.target.name]: evt.target.value});
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAddComment(formData)
        setFormData({text: ''})
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="text-input"> Your Comment:</label>
            <textarea
                required
                type="text"
                name="text"
                id="text-input"
                value={formData.text}
                onChange={handleChange}
            />
            <button type="submit">Submit Comment</button>

        </form>
    )
}

export default CommentForm;