import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ManagerSideBar from '../../../components/ManagerSideBar/ManagerSideBar';
import ManagerNavBar from '../../../components/ManagerNavBar/ManagerNavBar';
import './homeDashboard.css';
import dropdown from './../../../assets/icons/arrowdown2.svg';
import CustomButton from '../../../components/Custombutton/CustomButton';
import customImg from './../../../assets/managerHome/customise.svg';
import addProduct from './../../../assets/managerHome/addProduct.svg';
import addDomain from './../../../assets/managerHome/domain.svg';
import setPayment from './../../../assets/managerHome/setPayment.svg';
import shipping from './../../../assets/managerHome/shipping.svg';
import DecodeToken from '../../../utils/token';
import { useNavigate } from 'react-router-dom';

interface ItemsProps {
	id: number;
	title: string;
	desc: string;
	imgLoc: string;
	status: boolean;
	complete: boolean;
	buttonTxt: string;
	linkTo: string;
}

const HistoryDashboard: React.FC = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const [showSideBar, setShowSideBar] = useState(width > 770);
	const decodedToken = DecodeToken();
	const businessName = decodedToken?.businessName;

	const handleWindowSizeChange = () => {
		const newWidth = window.innerWidth;
		setWidth(newWidth);
		// Update showSideBar based on the new window width
		setShowSideBar(newWidth > 770);
	};

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	const toggleSidebar = () => {
		setShowSideBar(!showSideBar);
	};

	const [itemsList, setItemsList] = useState<ItemsProps[]>([
		{
			id: 1,
			title: 'Customise store',
			desc: 'Add pages, descriptions and customize your website how you want it',
			imgLoc: customImg,
			status: false,
			complete: true,
			buttonTxt: 'Customise store',
			linkTo: '/shopnest',
		},
		{
			id: 2,
			title: 'Add product',
			desc: 'Add pages, descriptions and customize your website how you want it',
			imgLoc: addProduct,
			status: false,
			complete: false,
			buttonTxt: 'Add product',
			linkTo: '/managerdashboard/addproduct',
		},
		{
			id: 3,
			title: 'Setup shipping',
			desc: 'Add pages, descriptions and customize your website how you want it',
			imgLoc: shipping,
			status: false,
			complete: false,
			buttonTxt: 'Set payment',
			linkTo: '',
		},
		{
			id: 4,
			title: 'Set Up Payment',
			desc: 'Add pages, descriptions and customize your website how you want it',
			imgLoc: setPayment,
			status: false,
			complete: false,
			buttonTxt: 'Set shipping and delivery',
			linkTo: '',
		},
		{
			id: 5,
			title: 'Add domain',
			desc: 'Add pages, descriptions and customize your website how you want it',
			imgLoc: addDomain,
			status: false,
			complete: false,
			buttonTxt: 'Set shipping and delivery',
			linkTo: '',
		},
	]);

	const [progressBarCount, setProgressbarCount] = useState(0);

	const handleInteraction = (itemId: number) => {
		setItemsList((prevItemsList) => {
			const updatedItemsList = prevItemsList.map((item) => {
				// Toggle the clicked item, set others to false
				return { ...item, status: item.id === itemId ? !item.status : false };
			});
			return updatedItemsList;
		});
	};

	// progress bar is calculated here
	useEffect(() => {
		let completeProgress = 0;
		itemsList.map((singleitem) =>
			singleitem.complete ? (completeProgress += 1) : (completeProgress += 0)
		);

		setProgressbarCount(completeProgress);
	}, [itemsList]);

	const [scrollheight, setScrollHeight] = useState<number>(32);

	const myElementRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		setTimeout(() => {
			if (myElementRef.current) {
				const scrollHeight = myElementRef.current.scrollHeight;
				setScrollHeight(scrollHeight);
			}
		}, 2000);
	}, []);
	const navigate = useNavigate();
	const handleNavigation = (url: string) => {
		navigate(url);
	};

	return (
		<div className="flex flex-col md:flex-row h-screen">
			<ManagerNavBar toggleSideBar={toggleSidebar} currentPage="Home" />
			<ManagerSideBar
				activeTab="Home"
				openSideBar={showSideBar}
				toogleNavbar={toggleSidebar}
			/>
			<div className="Homedash">
				<div className="contentContainer">
					<h2 className="capitalize">Welcome back, {businessName}</h2>
					<div className="section2">
						<h3>Let's set up your store</h3>
						<div className="progressInfo">
							{progressBarCount} out of {4} completed
						</div>
						<div className="progresscontainer">
							<div
								// className="progressbar"
								style={{
									width: `${(progressBarCount / 4) * 100}%`,
									background: '#0408e7',
									height: '8px',
									borderRadius: '4px',
								}}
							></div>
						</div>
					</div>
					<div className="homeItems">
						{itemsList.map((itemsection, index) => (
							<div
								key={itemsection.id}
								className="item1"
								ref={myElementRef}
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									flexDirection: 'column',
									//marginBottom: '10px',
									height: `${itemsection.status ? scrollheight + 'px' : '32px'}`,
									overflowY: 'hidden',
									overflowX: 'hidden',
									transition: 'height 0.3s ease',
								}}
							>
								{/* <div className="itemInnerContainer"> */}
								<div className="itemhead">
									<div>
										<div
											className="itemNumber"
											style={{
												backgroundColor: '#f2f5ff',
												borderRadius: '50%',
												width: '32px',
												height: '32px',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												fontSize: '18px',
												fontStyle: 'normal',
												fontWeight: '400',
												border: itemsection.status
													? 'solid 1px #0F3CD9'
													: 'none',
												boxShadow: itemsection.status
													? '0px 2px 4px #0F3CD9'
													: 'none',
											}}
										>
											{index + 1}
										</div>
										<h4>{itemsection.title}</h4>
									</div>
									<img
										src={dropdown}
										style={{
											transform: itemsection.status
												? 'rotate(180deg)'
												: 'rotate(0deg)',
											transition: 'height 0.3 ease',
										}}
										onClick={() => handleInteraction(itemsection.id)}
										alt=""
									/>
								</div>
								<div className="itembody">
									<div className="descbut">
										<div className="description">{itemsection.desc}</div>
										<CustomButton
											bgColor="#0F3CD9"
											borderProps={['none']}
											buttonText={itemsection.title}
											buttonType="button"
											handleClick={() => handleNavigation(itemsection.linkTo)}
											paddingProps={['12px', '12px']}
											rounded="6px"
											txtColor="#FFF"
											className={''}
										/>
									</div>
									<img className="itemImg" src={itemsection.imgLoc} alt="" />
								</div>
								{/* </div> */}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HistoryDashboard;
