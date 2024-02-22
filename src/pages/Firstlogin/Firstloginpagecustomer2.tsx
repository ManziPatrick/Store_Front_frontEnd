import React, { useRef, useState, useEffect, useCallback } from 'react';
import './firstlogin.css';
import Button from '../../components/Bluebutton/Bluebutton';
import { CloseSVG } from '../../components/fistcustomerlogin/close';
import {
	Text,
	Input,
	Img,
} from '../../components/fistcustomerlogin/searchField';

import SearchSVG from '../../assets/icons/Iconserch.svg';

import { Link } from 'react-router-dom';
import URL from '../../utils/api';
import HeaderComponent from '../../components/fistcustomerlogin/header';
interface Category {
	title: string;
}
const HomebusinessPage: React.FC = () => {
	const [inputValue, setInputValue] = useState<string>('');
	const textContainerRef = useRef<HTMLDivElement | null>(null);
	const [filteredData, setFilteredData] = useState<string[]>([]);
	const [responseData, setResponseData] = useState<{ [key: string]: Category }>(
		{}
	);
	const [searchQuery, setSearchQuery] = useState('');
	const [isOnlineStoreSelected, setIsOnlineStoreSelected] = useState(false);

	const fetchDataFromBackend = async () => {
		try {
			const response = await URL.get('/api/v1/store/categories');
			const responseData = response.data;
			setResponseData(responseData);
		} catch (error) {
			console.error('Error fetching data from the backend:', error);
		}
	};

	const applyFilter = useCallback(() => {
		const filteredTitles = Object.values(responseData)
			.filter((item) => {
				if (item && item.title) {
					return item.title.toLowerCase().includes(searchQuery.toLowerCase());
				}
				return false;
			})
			.map((item) => item.title);

		setFilteredData(filteredTitles);
	}, [searchQuery, responseData]);

	useEffect(() => {
		fetchDataFromBackend();
	}, []);

	useEffect(() => {
		applyFilter();
	}, [searchQuery, applyFilter]);

	const handleScroll = () => {
		if (textContainerRef.current) {
			const container = textContainerRef.current;
			const scrollable = container.scrollHeight - container.clientHeight;
			const scrollY = container.scrollTop;
			const scrollPercent = (scrollY / scrollable) * 100;
			container.style.setProperty('--scrollThumb', scrollPercent + '%');
		}
	};

	const handleItemClick = (item: Category) => {
		setIsOnlineStoreSelected(
			item.title === 'Online Store' || filteredData.includes('Online Store')
		);
	};

	return (
		<>
			<HeaderComponent backLink="" skipLink="/choosetemplete" Width="2/3" />

			<div className="flex flex-col font-inter gap-8 items-center justify-center px-5 md:w-auto w-full">
				<div className="header flex flex-col gap-4 items-center justify-center  md:w-[60%] w-full">
					<Text className="head text-center">
						Which type of website do you want to explore
					</Text>
					<Text className="paragraph text-center">
						Let us have an idea of the website you want to create so that we can
						tailor your storefront experience for you
					</Text>
				</div>
				<div className="flex flex-col items-start justify-start max-w-[681px] w-full">
					<div className="flex flex-col gap-[16px] items-start justify-start w-[95%]">
						<Input
							name="input"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setSearchQuery(e.target.value)
							}
							placeholder="Search for your business or website type"
							className="font-medium p-0  focus:outline-none placeholder:text-blue_gray-300 text-blue_gray-300 text-left text-sm tracking-[-0.20px] w-full"
							wrapClassName="bg-gray-50 border-blue_gray-200 border-solid flex px-3.5 py-[13px] w-[100%]"
							suffix={
								inputValue?.length > 0 ? (
									<CloseSVG
										className="cursor-pointer h-5 ml-[35px] my-auto"
										fillColor="#8797ae"
										height={20}
										width={20}
										viewBox="0 0 20 20"
										onClick={() => setInputValue('')}
									/>
								) : (
									<Img
										className="cursor-pointer h-5 ml-[35px] my-auto"
										src={SearchSVG}
										alt="search"
									/>
								)
							}
							value={inputValue}
						/>
						<div className="custom-scrollbar-container relative md:flex md:flex-col flex-row gap-4 items-start justify-between w-full">
							<div
								className="custom-scrollbar border border-blue_gray-200 border-solid flex md:flex-1 flex-col gap-4 items-start justify-start px-4 py-3 rounded-lg w-full md:w-full"
								onScroll={handleScroll}
								style={{
									maxHeight: '250px',
									overflowY: 'auto',
								}}
								ref={textContainerRef}
							>
								{filteredData?.length
									? filteredData.map((type, index) => (
											<div
												key={index}
												className={`text-base text-blue-gray-800 text-start tracking-[-0.30px] cursor-pointer  hover:bg-slate-300 w-full ${
													isOnlineStoreSelected && type === 'Online Store'
														? 'bg-gray-500 w-full text-start'
														: 'bg-[white]'
												}`}
												onClick={() => handleItemClick({ title: type })}
											>
												{type}
											</div>
										))
									: Object.values(responseData).map((item) => (
											<div
												key={item.title}
												className={`text-base text-blue-gray-800 text-center tracking-[-0.30px] cursor-pointer w-auto ${
													isOnlineStoreSelected && item.title === 'Online Store'
														? 'bg-gray-500 w-full text-start'
														: 'bg-[white]'
												}`}
												onClick={() => handleItemClick(item)}
											>
												{item.title}
											</div>
										))}
							</div>
						</div>
					</div>
				</div>
				<Link className="w-1/3 mb-4" to="/choosetemplete">
					<Button
						buttonText={' Continue'}
						disabled={!isOnlineStoreSelected}
						isLoading={false}
					/>
				</Link>
			</div>
		</>
	);
};

export default HomebusinessPage;
