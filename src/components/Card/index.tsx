import React, { ReactNode } from "react";
import './Card.scss';

export interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Card = (props: CardProps) => {
  const { title, children, className = '' } = props;
  
  return (
    <div className={`zxz-card ${className}`}>
      {title && <div className="zxz-card-title">{title}</div>}
      <div className="zxz-card-content">{children}</div>
    </div>
  );
};

export default Card;