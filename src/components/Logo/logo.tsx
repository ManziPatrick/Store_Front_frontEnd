import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
const Logo = () => {
	const logoStyles: CSSProperties = {
		color: '#0085FF',
		fontFamily: 'Poppins',
		fontSize: '24px',
		fontWeight: 'bold',
		textTransform: 'capitalize',
		letterSpacing: '1px',
		width: 'fit-content',
	};

	return (
		<Link className="w-fit" to={'/'}>
			<div className="text-2xl" style={logoStyles}>
				Storefront
			</div>
		</Link>
	);
};

export default Logo;
