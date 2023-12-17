import React from "react";
import "./auth.css";
import { FaEye } from "react-icons/fa";

const Input = ({ name, type, handleChange, label }) => {
  return (
      <>
      <div className="input">
        <input
            className="input-field"
            onChange={handleChange}
            name={name}
            type={type}
            required
            />
        <label className="input-label">{label}</label>
        </div>
      </>
    
  );
};

export default Input;
