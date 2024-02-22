import React, { useEffect, useState } from 'react';
import EditProduct from '../../../components/DashBoard/EditProduct/EditProduct';
import ManagerNavBar from '../../../components/ManagerNavBar/ManagerNavBar';
import ManagerSideBar from '../../../components/ManagerSideBar/ManagerSideBar';

const EditProductDashboard: React.FC = () => {
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
				activeTab="Products"
				openSideBar={showSideBar}
				toogleNavbar={toggleSidebar}
			/>

			<div className="md:fixed static md:top-[10vh] mt-[10vh] md:mt-0  left-[0vw] md:left-[19vw] lg:left-[15vw] md:w-[80vw] lg:w-[85vw] w-[100vw]  md:h-[90vh] h-auto p-5 ">
				<EditProduct />
			</div>
		</>
	);
};

export default EditProductDashboard;
