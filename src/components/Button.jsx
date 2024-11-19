const Button = ({
    onClick,
    text,
    isSelected = false,
    variant = "default",
    className = "",
    icon: Icon = null,
    ...props
}) => {
    const baseStyles =
        "w-full py-2 px-4 transition duration-300 text-center focus:outline-none";

    const variantStyles = {
        default: "rounded-lg",
        primary: "text-white rounded-lg bg-blue-600 hover:bg-blue-700",
        secondary: "text-white rounded-lg bg-gray-800 hover:bg-gray-600",
        selected:
            "text-gray-600 hover:bg-gray-600 hover:text-white text-bold transition duration-300 rounded-lg border-b-2 border-gray-600",
    };

    const buttonStyles = isSelected
        ? `${baseStyles} ${variantStyles.selected} ${className}`
        : `${baseStyles} ${
              variantStyles[variant] || variantStyles.default
          } ${className}`;

    return (
        <button onClick={onClick} className={buttonStyles} {...props}>
            {Icon && <Icon className="mr-2 h-6 w-6" />} {text}
        </button>
    );
};

export default Button;
