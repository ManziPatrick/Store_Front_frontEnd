import React, { useState, ChangeEvent, FocusEvent } from 'react';

interface TxtFieldProps {
	imgUrl?: string;
	onchange: (event: ChangeEvent<HTMLInputElement>) => void;
	fieldType: 'text' | 'email' | 'password';
	fieldName: string;
	placeholder: string;
	onblur: (event: FocusEvent<HTMLInputElement>) => void;
	id: string;
	value: string;
	label: string;
}

const TxtField: React.FC<TxtFieldProps> = ({
	imgUrl = '',
	onchange,
	fieldType,
	fieldName,
	placeholder,
	onblur,
	id,
	value,
	label,
}) => {
	const [isInputFocused, setInputFocused] = useState<boolean>(false);

	return (
		<>
			<div
				className=""
				style={{
					width: '100%',
					flexDirection: 'column',
					alignItems: 'flex-start',
					gap: '6px',
				}}
			>
				<label
					htmlFor={id}
					className=""
					style={{
						color: 'var(--Colors-Primary-Slate-700, #3D4A5C)',
						fontFamily: 'Inter',
						fontSize: '14px',
						fontStyle: 'normal',
						fontWeight: 500,
						lineHeight: '24px',
						letterSpacing: '-0.2px',
					}}
				>
					{label}
				</label>
				<div
					className={`
					border
					border-t-0
					border-l-0
					border-r-0
					flex
					gap-2
					p-3
					${isInputFocused ? 'border-b-blue-600' : 'border-b-gray-400'}
					`}
				>
					{imgUrl && <img src={imgUrl} alt={fieldName || 'Field Image'} />}
					<input
						id={id}
						type={fieldType}
						name={fieldName}
						className="focus:border-transparent focus:outline-none border-l-2 px-2 w-full"
						onChange={onchange}
						placeholder={placeholder}
						onFocus={() => setInputFocused(true)}
						onBlur={onblur}
						value={value}
						autoComplete={''}
					/>
				</div>
			</div>
		</>
	);
};

export default TxtField;
