import React, {useState} from "react";

const Form = ({initialTodo, handleSubmit, buttonLabel, history}) => {
    // the form state
    const [formData, setFormData] = useState(initialTodo)

    // functions
    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmission = (event) => {
        event.preventDefault()
        handleSubmit(formData)
        history.push("/")
    }

    return (
        <form onSubmit={handleSubmission}>
            <input 
                type="text" 
                onChange={handleChange} 
                value={formData.subject} 
                name="subject"> 
            </input>
            <input 
                type="text" 
                onChange={handleChange} 
                value={formData.details} 
                name="details"> 
            </input>
            <input type="submit" value={buttonLabel} />
        </form>
    )
}

export default Form