import { Link, useParams } from 'react-router-dom';
import GifImage from '../../assets/icons/images/animation_lnvt3hcy_small.gif';
import { useState } from 'react';
import URL from '../../utils/api';
const Veriflied = () => {
	const { verificationToken } = useParams();

	const [, setResponseData] = useState(null);

	const fetchDataFromBackend = async () => {
		try {
			const response = await URL.get(
				`/api/v1/auth/customers/business/verify-business/${verificationToken}`
			);
			const responseData = response.data;
			setResponseData(responseData);
		} catch (error) {
			console.error('Error fetching data from the backend:', error);
		}
	};
	fetchDataFromBackend();
	return (
		<div className="h-screen w-screen flex flex-col justify-center items-center">
			<div className=" flex flex-col  items-center gap-4 mb-6">
				<img src={GifImage} alt="GIF veried" />
				<h1 className="text-xl  text-blue-600">Signup Successful</h1>
				<div className="h-2 w-6 bg-blue-600"></div>
				<p className="text-xl  text-blue-600">
					Your account has been successfully created.
				</p>
			</div>

			<Link to="/login">
				<button
					className=" text-white rounded-xl bg-blue-600 px-8 py-2 mt-4"
					type="submit"
				>
					Login
				</button>
			</Link>
		</div>
	);
};
export default Veriflied;
