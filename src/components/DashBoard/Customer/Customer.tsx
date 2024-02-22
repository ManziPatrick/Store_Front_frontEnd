import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';

import emptybox from '../../../assets/products/Pack.svg';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './product.css';
import { Link } from 'react-router-dom';

import magnify from './../../../assets/products/magnifier.svg';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import { useSelector } from 'react-redux';
import loader from '../../../assets/loaders.gif';
import { RootState } from '../../../redux/store/store';
import { fetchCustomers } from '../../../redux/actions/viewCustomers';
import ProductPagination from '../../Pagination/ProductPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dote from './../../../assets/icons/IconDots.svg';

interface Owner {
	email: string;
	firstName: string;
	lastName: string;
	name: string;
}

interface product {
	name: string;
}

interface CustomerProps {
	createdAt: string;
	customerId: string;
	id: string;
	owner: Owner;
	product: product;
	currentPage: number;
	price: string;
	productId: string;
	quantity: number;
	status: string;
	totoalPrice: string;
	selected: boolean;
	totalPages?: number;
}

const CustomerComponent: React.FC = () => {
	const dispatch = useAppDispatch();
	const customerResponse = useSelector((state: RootState) => state.Customers);
	const [customers, setCustomers] = useState<CustomerProps[]>([]);
	const [, setSelectedCustomer] = useState<CustomerProps | null>(null);

	const [searchText, setSearchText] = useState('');
	const [selectAllChecked, setSelectAllChecked] = useState(false);
	const { currentPage, loading: isloading, totalPages } = customerResponse;

	useEffect(() => {
		dispatch(
			fetchCustomers({
				page: currentPage,
				itemsPerPage: 6,
			})
		);
	}, [currentPage, dispatch]);

	useEffect(() => {
		setCustomers(customerResponse.customers as unknown as CustomerProps[]);
	}, [customerResponse.customers, dispatch]);

	const handlePageChange = (newPage: number) => {
		dispatch(
			fetchCustomers({
				page: newPage,
				itemsPerPage: 6,
			})
		);
	};

	const handleCheckboxChange = (setIndex: number) => {
		const updatedCustomers = [...customers];
		updatedCustomers[setIndex] = {
			...updatedCustomers[setIndex],
			selected: !updatedCustomers[setIndex].selected,
		};
		setSelectAllChecked(
			updatedCustomers.every((customer) => customer.selected)
		);
		setCustomers(updatedCustomers);
	};

	const handleSelectAllChange = () => {
		const updatedCustomers = customers.map((customer) => ({
			...customer,
			selected: !selectAllChecked,
		}));

		setSelectAllChecked(!selectAllChecked);
		setSelectedCustomer(null);
		setCustomers(updatedCustomers);
	};

	const handleCustomerClick = (
		event: React.MouseEvent,
		customer: CustomerProps
	) => {
		event.stopPropagation();
		setSelectedCustomer(customer);
	};
	const countSelectedCustomer = () => {
		return customers.filter((customer) => customer.selected).length;
	};
	const len = customers.length;
	const totallength = len * totalPages;

	const selectedCustomerCount = countSelectedCustomer();

	const filteredCustomers = customers.filter(
		(customer) =>
			customer.owner.firstName
				?.toLowerCase()
				.includes(searchText.toLowerCase()) ||
			customer.owner.lastName
				?.toLowerCase()
				.includes(searchText.toLowerCase()) ||
			customer.product.name?.toLowerCase().includes(searchText.toLowerCase()) ||
			customer.owner.email?.toLowerCase().includes(searchText.toLowerCase())
	);

	return (
		<div className="max-w-screen md:max-w-screen sm:max-w-screen-md text-[12px] md:m-2 content">
			<div className="productsContainer ">
				<div className="productsHeading">
					<div className="headingContainer">
						<div className="productsHead">
							<h2>Customers</h2>
							<h3>
								{selectedCustomerCount} - {len} of {totallength} Customers
							</h3>
						</div>
						<div className="headicons">
							<div className="searchbar">
								<img src={magnify} alt="" />
								<input
									className="custom-input focus:border-transparent focus:outline-none"
									type="text"
									value={searchText}
									onChange={(e) => setSearchText(e.target.value)}
									placeholder="Search ....."
								/>
							</div>
						</div>
					</div>
				</div>
				{isloading ? (
					<div className="flex items-center w-screen justify-center h-screen">
						<img src={loader} alt="" className=" h-12 w-12" />
					</div>
				) : filteredCustomers.length === 0 ? (
					<div className="m-auto w-10/12 flex flex-col items-center gap-4">
						<img className="" src={emptybox} alt="" />
						<h2 className="emptyt">No customers found</h2>
						<p className="par">
							Your search “Landing page design” did not match any customers.
							Please try again.
						</p>
						<Link
							className="flex items-center gap-2 bg-[#0408E7] text-white py-2 px-3 rounded-md "
							to={''}
						>
							<FontAwesomeIcon icon={faPlus} color="white" />
							<p className="text-[16px]">shopnest</p>
						</Link>
					</div>
				) : (
					<div className="flex flex-col justify-center items-center w-full">
						<div className="w-[96%]">
							<div className="md:h-[70vh] h-[100%] w-full">
								{filteredCustomers.length > 0 && (
									<>
										<div className=" mt-6  grid grid-cols-1 overflow-x-auto md:overflow-hidden max-w-full md:w-full justify-center">
											<table
												className="ml-4 justify-center  items-center mb-8 min-w-[900px] md:w-full rounded-lg bg-white shadow-slate-400 p-6 text-black "
												style={{
													boxShadow:
														'0px 24px 50px -12px rgba(45, 54, 67, 0.12)',
												}}
											>
												<thead>
													<tr className="tableHeadRow text-[#667085] font-medium">
														<td className=" w-1/12 ">
															<input
																className="text-center w-1/2"
																type="checkbox"
																name={`allCheckbox`}
																checked={selectAllChecked}
																onChange={handleSelectAllChange}
															/>
														</td>

														<td className="  w-1/6 ">Name and Email</td>

														<td className="w-1/6 ">Product Name</td>
														<td className="w-1/6 ">Quantity</td>
														<td className="w-1/6 ">Price</td>

														<td className=" w-1/6"></td>
													</tr>
												</thead>
												{filteredCustomers.map((customer, setIndex) => (
													<tbody>
														<tr
															key={customer.id}
															className={`hover:bg-[#F9FAFB]  border-solid  border-[#E9EFF6] border-b-2 ${
																customer.selected
																	? 'bg-[#E9EFF6] '
																	: 'bg-transparent text-black'
															}`}
														>
															<td className="w-1/12">
																<input
																	type="checkbox"
																	name={`checkbox-${setIndex}`}
																	checked={customer.selected}
																	className="text-center align-middle  pl-4 mt-3 "
																	onChange={() =>
																		handleCheckboxChange(setIndex)
																	}
																/>
															</td>
															<td
																onClick={(event) =>
																	handleCustomerClick(event, customer)
																}
																className="flex  justify-around  items-center gap-3  "
															>
																<Avatar
																	name={`${customer.owner?.firstName} ${customer.owner?.lastName}`}
																	size="40"
																	round
																/>

																<div
																	className="flex flex-col "
																	onClick={(event) =>
																		handleCustomerClick(event, customer)
																	}
																>
																	<p className="self-start headers">
																		{customer.owner?.firstName}{' '}
																		{customer.owner?.lastName}
																	</p>

																	<p className="content">
																		{customer.owner?.email}
																	</p>
																</div>
															</td>

															<td
																onClick={(event) =>
																	handleCustomerClick(event, customer)
																}
															>
																<p className="content">
																	{customer.product.name}
																</p>
															</td>
															<td className="w-1/6 content">
																<p>{customer.quantity}</p>
															</td>
															<td>
																<p>{customer.totoalPrice}</p>
															</td>
															<td className="">
																<div className=" flex justify-center items-center ">
																	<img src={dote} alt="" />
																</div>
															</td>
														</tr>
													</tbody>
												))}
											</table>
										</div>
									</>
								)}
							</div>
							<div className="flex justify-between w-[94%] md:w-full  pl-6  md:relative   ">
								<p className="">
									Showing page {currentPage} from {totalPages}
								</p>
								<ProductPagination
									currentPage={currentPage}
									totalPages={totalPages}
									maxVisiblePages={5}
									onPageChange={handlePageChange}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CustomerComponent;
