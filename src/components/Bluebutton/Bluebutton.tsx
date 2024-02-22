import React, { ButtonHTMLAttributes } from 'react';

interface BluebuttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	buttonText: string;
	isLoading: boolean;
	customBackground?: string;
}

const Bluebutton: React.FC<BluebuttonProps> = ({
	buttonText,
	isLoading,
	customBackground,
	...props
}) => {
	return (
		<button
			className={`
        mt-2
        bg-blue-500
        rounded-md 
        py-2 
        text-white
        w-full
        ${
					props.disabled
						? 'opacity-20'
						: customBackground
						? `bg-${customBackground}`
						: 'bg-[#0F3CD9]'
				}
        ${props.className || ''}`.trim()}
			type="submit"
			disabled={props.disabled || isLoading}
			onClick={props.onClick}
			style={props.style}
		>
			{isLoading ? (
				<div className="flex items-center justify-center">
					Loading...
					<div className="inline-block ml-2 w-4 h-4 border-t-2 border-white border-solid rounded-full animate-spin"></div>
				</div>
			) : (
				buttonText
			)}
		</button>
	);
};

export default Bluebutton;
