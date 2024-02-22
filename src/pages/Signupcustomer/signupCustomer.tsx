import userIcon from './../../assets/icons/User.svg';
import emailIcon from './../../assets/icons/Email.svg';
import checkIcon from './../../assets/icons/verification/check.svg';
import dotIcon from './../../assets/icons/verification/icons8_new_moon_30px.png';

import TxtField from '../../components/TextFeild/textField';
import PasswordField from '../../components/PasswordField/passwordField';

import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { signup } from '../../redux/actions/signup';
import SignupHomeImage from '../../components/SignUpImage/signupimage';
import Logo from '../../components/Logo/logo';
import { toast } from 'react-toastify';
import FacebookLoginButton from '../../components/signwith/facebookSignupcustomer';
import GoogleLoginButton from '../../components/signwith/googleSignupcustomer';
import Bluebutton from '../../components/Bluebutton/Bluebutton';

interface FormData {
	firstName: string;
	lastName: string;
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

const SignupCustomer = () => {
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
	const [touchedFields, setTouchedFields] = useState<Partial<FormData>>({});
	const [errors, setErrors] = useState<Partial<FormData>>({});
	const [isFormValid, setIsFormValid] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		firstName: '',
		lastName: '',
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

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validateForm = useCallback(() => {
		const newErrors: Partial<FormData> = {};
		const newPasswordErrors: passWordErrors = { ...passwordValid };

		if (formData.firstName.trim() === '') {
			newErrors.firstName = 'First name is required';
		} else if (!/^[A-Za-z]{3,}$/.test(formData.firstName.trim())) {
			newErrors.firstName = 'First name is wrong format';
		}

		if (formData.lastName.trim() === '') {
			newErrors.lastName = 'Last name is required';
		} else if (!/^[A-Za-z ]{3,}$/.test(formData.lastName.trim())) {
			newErrors.lastName = 'Last name is wrong format';
		}

		if (formData.email.trim() === '') {
			newErrors.email = 'Email is required';
		} else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
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
		//const newPasswordErrors: Partial<passWordErrors> = { ...passwordValid };

		if (fieldName === 'firstName') {
			if (formData.firstName.trim() === '') {
				newErrors.firstName = 'First name is required';
			} else if (!/^[A-Za-z ]{3,}$/.test(formData.firstName.trim())) {
				newErrors.firstName = 'First name is wrong';
			} else {
				delete newErrors.firstName;
			}
		} else if (fieldName === 'lastName') {
			if (formData.firstName.trim() === '') {
				newErrors.firstName = 'Last name is required';
			} else if (!/^[A-Za-z ]{3,}$/.test(formData.lastName.trim())) {
				newErrors.lastName = 'Last name is wrong';
			} else {
				delete newErrors.lastName;
			}
		} else if (fieldName === 'email') {
			if (formData.email.trim() === '') {
				newErrors.email = 'Email is required';
			} else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
				newErrors.email = 'Invalid email format';
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
		// Additional client-side validation, e.g., checking if all required fields are filled
		if (Object.values(formData).some((value) => value.trim() === '')) {
			alert('Please fill in all required fields.');
			return;
		}
		// Send form data to the server using Axios
		try {
			const data = {
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				password: formData.password,
			};
			const response = await dispatch(signup(data));

			if (response.payload.status === 200) {
				toast.success('Signup is successfull', {
					theme: 'colored',
					type: 'success',
				});
				navigate('/Login');
			} else if (response.payload.status === 404) {
				toast.error('Endpoint does not exist', {
					theme: 'colored',
					type: 'error',
				});
			}
			//Clear the form
			setFormData({
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: '',
			});
		} catch (error) {
			//setserverErrors('Email has been used already');
			console.error('Error:', error);
			toast.error('Email already exists', { theme: 'colored', type: 'error' });
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
							<div className="w-full flex flex-col items-center gap-[8px]">
								<div className="text-4xl font-bold">Sign Up</div>
								<div>Create new account by providing your details</div>
							</div>
							<div className="flex gap-1">
								Create
								<Link className=" text-blue-500 underline" to="/signupbusiness">
									Business Account
								</Link>
							</div>
						</div>

						<form
							action=""
							className="flex flex-col w-full gap-2"
							onSubmit={handlesubmit}
						>
							<div className="flex gap-2 flex-col lg:flex-row">
								<TxtField
									fieldType="text"
									id="firstname"
									imgUrl={userIcon}
									onchange={handleChange}
									fieldName="firstName"
									placeholder="john"
									onblur={() => handleBlur('firstName')}
									value={formData.firstName}
									label="First Name"
								/>
								<TxtField
									fieldType="text"
									id="lastName"
									imgUrl={userIcon}
									onchange={handleChange}
									fieldName="lastName"
									placeholder="doe"
									onblur={() => handleBlur('lastName')}
									value={formData.lastName}
									label="Last Name"
								/>
							</div>
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
								className="top-10 h-0.5  bg-gray-400 w-1/2 md:w-1/2"
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
							Already a member?
							<div className="text-blue-500 underline">
								<Link to={'/login'}>Sign in</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignupCustomer;
