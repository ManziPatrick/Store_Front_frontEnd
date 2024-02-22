import React, { useEffect, useState } from 'react';
import History from '../../../components/DashBoard/History/History';
import CustomerNavBar from '../../../components/CustomerNavbar/CustomerNavBar';
import CustomerSideBar from '../../../components/CustomerSideBar/CustomerSideBar';

const HistoryDashboard: React.FC = () => {
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
				activeTab="History"
				openSideBar={showSideBar}
				toogleNavbar={toggleSidebar}
			/>
			{/* <div className="absolute bottom-0 right-0 h-[90vh] w-[85vw] md:w-[100vw] flex justify-center"> */}
			<History />
			{/* </div> */}
		</>
	);
};

export default HistoryDashboard;
