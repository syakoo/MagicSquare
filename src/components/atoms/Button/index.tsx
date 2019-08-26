import React from "react";

interface Button {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<Button> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};
