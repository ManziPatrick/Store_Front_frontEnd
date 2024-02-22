import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const listData = {
	Menu: ['Men', 'Women', 'Shoes', 'Accessories'],
	Features: ['About', 'Contact', 'My Account', 'Order List', 'My Wishlist'],
	Help: ['Customer Service', 'Size Guide', 'Contact'],
	'Delivery and Payment': ['Purchase Items', 'Guarantee'],
};

const Footer: React.FC = () => {
	return (
		<footer className="w-full">
			<div className="flex flex-col w-full">
				<div className=" flex items-center justify-center py-7 bg-[#F9FAFB]">
					<ul className="flex flex-wrap gap-5 justify-around w-full">
						{[
							'Duties',
							'FreeExpress',
							'Customer Love',
							'Easy Return',
							'Secure Payment',
						].map((item, index) => (
							<li key={index} className="flex items-center">
								<FontAwesomeIcon icon={faCheck} className="text-black mr-2" />
								{item}
							</li>
						))}
					</ul>
				</div>
				<div>
					<div className=" text-white bg-gray-500 px-10 py-10 items-center flex justify-between flex-col md:flex-row">
						<div className="flex  flex-col items-center md:items-start">
							<h2 className="text-3xl font-bold mb-4">
								Subscribe to Newsletter
							</h2>
							<p className="text-sm font-normal text-center md:text-center ">
								Be aware of upcoming sales and events. Receive gifts and special
								offers!
							</p>
						</div>
						<button className="w-44 bg-transparent font-bold border-2 border-black text-black mt-4 px-4 py-2 md:text-sm md:px- md:py-2">
							SUBSCRIBE NOW
						</button>
					</div>
					<div className=" bg-black text-white flex flex-wrap justify-start md:justify-around pt-10 pb-10 md:pb-32 gap-y-5 px-[5%]">
						<div className="w-[45%] md:w-auto">
							<h1 className="text-2xl font-bold mb-2 font-sans ">Shopnest</h1>
						</div>

						{Object.entries(listData).map(([key, values], index) => (
							<div key={index} className="font-sans w-[45%] md:w-auto">
								<h1 className="text-2xl font-bold mb-2">{key}</h1>
								<ul className="text-sm font-light mt-4">
									{values.map((value, idx) => (
										<li key={idx}>
											<Link to={`/shopnest/${value.toLowerCase()}`}>
												{value}
											</Link>
											{/* Add a Link for each item */}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
