import React from "react";
type ButtonProps = {
  onClick: () => void;
  text: string;
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  className = "",
  disabled,
}) => {
  const handleClick = () => {
    onClick();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  };
  return (
    <button
      type="submit"
      onClick={handleClick}
      disabled={disabled}
      className={`${
        disabled ? "opacity-50" : "opacity-100"
      } bg-blue-500  text-white font-bold py-2 px-4 flex rounded-md self-stretch justify-center items-center  ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
