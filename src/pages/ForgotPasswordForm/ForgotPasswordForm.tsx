import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updatePassword } from '../../redux/actions/resetPasswordAction';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { toast } from 'react-toastify';
import PasswordField from '../../components/PasswordField/passwordField';

import 'react-toastify/dist/ReactToastify.css';
import './storefront.css';
import Bluebutton from '../../components/Bluebutton/Bluebutton';
import ForgotPasswordImage from '../../components/ForgotPasswordImage/ForgotPasswordImage';
const ForgotPasswordForm: React.FC = () => {
	const [newPassword, setNewPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { otp } = useParams();
	// Function to check password criteria !/(?=.*[A-Z])(?=.*\d)/
	const isPasswordValid = (password: string): boolean => {
		const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}$/;
		return passwordRegex.test(password);
	};

	// Function to handle password input change
	const handlePasswordChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
		setPassword: React.Dispatch<React.SetStateAction<string>>
	): Promise<void> => {
		const newPasswordValue = e.target.value.trim();
		setPassword(newPasswordValue);

		// Check if both password fields meet the criteria
		// const isButtonEnabled =
		// 	isPasswordValid(newPasswordValue) && newPasswordValue === confirmPassword;

		// // Set the button state
		// setIsButtonEnabled(isButtonEnabled);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	useEffect(() => {
		// Check if both password fields meet the criteria
		const isButtonEnabled =
			isPasswordValid(newPassword.trim()) &&
			newPassword.trim() === confirmPassword.trim();
		setIsButtonEnabled(isButtonEnabled);
	}, [newPassword, confirmPassword]);

	const handleBlur = () => {};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (isButtonEnabled) {
			const passwordData = {
				otp: Number(otp),
				password: newPassword,
			};
			try {
				const response = await dispatch(updatePassword(passwordData));

				if (response.payload.status === 201) {
					toast.success('Password reset successful!', {
						theme: 'colored',
						type: 'success',
					});
					setTimeout(() => {
						navigate('/success');
					}, 3000);
					setIsLoading(true);
				}
			} catch (error) {
				toast.error('Password reset failed. Please try again.', {
					theme: 'colored',
					type: 'error',
				});
			}
		}
	};

	return (
		<div className="flex h-screen ">
			<ForgotPasswordImage />

			{/* Signup Form */}
			<div className="w-full lg:w-1/2 flex items-center justify-center">
				<div className="max-w-md p-4">
					<div className="pb-6  gap-2 justify-center items-end ml-10">
						<h1 className="log">Store Front</h1>
						<h2 className="text-3xl font-bold pb-2 ml-6 justify-center items-center">
							Reset Password
						</h2>
					</div>
					<span className="inline-block font-regular text-sm">
						Dont Remember Password? No Problem. Reset and Restore
					</span>

					<form className="mt-10" onSubmit={handleSubmit}>
						<div className="mb-3 relative">
							<PasswordField
								id="Password"
								visible={showPassword}
								fieldType={showPassword}
								toggleVisibility={togglePasswordVisibility}
								onchange={(e) => handlePasswordChange(e, setNewPassword)}
								fieldName="Password"
								placeholder="Password"
								onblur={handleBlur}
								value={newPassword}
								label="Password"
							/>
						</div>

						<div className="mb-3 relative">
							<PasswordField
								id="confirmPassword"
								visible={showPassword}
								fieldType={showPassword}
								toggleVisibility={togglePasswordVisibility}
								onchange={(e) => handlePasswordChange(e, setConfirmPassword)}
								fieldName="Confirm Password"
								placeholder="Confirm Password"
								onblur={handleBlur}
								value={confirmPassword}
								label="Confirm Password"
							/>
						</div>
						<div className="grid grid-cols-2 ">
							<div>
								<div className="mb-2">
									{/[A-Z]/.test(newPassword) && (
										<p className="text-black text-[10px]">
											<span className="text-green-500 text-[10px]">✓ </span>
											Contains at least one uppercase letter
										</p>
									)}
									{/[A-Z]/.test(newPassword) === false && (
										<p className="text-black text-[10px]">
											• Must contain at least one uppercase letter
										</p>
									)}
								</div>

								<div className="mb-2">
									{/[a-z]/.test(newPassword) && (
										<p className="text-black text-[10px]">
											<span className="text-green-500 text-[10px]">✓ </span>{' '}
											Contains at least one lowercase letter
										</p>
									)}
									{/[a-z]/.test(newPassword) === false && (
										<p className="text-black text-[10px]">
											• Must contain at least one lowercase letter
										</p>
									)}
								</div>
							</div>
							<div>
								<div className="mb-2 ml-4">
									{newPassword.length >= 10 && (
										<p className="text-black text-[10px]">
											<span className="text-green-500 text-[10px]">✓ </span>{' '}
											Contains at least 10 characters
										</p>
									)}
									{newPassword.length < 10 && (
										<p className="text-black text-[10px]">
											• Must contain at least 10 characters
										</p>
									)}
								</div>

								<div className="mb-2 ml-4">
									{/\d/.test(newPassword) && (
										<p className="text-black text-[10px]">
											<span className="text-green-500 text-[10px]">✓ </span>{' '}
											Contains at least one number
										</p>
									)}
									{/\d/.test(newPassword) === false && (
										<p className="text-black text-[10px]">
											• Must contain at least one number
										</p>
									)}
								</div>
							</div>
						</div>

						<div className="mb-3">
							{newPassword !== '' &&
								confirmPassword !== '' &&
								newPassword !== confirmPassword && (
									<p className="text-red-500 text-sm">Passwords do not match</p>
								)}
						</div>

						<div className="mb-3">
							<Bluebutton
								buttonText="Reset Password"
								disabled={!isButtonEnabled}
								isLoading={isLoading}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ForgotPasswordForm;
