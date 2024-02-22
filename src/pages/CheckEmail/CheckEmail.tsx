// ForgotPasswordPage.tsx
import Background from '../../assets/images/background.jpeg';

import React from 'react';

const CheckEmail: React.FC = () => {
	return (
		<div className="flex flex-col min-h-screen md:flex-row">
			<div className="w-full md:w-1/2 hidden md:block">
				<img
					src={Background}
					className="w-full h-screen object-cover"
					alt="Background"
				/>
				<div className="absolute bottom-0 left-0 right-50 text-white p-2">
					<p className="text-2xl m-12 font-light">
						Welcome to our Storefront App! Get ready to <br />
						showcase, sell, and succeed. Customize, manage, <br />
						engage. We're here for you. Let's thrive together!
					</p>
				</div>
			</div>

			<div className="w-full md:w-1/2 flex items-center justify-center ">
				<div className="max-w-md p-4">
					<div className="pb-6 mb-6 gap-2 justify-center items-end ml-10">
						<p className="text-[#0085FF] font-black text-2xl pb-2 ml-12">
							Store Front
						</p>
						<h2 className="text-3xl font-bold pb-2 ml-8">check your email</h2>
						<span className="font-light text-sx">
							a link has been sent via email to reset password. For any
							<br /> questions or concerns, please dont hesitate to contact our{' '}
							<br /> support team at @supportamalitech.com
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckEmail;
