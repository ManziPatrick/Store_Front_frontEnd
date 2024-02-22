import emailIcon from './../../assets/icons/Email.svg';
import checkIcon from './../../assets/icons/verification/check.svg';
import dotIcon from './../../assets/icons/verification/icons8_new_moon_30px.png';

import TxtField from '../../components/TextFeild/textField';
import PasswordField from '../../components/PasswordField/passwordField';

import businessIcon from '../../assets/icons/business.svg';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { businessSignup } from '../../redux/actions/signup';
import { useAppDispatch } from '../../redux/hooks/hooks';
import SignupHomeImage from '../../components/SignUpImage/signupimage';
import Logo from '../../components/Logo/logo';
import { toast } from 'react-toastify';
import GoogleLoginButton from '../../components/signwith/googleSignupBusiness';
import FacebookLoginButton from '../../components/signwith/facebookSignupBusiness';
import Bluebutton from '../../components/Bluebutton/Bluebutton';

interface FormData {
	businessname: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface passWordErrors {
	capitalLetters: boolean;
	lowerCase: boolean;
	numberInclusive: boolean;
	minLength: boolean;
}

const SignupBusiness = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const [isconfirmPasswordVisible, setIsoComfirmPasswordVisible] =
		useState<boolean>(false);
	const toggleConfirmPasswordVisibility = () => {
		setIsoComfirmPasswordVisible(!isconfirmPasswordVisible);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const [formData, setFormData] = useState<FormData>({
		businessname: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [passwordValid, setPassWordValid] = useState<passWordErrors>({
		capitalLetters: false,
		lowerCase: false,
		numberInclusive: false,
		minLength: false,
	});

	const [touchedFields, setTouchedFields] = useState<Partial<FormData>>({});
	const [errors, setErrors] = useState<Partial<FormData>>({});

	const [isFormValid, setIsFormValid] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(false);
	const validateForm = useCallback(() => {
		const newErrors: Partial<FormData> = {};
		const newPasswordErrors: passWordErrors = { ...passwordValid };

		if (!/^[A-Za-z ]{3,}$/.test(formData.businessname.trim())) {
			newErrors.businessname = 'First name is required';
		}

		if (formData.email.trim() === '') {
			newErrors.email = 'Email is required';
		} else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
			newErrors.email = 'Invalid email format';
		}
		if (
			!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}$/.test(formData.password.trim())
		) {
			if (/[A-Z]/.test(formData.password)) {
				newPasswordErrors.capitalLetters = true;
			} else {
				newPasswordErrors.capitalLetters = false;
			}
			if (/[a-z]/.test(formData.password)) {
				newPasswordErrors.lowerCase = true;
			} else {
				newPasswordErrors.lowerCase = false;
			}
			if (formData.password.length > 9) {
				newPasswordErrors.minLength = true;
			} else {
				newPasswordErrors.minLength = false;
			}

			if (/\d/.test(formData.password)) {
				newPasswordErrors.numberInclusive = true;
			} else {
				newPasswordErrors.numberInclusive = false;
			}

			setPassWordValid(newPasswordErrors);
			newErrors.password =
				'Password must contain at least 10 characters, including one uppercase letter, one lowercase letter, and one digit.';
		} else {
			newPasswordErrors.capitalLetters = true;
			newPasswordErrors.lowerCase = true;
			newPasswordErrors.minLength = true;
			newPasswordErrors.numberInclusive = true;

			setPassWordValid(newPasswordErrors);
		}

		if (formData.confirmPassword !== formData.password) {
			newErrors.confirmPassword = 'Passwords do not match';
		}

		setErrors(newErrors);
		setIsFormValid(
			Object.keys(newErrors).length === 0 &&
				Object.values(formData).every((value) => value.trim() !== '')
		);
	}, [formData, passwordValid]);

	const validateField = (fieldName: keyof FormData) => {
		const newErrors: Partial<FormData> = { ...errors };

		if (fieldName === 'businessname') {
			if (!/^[A-Za-z ]{3,}$/.test(formData.businessname.trim())) {
				newErrors.businessname = 'Business name is required';
				// toast.error('Business name is required', {
				// 	position: 'top-center',
				// 	autoClose: 5000,
				// 	hideProgressBar: false,
				// 	closeOnClick: true,
				// 	pauseOnHover: true,
				// 	draggable: true,
				// 	progress: undefined,
				// 	theme: 'light',
				// });
			} else {
				delete newErrors.businessname;
			}
		} else if (fieldName === 'email') {
			if (formData.email.trim() === '') {
				newErrors.email = 'Email is required';
				// toast.error('Email name is required', {
				// 	position: 'top-center',
				// 	autoClose: 5000,
				// 	hideProgressBar: false,
				// 	closeOnClick: true,
				// 	pauseOnHover: true,
				// 	draggable: true,
				// 	progress: undefined,
				// 	theme: 'light',
				// });
			} else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
				newErrors.email = 'Invalid email format';
				// toast.error('Invalid email format', {
				// 	position: 'top-center',
				// 	autoClose: 5000,
				// 	hideProgressBar: false,
				// 	closeOnClick: true,
				// 	pauseOnHover: true,
				// 	draggable: true,
				// 	progress: undefined,
				// 	theme: 'light',
				// });
			} else {
				delete newErrors.email;
			}
		} else if (fieldName === 'password') {
			if (
				!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}$/.test(formData.password.trim())
			) {
				newErrors.password =
					'Password must contain at least 10 characters, including one uppercase letter, one lowercase letter, and one digit.';
			} else {
				delete newErrors.password;
			}
		} else if (fieldName === 'confirmPassword') {
			if (formData.confirmPassword !== formData.password) {
				newErrors.confirmPassword = 'Passwords do not match';
				// toast.error('Passwords do not match', {
				// 	position: 'top-center',
				// 	autoClose: 5000,
				// 	hideProgressBar: false,
				// 	closeOnClick: true,
				// 	pauseOnHover: true,
				// 	draggable: true,
				// 	progress: undefined,
				// 	theme: 'light',
				// });
			} else {
				delete newErrors.confirmPassword;
			}
		}

