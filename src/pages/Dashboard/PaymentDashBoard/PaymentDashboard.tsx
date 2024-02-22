import React, { useEffect, useState } from 'react';
import PaymentOption from '../../../components/DashBoard/PaymentOption/PaymentOption';
import CustomerNavBar from '../../../components/CustomerNavbar/CustomerNavBar';
import CustomerSideBar from '../../../components/CustomerSideBar/CustomerSideBar';

const PaymentDashboard: React.FC = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const [showSideBar, setShowSideBar] = useState(width > 770);

	const handleWindowSizeChange = () => {
		const newWidth = window.innerWidth;
		setWidth(newWidth);
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
				activeTab="Payment Option"
				openSideBar={showSideBar}
				toogleNavbar={toggleSidebar}
			/>

			<PaymentOption />
		</>
	);
};

export default PaymentDashboard;
