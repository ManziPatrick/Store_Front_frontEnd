import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';

interface FacebookLoginButtonProps {
	facebookServerUrl: string;
}

const decodeBase64Code = (base64encoded: string) => {
	try {
		return JSON.parse(atob(base64encoded));
	} catch (error) {
		console.error('Error decoding or parsing the code:', error);
		return null;
	}
};

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
	facebookServerUrl,
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

				const responseData = JSON.stringify(decodedCode.data);
				localStorage.setItem('response', responseData);

				const role = user.role;
				const isFirstTimeLogin = user.isFirstTimeLogin;
				localStorage.setItem('isfirstlogin', isFirstTimeLogin);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const roleRedirects: Record<string, any> = {
					CLIENT: {
						true: '/firstloginpagecustomer',
						false: '/dashboard',
					},
					ADMIN: {
						true: '/firstloginpagebusiness',
						false: '/managerdashboard',
					},
					MANAGER: {
						true: '/firstloginpagebusiness',
						false: '/managerdashboard',
					},
				};
				const redirectUrl = roleRedirects[role][isFirstTimeLogin];
				if (redirectUrl) {
					window.location.href = redirectUrl;
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
				action={`${facebookServerUrl}/api/v1/auth/facebook`}
				method="GET"
				style={{ display: 'none' }}
			></form>
			<a
				className={`text-black bg-white border-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center flex items-center dark:focus:ring-[#3b5998]/55 justify-center w-full ${
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
						<Icon
							icon="basil:facebook-solid"
							color="blue"
							className=" h-4 w-5  mr-2"
						/>
						Facebook
					</>
				)}
			</a>
		</div>
	);
};

export default FacebookLoginButton;
