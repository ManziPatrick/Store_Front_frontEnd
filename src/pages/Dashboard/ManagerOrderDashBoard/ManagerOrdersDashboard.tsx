import { useState, useEffect } from 'react';
import ManagerNavBar from '../../../components/ManagerNavBar/ManagerNavBar';
import ManagerSideBar from '../../../components/ManagerSideBar/ManagerSideBar';
import ManagerOrders from '../../../components/DashBoard/ManagerOrders/ManagerOrders';

const ManagerOrdersDashboard = () => {
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
			<ManagerNavBar toggleSideBar={toggleSidebar} />

			<ManagerSideBar
				activeTab="Orders"
				openSideBar={showSideBar}
				toogleNavbar={toggleSidebar}
			/>

			<div className="md:fixed static top-[10vh] mt-[10vh] md:mt-0  left-[0vw] md:left-[19vw] lg:left-[15vw] md:w-[80vw] lg:w-[85vw] w-[100vw]  h-[90vh] ">
				<ManagerOrders />
			</div>
		</>
	);
};

export default ManagerOrdersDashboard;
