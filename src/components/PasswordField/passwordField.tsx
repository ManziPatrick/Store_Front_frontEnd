import Visible from './../../assets/icons/viewPassword.png';

import Invisible from './../../assets/icons/invisiblePassword.png';
import passwordIcon from './../../assets/icons/password.svg';

import React, { useState, ChangeEvent, FocusEvent } from 'react';

interface PasswordFieldProps {
	visible: boolean;
	fieldType: boolean;
	toggleVisibility: () => void;
	onchange: (event: ChangeEvent<HTMLInputElement>) => void;
	fieldName: string;
	placeholder: string;
	onblur: (event: FocusEvent<HTMLInputElement>) => void;
	id: string;
	value?: string; // Make value optional if not always provided
	label: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
	visible,
	fieldType,
	toggleVisibility,
	onchange,
	fieldName,
	placeholder,
	onblur,
	id,
	label,
	value = '', // Provide a default value if not provided
}) => {
	const [isInputFocused, setInputFocused] = useState(false);

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
					className=" font-bold"
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
					<img src={passwordIcon} alt="" />
					<input
						id={id}
						type={fieldType ? 'text' : 'password'}
						onChange={onchange}
						name={fieldName}
						className="focus:border-transparent focus:outline-none border-l-2 w-full px-2"
						placeholder={placeholder}
						onFocus={onblur}
						onBlur={() => setInputFocused(true)}
						value={value}
						autoComplete="new-password"
					/>
					<button type="button" onClick={toggleVisibility}>
						<img className="w-5" src={visible ? Visible : Invisible} alt="" />
					</button>
				</div>
			</div>
		</>
	);
};

export default PasswordField;
