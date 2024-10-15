import React from "react";

export interface InputProps {
  label: string;
}

export const Input = (props: InputProps) => {
  return (<div>
    {props?.label}: <input></input>
  </div>);
};