import { CSSProperties } from 'react';
import Background from '../../assets/images/background.jpeg';

const ForgotPasswordImage = () => {
	const description: string =
		"Welcome to our Storefront App! Get ready to showcase, sell, and succeed. Customize, manage, engage. We're here for you. Let's thrive together!";

	const descriptionStyles: CSSProperties = {
		fontFamily: 'Inter',
		fontSize: '20px',
		fontWeight: '400',
		lineHeight: '36px',
		letterSpacing: '-0.4000000059604645px',
		textAlign: 'center',
		color: 'white',
		width: '80%',
	};

	return (
		<div
			className="hidden lg:flex w-1/2 lg:h-screen items-end justify-center pb-5"
			style={{
				backgroundImage: `url(${Background})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
			}}
		>
			<div style={descriptionStyles}>{description}</div>
		</div>
	);
};

export default ForgotPasswordImage;
