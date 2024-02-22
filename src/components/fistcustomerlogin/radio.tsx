import React from 'react';
import "./radio.css"
export type RadioProps = Omit<
	React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>,
	'size' | 'prefix' | 'type' | 'onChange'
> &
	Partial<{
		inputClassName: string;
		className: string;
		name: string;
		label: string;
		checked: boolean;

		onChange: (checked: boolean) => void; // Specify the function shape.
		id: string;
	}>;

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
	(
		{
			inputClassName = '',
			className = '',
			name = '',
			label = '',
			checked = false,
			onChange,
			id = 'radio_id',
			...restProps
		},
		ref
	) => {
		const [value, setValue] = React.useState(checked);

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const checked = event.target.checked;
			setValue(checked);
			if (onChange) onChange(checked);
		};

		return (
			<>
				<div className={`box ${className}`}>
					<input
						className={`input  ${inputClassName}`}
						ref={ref}
						type="radio"
						name={name}
						aria-checked={!!value}
						checked={!!value}
						onChange={handleChange}
						{...restProps}
						id={id}
					/>
					<label htmlFor={id} className='label ml-3 ' >{label}</label>
				</div>
			</>
		);
	}
);

export { Radio };
