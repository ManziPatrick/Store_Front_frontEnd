import React, { useEffect, useState } from 'react';
import CustomerProduct from '../../../components/DashBoard/CustomerProduct/CustomerProduct';
import CustomerSideBar from '../../../components/CustomerSideBar/CustomerSideBar';
import CustomerNavBar from '../../../components/CustomerNavbar/CustomerNavBar';

const CustomerDashboard: React.FC = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const [showSideBar, setShowSideBar] = useState(width > 770);

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

	return (
		<>
			<CustomerNavBar toggleSideBar={toggleSidebar} />
			<CustomerSideBar
				activeTab="Shop"
				openSideBar={showSideBar}
				toogleNavbar={toggleSidebar}
			/>
			<div className="md:fixed static top-[10vh] mt-[10vh] md:mt-0  left-[0vw] md:left-[19vw] lg:left-[15vw] md:w-[80vw] lg:w-[85vw] w-[100vw]  h-[90vh]">
				<CustomerProduct />
			</div>
		</>
	);
};

export default CustomerDashboard;
