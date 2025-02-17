import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600"
    >
      {children}
    </button>
  );
};

export default Button;
