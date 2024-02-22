import React, { useState } from 'react';
import emailIcon from './../../assets/icons/Email.svg';
import SignupHomeImage from '../../components/SignUpImage/signupimage';
import TxtField from '../../components/TextFeild/textField';
import './loginsigup.css';
import { Link } from 'react-router-dom';
import GoogleLoginButton from '../../components/signwith/google';
import FacebookLoginButton from '../../components/signwith/facebook';
import { SigninData, signin } from '../../redux/actions/login';
import PasswordField from '../../components/PasswordField/passwordField';
import Bluebutton from '../../components/Bluebutton/Bluebutton';
import Logo from '../../components/Logo/logo';
import { useAppDispatch } from '../../redux/hooks/hooks';


const Login = () => {
	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (formData.email === '') {
			return;
		}

		if (formData.password === '') {
			return;
		}

		setIsLoading(true);

		try {
			await dispatch(signin(formData));
			
		} catch (error) {
			console.error('this is the error', error);
		} finally {
			setIsLoading(false);
		}
	};

	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const [formData, setFormData] = useState<SigninData>({
		email: '',
		password: '',
	});

	const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
	const isPasswordValid = formData.password.length >= 1;

	const onblur = () => {
		/*  document why this arrow function is empty */
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const isButtonBlue = isEmailValid && isPasswordValid;

	return (
		<div className="flex h-screen">
			<SignupHomeImage />

			<div className="flex flex-col w-full lg:w-1/2 items-center lg:h-auto h-screen overflow-y-auto justify-center">
				<div className="w-[90%] lg:w-[70%] flex flex-col">
					<div className="flex flex-col items-center">
						<Logo />
						<h1 className="header">Hi, Welcome back to Storefront</h1>
						<p className="parag">
							Log in to your existing storefront dashboard by entering the
							details associated with your account below.
						</p>
						<form className="w-full" onSubmit={handleSubmit}>
							<TxtField
								fieldName="email"
								fieldType="email"
								value={formData.email}
								placeholder="emmanuella.neizer@amalitech.org"
								onchange={handleInputChange}
								id="email"
								onblur={onblur}
								label="Email"
								imgUrl={emailIcon}
							/>
							<PasswordField
								fieldName="password"
								fieldType={isPasswordVisible}
								id="password"
								onblur={onblur}
								onchange={handleInputChange}
								label="Password"
								placeholder="password"
								toggleVisibility={togglePasswordVisibility}
								visible={isPasswordVisible}
								value={formData.password}
							/>
							<p className="text-right text-blue-500 hover:underline right-0">
								<Link className="login-password-link" to="/forgot-password">
									Forgot Password?
								</Link>
							</p>
							<Bluebutton
								buttonText="Continue"
								disabled={!isButtonBlue}
								isLoading={isLoading}
							/>
						</form>
						<div className="flex gap-5 w-full mt-3">
							<div
								className=" parag top-10 mt-2 bg-gray-400 w-1/2 md:w-1/2"
								style={{ height: '1px' }}
							></div>
							<div>or</div>
							<div
								className="top-10  mt-2 h-0.5  bg-gray-400 w-1/2 md:w-1/2"
								style={{ height: '1px' }}
							></div>
						</div>
						<button
							type="button"
							className="text-black w-full justify-center  parag"
						>
							Sign in with
						</button>
						<div className="  w-full">
							<GoogleLoginButton
								googleServerUrl={`${process.env.VITE_BN_APP_API_BASE_URL}`}
							/>
							<FacebookLoginButton
								facebookServerUrl={`${process.env.VITE_BN_APP_API_BASE_URL}`}
							/>
						</div>
						<p className=" parag text-center">
							{' '}
							Dont have an account?
							<Link
								className="login-password-link text-blue-500 underline ml-1  "
								to="/signupcustomer"
							>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
