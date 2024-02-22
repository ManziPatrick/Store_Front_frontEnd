import React, { useEffect } from 'react';
import Button from '../../components/Bluebutton/Bluebutton';
import { Text } from '../../components/fistcustomerlogin/searchField';
import { useState } from 'react';
import './firstlogin.css';
import { Link } from 'react-router-dom';
import { Img } from '../../components/fistcustomerlogin/lmage';
import HeaderComponent from '../../components/fistcustomerlogin/header';

type Template = {
	id: string;
	business_id: string;
	category_id: string;
	thumbanail: string;
	createdAt: string;
	updatedAt: string;
	BusinessName: {
		businessName: string;
	};
};

const ChooseTemplete: React.FC = () => {
	const [isImageSelected, setImageSelected] = useState(true);
	const [templates, setTemplates] = useState<Template[]>([]);
	const [, setSelectedTemplate] = useState<Template | null>(null);

	useEffect(() => {
		const cloudinaryLinksURL = `${process.env.VITE_BN_APP_API_BASE_URL}/api/v1/cloudinary-links`;
		fetch(cloudinaryLinksURL)
			.then((response) => response.json())
			.then((data) => {
				setTemplates(data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, [isImageSelected]);

	return (
		<>
			<HeaderComponent
				backLink="/firstloginpagecustomer"
				skipLink="/shopnest"
				Width="3/4"
			/>

			<div className="flex flex-col font-inter gap-8 items-center justify-center max-w-full mx-auto md:px-5 w-full">
				<div className="head">
					<Text className="head text-center">List of stores</Text>
					<Text className="paragraph text-center">
						Don’t worry you can always change this later{' '}
					</Text>
				</div>

				<div className="grid md:grid-cols-4 w-4/5 grid-cols-1 md:gap-y-[40px] sm:w-full">
					{templates.map((template, index) => (
						<div key={index}>
							<Img
								className="ml-3 md:w-full w-[300px] h-[300px] shadow-[rgba(0,0,0,0.24)0px3px8px] object-cover"
								src={template.thumbanail}
								alt={template.BusinessName.businessName}
								onClick={() => {
									setImageSelected(false);
									setSelectedTemplate(template);
								}}
							/>
							<Text className="font-bold ml-5 mt-3">
								{template.BusinessName.businessName}
							</Text>
						</div>
					))}
				</div>
				<Link
					className="choosetemplete mb-6 w-1/3"
					to="/dashboard"
					onClick={() => {
						window.open('/shopnest', '_blank');
					}}
				>
					<Button
						buttonText={'Continue'}
						disabled={isImageSelected}
						isLoading={false}
					/>
				</Link>
			</div>
		</>
	);
};

export default ChooseTemplete;
