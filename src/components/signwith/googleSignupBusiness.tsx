import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';

interface GoogleLoginButtonProps {
	googleServerUrl: string;
}

const decodeBase64Code = (base64encoded: string) => {
	try {
		return JSON.parse(atob(base64encoded));
	} catch (error) {
		toast.error('Error decoding or parsing the code', {
			theme: 'colored',
			type: 'error',
		});
		return null;
	}
};

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
	googleServerUrl,
}) => {
	const navigate = useNavigate();
	const formRef = useRef<HTMLFormElement | null>(null);
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const codeParam = queryParams.get('code');
	const statusParam = queryParams.get('status');
	const [loading, setLoading] = useState(false);
	const [, setToken] = useState<string | null>(null);

	const handleLogin = (
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		event.preventDefault();
		if (formRef.current) {
			setLoading(true);
			formRef.current.submit();
		}
	};

	useEffect(() => {
		if (codeParam && statusParam === 'success') {
			const decodedCode = decodeBase64Code(codeParam);

			if (decodedCode && decodedCode.status === 200) {
				const { token, user } = decodedCode.data;
				setToken(token);
				setToken(token);
				localStorage.setItem('user', user.role);
				localStorage.setItem('token', token);

				const responseData = JSON.stringify(decodedCode.data);
				localStorage.setItem('response', responseData);

				const role = user.role;
				const isFirstTimeLogin = user.isFirstTimeLogin;
				localStorage.setItem('isfirstlogin', isFirstTimeLogin);
				if (role === 'CLIENT') {
					const redirectUrl = isFirstTimeLogin
						? '/firstloginpagecustomer'
						: '/dashboard';

					if (redirectUrl) {
						toast.error('login successfull', {
							theme: 'colored',
							type: 'success',
						});
						setTimeout(() => {
							navigate(redirectUrl);
						},2000)
						return;
					}
				} else {
					toast.error('Invalid role or isFirstTimeLogin value', {
						theme: 'colored',
						type: 'error',
					});
				}
			} else {
				toast('login failed', { theme: 'colored', type: 'error' });
				navigate('/');
			}
		} else if (statusParam === 'error') {
			toast.error('login failed', {
				autoClose: 8000,
				onClose: () => {
					navigate('/signupcustomer');
				},
			});
		}

		setLoading(false);
	}, [navigate, codeParam, statusParam]);

	return (
		<div className="w-full">
			<form
				ref={formRef}
				action={`${googleServerUrl}/api/v1/auth/google`}
				method="GET"
				style={{ display: 'none' }}
			></form>

			<a
				className={`text-black border-2 border-[#D7DFE9] bg-white focus:outline-none font-medium rounded-lg text-sm px-8 py-2 inline-flex dark:focus:ring-[#3b5998]/55 w-full justify-center ${
					loading ? 'opacity-20' : ''
				}`}
				href="#"
				onClick={handleLogin}
			>
				{loading ? (
					<div className="flex items-center justify-center">
						Loading...
						<div className="inline-block ml-2 w-4 h-4 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
					</div>
				) : (
					<>
						<Icon icon="devicon:google" className="h-4 w-4  mr-2" />
						Google
					</>
				)}
			</a>
		</div>
	);
};

export default GoogleLoginButton;
