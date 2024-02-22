import React, { useEffect, useState } from 'react';
import Customer from '../../../components/DashBoard/Customer/Customer';
import ManagerSideBar from '../../../components/ManagerSideBar/ManagerSideBar';
import ManagerNavBar from '../../../components/ManagerNavBar/ManagerNavBar';

const CustomDashboard: React.FC = () => {
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
		<div className="flex flex-col md:flex-row h-screen">
			<div className="h-1/5">
				<ManagerNavBar toggleSideBar={toggleSidebar} />
			</div>
			<div className="flex-1 flex">
				{/* Hide the Sidebar on small screens (sm and below) */}

				<ManagerSideBar
					activeTab="Customers"
					openSideBar={showSideBar}
					toogleNavbar={toggleSidebar}
				/>

				<div className="w-full md:w-full">
					<Customer />
				</div>
			</div>
		</div>
	);
};

export default CustomDashboard;
