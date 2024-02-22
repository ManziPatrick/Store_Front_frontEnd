import React from 'react';

const sizeClasses = {
	txtPoppinsBlack24: 'font-black font-poppins',
	txtInterSemiBold14: 'font-inter font-semibold',
	txtInterSemiBold48: 'font-inter font-semibold',
	txtInterRegular16: 'font-inter font-normal',
} as const;

export type TextProps = Partial<{
	className: string;
	size: keyof typeof sizeClasses;
	as: React.ElementType;
}> &
	React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLSpanElement>,
		HTMLSpanElement
	>;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
	className = '',
	size,
	as,
	...restProps
}) => {
	const Component = as || 'p';

	return (
		<Component
			className={`text-left ${className} ${size && sizeClasses[size]}`}
			{...restProps}
		></Component>
	);
};

export { Text };
export type ImgProps = React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
> &
	Partial<{
		className: string;
		src: string;
		alt: string;
	}>;

const Img: React.FC<React.PropsWithChildren<ImgProps>> = ({
	className,
	src = 'defaultNoData.png',
	alt = 'testImg',
	...restProps
}) => {
	return (
		<img
			className={className}
			src={src}
			alt={alt}
			{...restProps}
			loading={'lazy'}
		/>
	);
};
export { Img };


export type InputProps = Omit<
	React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>,
	'size' | 'prefix' | 'type' | 'onChange'
> &
	Partial<{
		wrapClassName: string;
		className: string;
		name: string;
		placeholder: string;
		type: string;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		prefix: React.ReactNode; // Added prefix and suffix to InputProps
		suffix: React.ReactNode;
	}>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			wrapClassName = '',
			className = '',
			name = '',
			placeholder = '',
			type = 'text',
			prefix,
			suffix,
			onChange,
		},
		ref
	) => {
		const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
			if (onChange) onChange(e);
		};

		return (
			<>
				<div className={`${wrapClassName}`}>
					{!!prefix && prefix} {/* Render the prefix */}
					<input
						ref={ref}
						className={`${className} bg-transparent border-0`}
						type={type}
						name={name}
						placeholder={placeholder}
						onChange={handleChange}
					/>
					{!!suffix && suffix} {/* Render the suffix */}
				</div>
			</>
		);
	}
);

export { Input };


