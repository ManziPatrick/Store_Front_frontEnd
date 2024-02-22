import Oops from '../../assets/animations/oops.gif';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div className="h-screen w-screen flex flex-col justify-start items-center">
			<img src={Oops} alt="oops" width="250" height="250" className="mb-10" />
			<div className=" flex  items-center gap-4 mb-6">
				<p className="text-xl font-bold text-blue-600">401</p>
				<div className="h-2 w-6 bg-blue-600"></div>
				<p className="text-xl font-bold  text-blue-600">UNAUTHORIZED</p>
			</div>
			<p className="text-md text-center md:text-md md:p-6">
				Your authorization failed, to access the page please log in as
				authorized user
			</p>

			<button
				type="submit"
				className="w-48 md:48 md:px-4 text-white rounded-md bg-blue-600 px-8 py-2 mt-4"
				onClick={handleGoBack}
			>
				Go Back
			</button>
		</div>
	);
};

export default Unauthorized;
