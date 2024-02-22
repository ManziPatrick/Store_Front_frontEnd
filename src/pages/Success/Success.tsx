import React from 'react';
import { Link } from 'react-router-dom';
import congrats from '../../assets/animations/congrats.gif';
const Success: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center text-center gap-4 mt-20">
			<img src={congrats} alt="congrats" width="200" height="200" />
			<h2 className="text-4xl font-bold mt-14">Authentication successfully</h2>
			<p className="font-normal text-base">Proceed to login</p>

			{/* Use the Link component to navigate to the login page */}
			<Link to="/login">
				<button
					type="submit"
					className="w-96 bg-[#0F3CD9] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
				>
					Continue
				</button>
			</Link>
		</div>
	);
};

export default Success;
