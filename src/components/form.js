import React, { useReducer, useRef, useState } from "react";
import './form.css'
import { formReducer, INITIAL_STATE } from "./formReducer";
//import { formReducer, INITIAL_STATE } from "./formReducer";

const Form = () => {

    const [state,dispatch] = useReducer(formReducer,INITIAL_STATE);
    
    const tagRef = useRef();

    const handleChange = (e) =>{
            dispatch({type:"CHANGE_INPUT", payload:{name: e.target.name, value: e.target.value}})
    }
    const handleAddTag = () => {
       
        const tag = tagRef.current.value.split(",")
        tag.forEach(newTag => {
                dispatch({type:"ADD_TAG", payload: newTag})
        });
    }

    console.log(state)

  return (

    <div>
      <form>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="desc"
          onChange={handleChange}
          placeholder="Desc"
        />
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
        />
        <p>Category:</p>
        <select name="category" id="category" onChange={handleChange}>
          <option value="sneakers">Sneakers</option>
          <option value="tshirts">T-shirts</option>
          <option value="jeans">Jeans</option>
        </select>
        <p>Tags:</p>
        <textarea
            ref={tagRef}
          placeholder="Seperate tags with commas..."
        ></textarea>
        <button type="button" onClick={handleAddTag}>
          Add Tags
        </button>
        <div className="tags">
          {state.tags.map((tag) => (
            <small key={tag} onClick={()=>dispatch({type:"REMOVE_TAG", payload:tag})}>
              {tag}
            </small>
          ))}
        </div>
        <div className="quantity">
          <button type="button" onClick={()=>dispatch({type:"DECREASE"})}>
            -
          </button>
          <span>Quantity </span>
          <button type="button" onClick={()=>dispatch({type:"INCREASE"})}>
            +
          </button>
        </div>
      </form>
    </div>
  )
};

export default Form;