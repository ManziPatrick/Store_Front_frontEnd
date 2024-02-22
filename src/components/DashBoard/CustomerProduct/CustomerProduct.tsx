import React, { useEffect, useState } from 'react';
import IconSearch from './../../../assets/icons/IconSearch.svg';
import URL from '../../../utils/api';
import { Link } from 'react-router-dom';

interface CloudinaryItem {
	id: string;
	business_id: string;
	category_id: string;
	thumbanail: string;
	createdAt: string;
	updatedAt: string;
	BusinessName: {
		businessName: string;
	};
}

const CustomerProduct: React.FC = () => {
	const [cloudinaryData, setCloudinaryData] = useState<CloudinaryItem[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		URL.get('/api/v1/cloudinary-links')
			.then((response) => {
				setCloudinaryData(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				console.error('Error fetching Cloudinary links:', error);
			});
	}, []);

	return (
		<div className="h-full w-full overflow-auto">
			<div className="p-4 relative">
				<div className="flex justify-center items-center ">
					<div className="relative w-96 mt-10 md:mr-4 md:w-80">
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search for your business or website type..."
							className="bg-gray-100 p-2 pl-10 pr-10 border-b w-full focus:outline-none text-sm"
						/>
						<span className="absolute inset-y-0 right-0 flex items-center justify-center pr-2">
							<img src={IconSearch} alt="Search Icon" className="h-4 w-4" />
						</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col md:flex-row flex-wrap">
				{cloudinaryData.length === 0 && loading
					? Array.from({ length: 4 }, (_, index) => (
							<div key={index} className="w-full p-2 ml-12">
								<div className="animate-pulse bg-gray-200 w-60 h-64 border rounded-md ml-6 mb-4 mx-auto md:mx-auto lg:mx-auto sm:mx-auto" />
								<div className="animate-pulse bg-gray-200 h-6 w-40 rounded-md ml-6 mx-auto md:mx-auto lg:mx-auto sm:mx-auto" />
							</div>
						))
					: cloudinaryData
							.filter((item) =>
								item.BusinessName.businessName
									.toLowerCase()
									.includes(searchQuery.toLowerCase())
							)
							.map((item) => (
								<div
									key={item.id}
									className="w-full md:w-[32%] p-2 flex flex-col gap-2 items-center"
								>
									<Link
										to=""
										onClick={() => {
											window.open('/shopnest', '_blank');
										}}
										className="w-[70%]"
									>
										<div
											className="bg-lightgray bg-cover bg-center w-[100%] h-64 border rounded-md"
											style={{ backgroundImage: `url(${item.thumbanail})` }}
										></div>
									</Link>
									<div className="text-lg font-semibold">
										{item.BusinessName.businessName}
									</div>
								</div>
							))}
			</div>
		</div>
	);
};

export default CustomerProduct;
