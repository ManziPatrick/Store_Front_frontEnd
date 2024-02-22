import { useEffect, useState } from 'react';
import ManagerNavBar from '../../components/ManagerNavBar/ManagerNavBar';
import ManagerSideBar from '../../components/ManagerSideBar/ManagerSideBar';

import ChartComponent from './ChartComponent';
import NumberDisplay from '../../components/NumberDisplay/NumberDisplay';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { getAllProductsOwner } from '../../redux/actions/businessproducts';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { getManagerAllOrders } from '../../redux/actions/managerOrder';

interface IStats {
	totalProducts: number;
	productsSold: number;
	orders: number;
	customers: number;
}

const Analytics = () => {
	const itemsPerPage = 7;

	const [width, setWidth] = useState(window.innerWidth);
	const [showSideBar, setShowSideBar] = useState(width > 770);

	const { pages } = useSelector((state: RootState) => state.ProductsSlice);
	const { orders } = useSelector((state: RootState) => state.getManagerOrders);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllProductsOwner({ page: 1, itemsPerPage: itemsPerPage }));
		const fetchData = async () => {
			try {
				await dispatch(getManagerAllOrders());
				// setOrder(response.payload.orders);
			} catch (error) {
				console.error('Error fetching orders:', error);
			}
		};

		fetchData();
	}, [dispatch]);

	const stats: IStats = {
		totalProducts: pages * itemsPerPage,
		productsSold: 20,
		orders: orders.length,
		customers: 10,
	};

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
		<div>
			<ManagerNavBar toggleSideBar={toggleSidebar} />
			<ManagerSideBar
				activeTab="Analytics"
				openSideBar={showSideBar}
				toogleNavbar={toggleSidebar}
			/>
			<div className="md:fixed static top-[10vh] mt-[10vh] md:mt-0  left-[0vw] md:left-[19vw] lg:left-[15vw] md:w-[80vw] lg:w-[85vw] w-[100vw] h-[90vh] px-[10px] py-[20px]">
				<div className="flex flex-col gap-[20px] items-center h-full">
					<div className="flex justify-between w-full flex-col md:flex-row gap-[10px]">
						<h2 className="font-[600] text-[22px] leading-[35px] tracking-[-0.3px]">
							Analytics
						</h2>
					</div>

					<div className="flex w-[100%] flex-wrap justify-around gap-y-[10px]">
						{Object.keys(stats).map((key, index) => (
							<div
								key={index}
								className=" px-[40px] py-[30px] rounded-[10px] shadow-md text-white bg-gradient-to-r from-cyan-500 to-blue-500 w-[44%] md:w-[22%] flex flex-col  items-center"
							>
								<h1 className="text-[40px] font-[400]">
									<NumberDisplay value={stats[key as keyof IStats]} />
								</h1>
								<p>{key}</p>
							</div>
						))}
					</div>

					<div className="flex w-[98%] flex-grow">
						<div className="flex flex-col lg:flex-row w-full gap-[20px]">
							<div className="flex flex-col justify-center capitalize shadow-xl w-full lg:w-[30%] rounded-[6px] p-[10px]">
								<h1 className="text-[24px] font-[400] text-blue-700">
									Revenue
								</h1>
								<div>
									<h1 className="text-[40px] font-[400] flex items-center">
										2306 <div className="text-[24px]">$</div>
									</h1>
									<p>Past year</p>
								</div>
								<div className="flex flex-col items-start gap-[10px]">
									<p>by platform</p>
									<div className="w-full">
										<p>Web</p>
										<div className="w-[100%] border">
											<div className="w-[50%] h-[10px] bg-cyan-700"></div>
										</div>
									</div>
									<div className="w-full">
										<p>Mobile</p>
										<div className="w-[100%] border">
											<div className="w-[80%] h-[10px] bg-cyan-700"></div>
										</div>
									</div>
								</div>
							</div>
							<div className="flex w-full  lg:w-[70%] p-[10px] shadow-xl ">
								<ChartComponent />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Analytics;
