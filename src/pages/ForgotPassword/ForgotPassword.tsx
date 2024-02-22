// ForgotPasswordPage.tsx
import IconEmail from '../../assets/icons/IconEmail.svg';

import { useAppDispatch } from '../../redux/hooks/hooks';
import TxtField from '../../components/TextFeild/textField';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/resetPasswordAction';
import { toast } from 'react-toastify';
import './storefront.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from 'react';
import Bluebutton from '../../components/Bluebutton/Bluebutton';
import ForgotPasswordImage from '../../components/ForgotPasswordImage/ForgotPasswordImage';

const ForgotPassword: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	// Function to validate email format
	const isEmailValidFormat = (email: string): boolean => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		return emailRegex.test(email);
	};

	useEffect(() => {
		setIsEmailValid(isEmailValidFormat(email));
	}, [email]);

	const handleBlur = () => {};

	const handleEmailChange = async (e: React.FormEvent): Promise<void> => {
		e.preventDefault();
		const newEmail = (e.target as HTMLInputElement).value;
		setEmail(newEmail);
	};

	const handleSubmit = async (e: React.FormEvent): Promise<void> => {
		e.preventDefault();
		if (isEmailValid) {
			try {
				const response = await dispatch(resetPassword(email));
				if (response.payload.status === 201) {
					toast.success('Check your mail for the verification code!', {
						theme: 'colored',
						type: 'success',
					});
					setTimeout(() => {
						navigate('/verifyotp');
					}, 3000);
					setEmail('');
					setIsEmailValid(false);
					setIsLoading(true);
				}
			} catch (error) {
				toast.error(
					'Failed to send the verification. Please try again later.',
					{ theme: 'colored', type: 'error' }
				);
			}
		}
	};

	return (
		<div className="flex h-screen ">
			<ForgotPasswordImage />

			{/* Signup Form */}
			<div className="w-full lg:w-1/2 flex items-center justify-center">
				<div className="max-w-md p-4 items-center justify-center ">
					<div className="pb-6 gap-2 justify-center items-end ml-10">
						{/* <div className="text-[#0085FF] font-black text-2xl pb-2 ml-14 items-center justify-center" > */}
						<h1 className="log">Store Front</h1>
						<h2 className="text-3xl font-bold pb-2 ml-6 justify-center items-center">
							Reset Password
						</h2>
					</div>
					<div>
						<span className="inline-block font-regular text-sm">
							Dont Remember Password? No Problem. Reset and Restore
						</span>
					</div>

					<form className="" onSubmit={handleSubmit}>
						<div className="mb-2 relative mt-2 ">
							<TxtField
								fieldName="email"
								fieldType="email"
								value={email}
								placeholder="emmanuella.neizer@amalitech.org"
								onchange={handleEmailChange}
								id="email"
								onblur={handleBlur}
								label="Email"
								imgUrl={IconEmail}
							/>
						</div>

						<div className="mb-3">
							<Bluebutton
								buttonText="Continue"
								disabled={!isEmailValid}
								isLoading={isLoading}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
