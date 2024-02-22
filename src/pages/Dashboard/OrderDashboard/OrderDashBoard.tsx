import React, { useEffect, useState } from 'react';

import Orders from '../../../components/DashBoard/Orders/Orders';
import CustomerNavBar from '../../../components/CustomerNavbar/CustomerNavBar';
import CustomerSideBar from '../../../components/CustomerSideBar/CustomerSideBar';

const OrderDashboard: React.FC = () => {
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
				activeTab="Orders"
				openSideBar={showSideBar}
				toogleNavbar={toggleSidebar}
			/>
			<div className="md:fixed static top-[10vh] mt-[10vh] md:mt-0 left-[0vw] md:left-[19vw] lg:left-[15vw] md:w-[80vw] lg:w-[85vw] w-[100vw]  h-[90vh]">
				<Orders />
			</div>
		</>
	);
};

export default OrderDashboard;
