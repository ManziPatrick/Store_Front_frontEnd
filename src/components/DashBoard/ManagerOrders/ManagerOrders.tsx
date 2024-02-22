import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import { Popover } from '@headlessui/react';
import Pagination from '../Pagination/Pagination';
import IconDots from '../../../assets/icons/IconDots.svg';
import MasterCard from '../../../assets/payments/mastercard.svg';
import Loader from '../../../assets/loaders.gif';
import CancelButton from '../../../assets/icons/cancelbutton.svg';
import emptycart from './../../../assets/icons/payment/Empty Cart.svg';
import {
	getManagerAllOrders,
	Order,
} from '../../../redux/actions/managerOrder';
import { updateOrderStatus } from '../../../redux/actions/updateOrderManager';
import { deleteOrder } from '../../../redux/actions/deleteOrder';
import { RootState } from '../../../redux/store/store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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

const ManagerOrders: React.FC = () => {
	const perPage = 5; // Number of orders per page
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
	const [orderIdToUpdate, setOrderIdToUpdate] = useState<string>('');
	const [editStatus, setEditStatus] = useState<string>('');
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] =
		useState<boolean>(false);

	const dispatch = useAppDispatch();
	const { orders, loading } = useSelector(
		(state: RootState) => state.getManagerOrders
	);

	useEffect(() => {
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

	const [activeFilter, setActiveFilter] = useState<string>('All');

	const openEditModal = (status: string, orderId: string) => {
		setOrderIdToUpdate(orderId);
		setEditStatus(status);
		setIsEditModalOpen(true);
	};

	const closeEditModal = () => {
		setIsEditModalOpen(false);
	};

	const handleRowClick = (order: Order) => {
		setSelectedOrder(order);
		setIsOrderDetailsModalOpen(true);
	};

	const handleEditSubmit = async () => {
		try {
			const response = await dispatch(
				updateOrderStatus({ id: orderIdToUpdate, status: editStatus })
			);

			if (response.payload.status === 200) {
				await dispatch(getManagerAllOrders());
				toast.success('Order status updated successfully', {
					theme: 'colored',
					type: 'success',
				});
			}

			closeEditModal();
		} catch (error) {
			// Handle errors here
			console.error('Failed to update order status:', error);
			toast.error('Failed to update order status', {
				theme: 'colored',
				type: 'error',
			});
		}
	};

	const handleDelete = (orderId: string) => {
		dispatch(deleteOrder(orderId))
			.unwrap()
			.then((deletedOrderId) => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				const updatedOrders = orders.data.filter(
					(order: Order) => order.id !== deletedOrderId
				);
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				setOrderIdToUpdate({ ...orders, data: updatedOrders });
			})

			.catch((error) => {
				// Handle errors here
				console.error('Failed to delete order:', error);
			});
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

	const filteredOrders = (Array.isArray(orders.data) ? orders.data : []).filter(
		(order: Order) => {
			return (
				activeFilter === 'All' ||
				order.status.toLowerCase() === activeFilter.toLowerCase()
			);
		}
	);

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const totalOrders = Array.isArray(orders?.data) ? orders.data.length : 0;

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

	// Edit status modal z-index

	return (
		<div className="flex flex-col justify-between p-4 gap-4 h-auto md:h-full ">
			<div className=" font-sans">
				{/* Orders Table */}
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
						</div>
					</div>
				) : (
					<div
						className="overflow-x-auto"
						style={{
							boxShadow: '0px 24px 50px -12px rgba(45, 54, 67, 0.12)',
						}}
					>
						<h1 className="text-2xl font-extrabold text-[#455468] mb-2">
							Orders
						</h1>

						<div className="flex space-x-4 overflow-auto mb-4">
							{['All', 'Processing', 'Delivered', 'Shipped', 'Cancelled'].map(
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
						<div className="md:overflow-auto">
							<table className=" md:min-w-[900px] bg-white rounded-lg overflow-hidden shadow-md opacity-95  shadow-slate-400 ">
								<thead className="bg-[#F9FAFB] text-[#667085] font-">
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
								<tbody className="border-transparent">
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

											<td className="p-3 border-b text-[#667085] ">
												<Popover className="relative z-50">
													{({ open }) => (
														<>
															<Popover.Button className="inline-flex justify-center items-center p-2 border border-transparent text-gray-400 rounded-full  bg-gray-100 focus:outline-none focus:ring ring-gray-300 focus:ring-opacity-50 ">
																<img src={IconDots} alt="" />
															</Popover.Button>

															<Popover.Overlay
																className={`${
																	open
																		? 'opacity-30 fixed inset-0 '
																		: 'opacity-0 absolute inset-0'
																} bg-black`}
															/>

															<Popover.Panel
																className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none origin-top bottom  ${
																	open ? 'transform -translate-y-full' : ''
																}`}
															>
																<div className="py-1" role="none">
																	<button
																		type="submit"
																		className="block px-4 py-2 text-sm text-gray-700 bg-gray-100text-gray-900"
																		role="menuitem"
																		onClick={() =>
																			openEditModal(order.status, order.id)
																		}
																	>
																		Edit
																	</button>
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
							{isOrderDetailsModalOpen && selectedOrder && (
								<OrderDetailsModal
									order={selectedOrder}
									onClose={() => setIsOrderDetailsModalOpen(false)}
								/>
							)}
						</div>

						{isEditModalOpen && (
							<div className="fixed top-0 left-0 w-full h-full bg-[#fdfdfd49]  bg-opacity-50  z-10 flex items-center overflow-hidden justify-center">
								<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
									<div className="fixed inset-0 transition-opacity">
										<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
									</div>
									<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
									&#8203;
									<div
										className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
										role="dialog"
										aria-modal="true"
										aria-labelledby="modal-headline"
									>
										<h3
											className="text-lg font-medium text-gray-900"
											id="modal-headline"
										>
											ORDER
										</h3>
										<div className="mt-4">
											<p className="block text-sm font-medium text-gray-700 w-96">
												Edit Order status
											</p>
										</div>
										<div className="mt-4">
											<label className="block text-sm font-medium text-gray-700">
												Status
											</label>
											<select
												value={editStatus}
												onChange={(e) => setEditStatus(e.target.value)}
												className="mt-1 p-2 border rounded-md w-full"
											>
												{[
													'PROCESSING',
													'DELIVERED',
													'SHIPPED',
													'CANCELLED',
												].map((status) => (
													<option key={status} value={status}>
														{status}
													</option>
												))}
											</select>
										</div>
										<div className="mt-4">
											<button
												onClick={handleEditSubmit}
												className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
											>
												Save
											</button>
											<button
												onClick={closeEditModal}
												className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
											>
												Cancel
											</button>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
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

export default ManagerOrders;
