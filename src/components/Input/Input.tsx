import React from "react";
import './Input.scss'

export interface InputProps {
  label: string;
}

export const Input = (props: InputProps) => {
  return (<div className="input-content">
    {props?.label}: <input></input>
  </div>);
};

export default Input;
