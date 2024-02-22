import React from 'react';

interface ButtonProps {
	bgColor: string;
	borderProps: string[];
	handleClick: () => void;
	paddingProps: string[];
	buttonType: 'submit' | 'button';
	buttonText: string;
	rounded: string;
	className: string;
	txtColor: string;
}

const CustomButton: React.FC<ButtonProps> = ({
	bgColor,
	borderProps,
	paddingProps,
	buttonType,
	handleClick,
	buttonText,
	rounded,
	className,
	txtColor,
}) => {
	return (
		<button
			className={className}
			style={{
				padding: `${paddingProps[0]} ${paddingProps[1]}`,
				border: `${borderProps[0]} ${borderProps[1]} ${borderProps[2]}`,
				backgroundColor: `${bgColor}`,
				borderRadius: `${rounded}`,
				color: txtColor,
			}}
			onClick={handleClick}
			type={buttonType}
		>
			{buttonText}
		</button>
	);
};

export default CustomButton;
