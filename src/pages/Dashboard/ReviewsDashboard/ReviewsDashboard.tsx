import React, { useEffect, useState } from 'react';
import Review from '../../../components/DashBoard/Review/Review';
import ManagerNavBar from '../../../components/ManagerNavBar/ManagerNavBar';
import ManagerSideBar from '../../../components/ManagerSideBar/ManagerSideBar';

const ReviewDashboard: React.FC = () => {
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
			<ManagerNavBar toggleSideBar={toggleSidebar} />
			<div className="flex-1  flex relative">
				{/* Hide the Sidebar on small screens (sm and below) */}

				<ManagerSideBar
					activeTab="Reviews"
					openSideBar={showSideBar}
					toogleNavbar={toggleSidebar}
				/>

				<div className="w-full md:w-full relative">
					<Review />
				</div>
			</div>
		</div>
	);
};

export default ReviewDashboard;