		setErrors(newErrors);
		validateForm();
	};

	const handleBlur = (fieldName: keyof FormData) => {
		setTouchedFields({
			...touchedFields,
			[fieldName]: true,
		});

		validateField(fieldName);
	};

	useEffect(() => {
		validateForm();
		// eslint-disable-next-line
	}, [formData, touchedFields]);

	const handlesubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			const data = {
				businessName: formData.businessname,
				email: formData.email,
				password: formData.password,
			};
			const response = await dispatch(businessSignup(data));

			if (response.payload.status === 201) {
				toast.success('Signup is successfull', {
					theme: 'colored',
					type: 'success',
				});
				navigate('/login');
			} else if (response.payload != 400) {
				toast.error(response.payload.message, {
					theme: 'colored',
					type: 'error',
				});
			}
			setFormData({
				businessname: '',
				email: '',
				password: '',
				confirmPassword: '',
			});
		} catch (error) {
			//setserverErrors('Email has been used already');
			toast.error('Email already exists', { theme: 'colored', type: 'error' });
			console.error('Error:', error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			<div className="flex h-screen">
				<SignupHomeImage />
				<div className="flex flex-col w-full lg:w-1/2 items-center lg:h-auto h-screen overflow-y-auto">
					<div
						className="w-[95%] lg:w-8/12 flex flex-col items-center p-[16px] gap-[20px]"
						style={{ fontFamily: 'inter' }}
					>
						<div className="w-full flex flex-col items-center gap-[16px]">
							<Logo />
							<div className="w-full flex flex-col items-center gap-[16px]">
								<div className="w-full flex flex-col items-center gap-[8px]">
									<div className="text-4xl font-bold">Sign Up</div>
									<div>Create new account by providing your details</div>
								</div>
								<div className="flex gap-1">
									Create
									<Link
										className=" text-blue-500 underline"
										to="/signupcustomer"
									>
										Customer Account
									</Link>
								</div>
							</div>
						</div>

						<form
							action=""
							className="flex flex-col w-full gap-2"
							onSubmit={handlesubmit}
						>
							<TxtField
								fieldType="text"
								id="businessname"
								imgUrl={businessIcon}
								placeholder="Business name"
								fieldName="businessname"
								onchange={handleChange}
								onblur={() => handleBlur('businessname')}
								value={formData.businessname}
								label="Business name"
							/>
							<TxtField
								fieldType="text"
								id="email"
								imgUrl={emailIcon}
								onchange={handleChange}
								fieldName="email"
								placeholder="johndoe@gmail.com"
								onblur={() => handleBlur('email')}
								value={formData.email}
								label="Email"
							/>
							<PasswordField
								id="password"
								visible={isPasswordVisible}
								fieldType={isPasswordVisible}
								toggleVisibility={togglePasswordVisibility}
								onchange={handleChange}
								fieldName="password"
								placeholder="Password"
								onblur={() => handleBlur('password')}
								value={formData.password}
								label="Password"
							/>
							<PasswordField
								id="confirmPassword"
								visible={isconfirmPasswordVisible}
								fieldType={isconfirmPasswordVisible}
								toggleVisibility={toggleConfirmPasswordVisibility}
								onchange={handleChange}
								fieldName="confirmPassword"
								placeholder="Confirm password"
								onblur={() => handleBlur('confirmPassword')}
								value={formData.confirmPassword}
								label="Confirm Password"
							/>
							{touchedFields.password && (
								<div className="flex flex-wrap justify-evenly md:flex-col">
									<div className="w-1/2 md:w-full flex items-center gap-1">
										{passwordValid.capitalLetters && (
											<img className="w-4 h-4" src={checkIcon} alt="" />
										)}
										{!passwordValid.capitalLetters && (
											<img className="w-2 h-2" src={dotIcon} alt="" />
										)}
										<div>Atleast 1 uppercase letter</div>
									</div>
									<div className="w-1/2 md:w-full flex items-center gap-1">
										{passwordValid.lowerCase && (
											<img className="w-4 h-4" src={checkIcon} alt="" />
										)}
										{!passwordValid.lowerCase && (
											<img className="w-2 h-2" src={dotIcon} alt="" />
										)}
										<div>Atleast 1 lowercase letter</div>
									</div>
									<div className="w-1/2 md:w-full flex items-center gap-1">
										{passwordValid.numberInclusive && (
											<img className="w-4 h-4" src={checkIcon} alt="" />
										)}
										{!passwordValid.numberInclusive && (
											<img className="w-2 h-2" src={dotIcon} alt="" />
										)}
										<div>Atleast 1 number</div>
									</div>

									<div className="w-1/2 md:w-full flex items-center gap-1">
										{passwordValid.minLength && (
											<img className="w-4 h-4" src={checkIcon} alt="" />
										)}
										{!passwordValid.minLength && (
											<img className="w-2 h-2" src={dotIcon} alt="" />
										)}
										<div>Atleast 10 characters</div>
									</div>
								</div>
							)}
							<Bluebutton
								buttonText="Continue"
								disabled={!isFormValid}
								isLoading={isLoading}
							/>
						</form>
						<div className="flex gap-5 w-full items-center">
							<div
								className=" parag top-10 bg-gray-400 w-1/2 md:w-1/2"
								style={{ height: '1px' }}
							></div>
							<div> OR </div>
							<div
								className="top-10 h-0.5 bg-gray-400 w-1/2 md:w-1/2"
								style={{ height: '1px' }}
							></div>
						</div>
						<div className="flex flex-col gap-3 w-full items-center">
							<div>Sign up with</div>

							<GoogleLoginButton
								googleServerUrl={`${process.env.VITE_BN_APP_API_BASE_URL}`}
							/>
							<FacebookLoginButton
								facebookServerUrl={`${process.env.VITE_BN_APP_API_BASE_URL}`}
							/>
						</div>
						<div className="self-center flex gap-1">
							Already a member?{' '}
							<div className="text-blue-500 underline mb-10">
								<Link to={'/login'}>Sign in</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignupBusiness;
