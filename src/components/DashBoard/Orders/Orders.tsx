import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import { Popover } from '@headlessui/react';
import Pagination from '../Pagination/Pagination';
import Loader from '../../../assets/loaders.gif';
import IconDots from '../../../assets/icons/IconDots.svg';
import CancelButton from '../../../assets/icons/cancelbutton.svg';
import MasterCard from '../../../assets/payments/mastercard.svg';
import { getAllOrders, Order } from '../../../redux/actions/getOrder';
import { deleteOrder } from '../../../redux/actions/deleteOrder';
import { RootState } from '../../../redux/store/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import emptycart from './../../../assets/icons/payment/Empty Cart.svg';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface OrderDetailsModalProps {
	order: Order;
	onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
	order,
	onClose,
}) => {
	const [selectedTab, setSelectedTab] = useState<
		'items' | 'address' | 'payment'
	>('items');

	const renderPurchasedItems = () => {
		return (
			<div>
				<div className="inline-block align-bottom bg-white rounded-lg px-4  text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full ">
					<h2 className="text-base font-extrabold text-[#455468]">
						Purchased Items
					</h2>

					<hr className="mt-3 border-gray-300" />
					<div className=" mt-2 grid grid-cols-2 gap-10">
						<div className="mt-3 flex items-start">
							<img
								src={order.product.images[0]}
								alt="Product Image"
								className="w-16 h-16 mr-4 border  rounded-lg"
							/>
							<div>
								<p className="block text-sm font-medium text-gray-700 mb-1">
									{order.product.name}
								</p>
								<p className="block text-sm font-medium text-gray-700">
									{order.quantity}
								</p>
							</div>
						</div>
						<div className="flex justify-around  mt-5 mr-3">
							<p className="block text-sm font-medium text-gray-700">
								&euro;{order.price}
							</p>
						</div>
					</div>
					<hr className=" mt-4 border-gray-300" />
					<div className="grid grid-cols-2">
						<p className="  pt-4 block text-sm font-medium text-gray-700">
							Total Price
						</p>
						<p className="flex justify-around pt-4 ml-1 text-sm font-medium text-gray-700">
							&euro;{order.totoalPrice}
						</p>
					</div>
				</div>
			</div>
		);
	};

	const renderShippingAddress = () => {
		return (
			<div className="inline-block align-bottom bg-white rounded-lg px-4  text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full ">
				<h2 className="text-base font-extrabold text-[#455468]">
					Shipped Address
				</h2>
				<hr className=" mt-4 border-gray-300" />
				<div className=" mt-4">
					<p className="block text-base  font-medium text-gray-700">Ghana</p>
					<p className="block text-base  font-medium text-gray-700">
						Anaji SSNIT
					</p>
					<p className="block text-sm font-normal text-gray-700">
						CK Mann Road
					</p>
					<p className="block text-xs font-normal text-gray-700">
						+233502456097
					</p>
				</div>
			</div>
		);
	};

	const renderPaymentMethod = () => {
		return (
			<div className="inline-block align-bottom bg-white rounded-lg px-4  text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full ">
				<h1 className="text-base font-extrabold text-[#455468]">
					Payment Method
				</h1>
				<hr className=" mt-4 border-gray-300" />
				<div className="flex flex-cols-2 gap-4 mt-4">
					<div>
						<img src={MasterCard} alt="" className="mt-1" />
					</div>
					<div className="mr-3">
						<p className="block text-base  text-gray-700">
							{order.owner.lastName}
						</p>
						<p className="block text-sm font-medium text-gray-700">
							0038347668173
						</p>
						<p className="block text-xs font-medium text-gray-700">
							expiry 06/2024
						</p>
					</div>
				</div>
			</div>
		);
	};
	return (
		<div className="fixed top-0 left-0 w-full h-full bg-[#fdfdfd49]  bg-opacity-50  z-10 flex items-center overflow-hidden justify-center">
			<div className="flex items-center justify-center min-h-screen  px-4  text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity">
					<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
				&#8203;
				<div className="absolute top-20 right-0 m-4">
					<div className="inline-block align-bottom bg-white rounded-lg px-4  pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
						<button
							onClick={onClose}
							className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800 focus:outline-none"
						>
							<img src={CancelButton} alt="" className="h-6 w-6" />
						</button>
						<h3 className="text-lg font-medium text-gray-900">
							Orders details
						</h3>
						<div className="flex gap-2 ">
							<h3 className=" font-bold text-gray-900">
								{' '}
								{order.owner.lastName}
							</h3>
							<h3 className=" font-bold text-gray-900">
								{order.owner.firstName}
							</h3>
						</div>

						<div className="flex justify-between mt-4">
							<button
								className={`text-sm font-medium ${selectedTab === 'items' ? 'bg-[#F2F5FF] text-[#4A72FF]' : 'text-[#455468]'} focus:outline-none rounded-md px-2 py-1`}
								onClick={() => setSelectedTab('items')}
							>
								Purchased Items
							</button>
							<button
								className={`text-sm font-medium ${selectedTab === 'address' ? 'bg-[#F2F5FF] text-[#4A72FF]' : 'text-[#455468]'} focus:outline-none rounded-md px-2 py-1`}
								onClick={() => setSelectedTab('address')}
							>
								Shipping Address
							</button>
							<button
								className={`text-sm font-medium ${selectedTab === 'payment' ? 'bg-[#F2F5FF] text-[#4A72FF]' : 'text-[#455468]'} focus:outline-none rounded-md px-2 py-1`}
								onClick={() => setSelectedTab('payment')}
							>
								Payment Method
							</button>
						</div>

						{selectedTab === 'items' && renderPurchasedItems()}
						{selectedTab === 'address' && renderShippingAddress()}
						{selectedTab === 'payment' && renderPaymentMethod()}
					</div>
				</div>
			</div>
		</div>
	);
};
const Orders: React.FC = () => {
	const perPage = 5; // Number of orders per page
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [order, setOrder] = useState<Order[]>([]); // Add this lin
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] =
		useState<boolean>(false);

	const dispatch = useAppDispatch();
	const { orders, loading } = useSelector(
		(state: RootState) => state.getOrders
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await dispatch(getAllOrders());
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				setOrder(response.payload.data.data.orders);
			} catch (error) {
				console.error('Error fetching orders:', error);
			}
		};

		fetchData();
	}, [dispatch]);

	const [activeFilter, setActiveFilter] = useState<string>('All');

	const handleRowClick = (order: Order) => {
		setSelectedOrder(order);

		setIsOrderDetailsModalOpen(true);
	};

	const handleDelete = async (orderId: string) => {
		try {
			const response = await dispatch(deleteOrder(orderId));
			if (response.payload.status === 200) {
				await dispatch(getAllOrders());
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				const updatedOrders = orders.data.filter(
					(order: Order) => order.id !== orderId
				);
				setOrder(updatedOrders);
				toast.success('Order deleted successfully.');
			}
		} catch (error) {
			console.error('Error handling response:', error);
			toast.error('Failed to delete order.');
		}
	};

	const handleCheckboxChange = () => {
		// Handle checkbox change
	};

	const getStatusStyle = (status: string) => {
		switch (status.toUpperCase()) {
			case 'PROCESSING':
				return 'bg-[#F0F3F9]  rounded-md text-[#5E718D] mx-6';
			case 'DELIVERED':
				return 'bg-[#E9EFF6] rounded-md text-[#11A75C]  mx-6';
			case 'SHIPPED':
				return 'bg-[#F2F5FF]  rounded-md text-[#4A72FF]  mx-6';
			case 'CANCELLED':
				return 'bg-[#FFF5F4]  rounded-md text-[#FF3838]  mx-6';
			// Add more status styles as needed
			default:
				return '';
		}
	};

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const filteredOrders = (Array.isArray(order) ? order : []).filter(
		(order: Order) => {
			if (activeFilter === 'All') {
				return true; // Include all orders
			} else {
				return order.status.toLowerCase() === activeFilter.toLowerCase();
			}
		}
	);
	console.log('***order', filteredOrders);
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const totalOrders = Array.isArray(order) ? order.length : 0;
	const totalPages = Math.ceil(totalOrders / perPage);
	const indexOfLastOrder = currentPage * perPage;
	const indexOfFirstOrder = indexOfLastOrder - perPage;
	const currentOrdersSlice = filteredOrders.slice(
		indexOfFirstOrder,
		indexOfLastOrder
	);

	const formattedDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		};

		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className=" font-sans p-4 flex flex-col gap-4 h-full justify-between sm:justify-start">
			{loading ? (
				<div className="flex items-center justify-center h-screen">
					<img src={Loader} alt="" className=" h-12 w-12" />
				</div>
			) : activeFilter == 'CANCELLED' ||
			  activeFilter == 'DELIVERED' ||
			  activeFilter == 'PROCESSING' ||
			  (activeFilter == 'SHIPPED' && filteredOrders.length === 0) ? (
				<div className="flex flex-col items-center justify-end mt-14">
					<div className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center justify-center gap-4">
						<img className="" src={emptycart} alt="" />
						<h2 className="text-[20px] font-bold text-center line-clamp-2 md:line-clamp-none">
							Your orders are currently empty
						</h2>
						<p className="text-center text-sm line-clamp-2 md:line-clamp-none">
							Looks like you haven't received any orders yet.
						</p>
						<p className="text-center text-sm line-clamp-2 md:line-clamp-none">
							Start by adding a new order to get things going.
						</p>
						<Link
							className="flex items-center gap-2 bg-[#0408E7] text-white py-2 mt-3 px-3 rounded-md"
							to={'/shopnest'}
						>
							<FontAwesomeIcon icon={faShoppingBag} color="white" />
							<p>New order</p>
						</Link>
					</div>
				</div>
			) : (
				<div
					className=""
					style={{
						boxShadow: '0px 24px 50px -12px rgba(45, 54, 67, 0.12)',
					}}
				>
					<h1 className="text-2xl font-extrabold text-[#667085] mb-2">
						Orders
					</h1>
					<div className="flex space-x-4 overflow-auto mb-4">
						{['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(
							(filter) => (
								<button
									key={filter}
									className={`bg-blue-white text-[#667085] px-4 py-2 rounded-md ${
										activeFilter === filter
											? 'bg-blue-100 text-blue-800 px-4 py-2 rounded-md'
											: ''
									}`}
									onClick={() => setActiveFilter(filter)}
								>
									{filter}
								</button>
							)
						)}
					</div>
					<div className="overflow-auto md:overflow-hidden">
						<table className=" md:min-w-[900px] bg-white rounded-lg overflow-hidden shadow-md opacity-95  shadow-slate-400  z-50">
							<thead className="bg-[#F9FAFB] text-[#667085] font-bold">
								<tr>
									<td className="p-3 border-b"></td>
									<td className="p-3 border-b">Created</td>
									<td className="p-3 border-b">Price</td>
									<td className="p-3 border-b">Quantity</td>
									<td className="p-3 border-b">Status</td>
									<td className="p-3 border-b">Total Price</td>
									<td className="p-3 border-b">Update</td>
									<td className="p-3 border-b"></td>
								</tr>
							</thead>
							<tbody>
								{currentOrdersSlice.map((order: Order) => (
									<tr
										key={order.id}
										onClick={() => handleRowClick(order)}
										className="cursor-pointer hover:bg-gray-100"
									>
										<td className="p-3 border-b">
											<input
												type="checkbox"
												onChange={() => handleCheckboxChange()}
											/>
										</td>
										<td className="p-3 border-b text-[#667085]">
											{formattedDate(order.createdAt)}
										</td>

										<td className="p-3 border-b text-[#667085]">
											{order.price}
										</td>
										<td className="p-3 border-b text-[#667085]">
											{order.quantity}
										</td>

										<td className="p-3 border-b text-[#667085]">
											<p className={`p-1 ${getStatusStyle(order.status)}`}>
												{order.status}
											</p>
										</td>

										<td className="p-3 border-b text-[#667085]">
											{order.totoalPrice}
										</td>
										<td className="p-3 border-b text-[#667085]">
											{formattedDate(order.updatedAt)}
										</td>

										<td className="p-3 border-b text-[#667085]">
											<Popover className="relative z-50">
												{({ open }) => (
													<>
														<Popover.Button className="inline-flex justify-center items-center p-2 border border-transparent text-gray-400 rounded-full bg-gray-100 focus:outline-none focus:ring ring-gray-300 focus:ring-opacity-50 ">
															<img src={IconDots} alt="" />
														</Popover.Button>

														<Popover.Overlay
															className={`${
																open
																	? 'opacity-30 fixed inset-0 z-999'
																	: 'opacity-0 absolute inset-0'
															} bg-black`}
														/>

														<Popover.Panel
															className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none origin-top bottom z-50 ${
																open ? 'transform -translate-y-full' : ''
															}`}
														>
															<div className="py-1" role="none">
																<button
																	type="submit"
																	className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 hover:text-red-900"
																	role="menuitem"
																	onClick={() => handleDelete(order.id)}
																>
																	Delete
																</button>
															</div>
														</Popover.Panel>
													</>
												)}
											</Popover>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{isOrderDetailsModalOpen && selectedOrder && (
						<OrderDetailsModal
							order={selectedOrder}
							onClose={() => setIsOrderDetailsModalOpen(false)}
						/>
					)}
				</div>
			)}
			{filteredOrders.length > 0 && (
				<div className="flex items-center justify-between">
					<div className="text-sm text-gray-700">
						Showing page {currentPage} from {totalPages}
					</div>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	);
};

export default Orders;
