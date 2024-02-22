import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ManagerSideBar from '../../components/ManagerSideBar/ManagerSideBar';
import ManagerNavBar from '../../components/ManagerNavBar/ManagerNavBar';
import magnify from './../../assets/products/magnifier.svg';
import './productDiscount.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import ProductPagination from '../../components/Pagination/ProductPagination';
import threeDots from './../../assets/products/threedots.svg';
import emptybox from './../../assets/products/Pack.svg';
import NewDiscountModal from '../../components/NewDiscount/NewDiscountModal';
import CustomButton from '../../components/Custombutton/CustomButton';
import { useAppDispatch } from '../../redux/hooks/hooks';
import {
	deleteDiscount,
	getAllDiscounts,
	searchDiscounts,
} from '../../redux/actions/discounts';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import moment from 'moment';
import loader from './../../assets/loaders.gif';
import { toast } from 'react-toastify';
import EditDiscount from '../../components/EditDiscount/EditDiscount';
import AreYouSure from '../../components/AreYouSure/AreYouSure';

interface IDiscount {
	id: string;
	businessId: string;
	discountName: string;
	appliesTo: {
		categoryId: string;
	};
	quantity: number;
	percentage: number;
	startDate: string;
	endDate: string;
	createdAt: string;
	updatedAt: string;
	category: {
		name: string;
	};
}

export interface Offer {
	id: string;
	businessId: string;
	discountName: string;
	appliesTo: {
		categoryId: string;
	};
	quantity: number;
	percentage: number;
	startDate: string;
	endDate: string;
	createdAt: string;
	updatedAt: string;
	category: {
		name: string;
	};
}

interface IOffers {
	currentPage: number;
	offerDetails: Offer[];
	totalPages: number;
}

const ProductDiscounts = () => {
	const itemsperPage = 9;
	const textFieldRef = useRef<HTMLInputElement>(null);
	const [searchcurrentPage, setSearchCurrentPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const dispatch = useAppDispatch();
	const { offers, loading } = useSelector(
		(state: RootState) => state.businessDiscounts
	);
	const [searchBar, setsearchBar] = useState('');

	useEffect(() => {
		setSearchCurrentPage(1);

		//if (searchBar.length > 2) {
		if (searchBar.length === 0) {
			dispatch(
				getAllDiscounts({ page: currentPage, itemsPerPage: itemsperPage })
			);
		} else {
			dispatch(
				searchDiscounts({
					page: searchcurrentPage,
					itemsPerPage: itemsperPage,
					keyword: searchBar,
				})
			);
			setTimeout(() => {
				if (textFieldRef.current) {
					textFieldRef.current.focus();
				}
			}, 500);
		}
	}, [dispatch, currentPage, searchBar, searchcurrentPage]);

	const offerList: IOffers = offers ?? {
		currentPage: 1,
		offerDetails: [],
		totalPages: 0,
	};

	const discountList: IDiscount[] = offerList.offerDetails.map((discount) => ({
		...discount,
		startDate: moment(discount.startDate).format('DD-MM-YYYY'), // Adjust to your desired format
		endDate: moment(discount.endDate).format('DD-MM-YYYY'), // Adjust to your desired format
	}));

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

	const [selectAllItems, setSelectAllItems] = useState<boolean>(false);
	const [selectedItems, setSelectedItems] = useState<boolean[]>(
		discountList.map(() => selectAllItems)
	);
	const handleChange = () => {
		setSelectAllItems(!selectAllItems);
		const productStatusArray: boolean[] = discountList.map(
			() => !selectAllItems
		);
		setSelectedItems(productStatusArray);
	};
	// makes the search based on keyword
	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setsearchBar(event.target.value);
		setSearchCurrentPage(1);
		dispatch(
			searchDiscounts({
				page: searchcurrentPage,
				itemsPerPage: itemsperPage,
				keyword: searchBar,
			})
		);
	};

	const handlePageChangeSearch = (newPage: number) => {
		setSearchCurrentPage(newPage);
		dispatch(
			searchDiscounts({
				page: newPage,
				itemsPerPage: itemsperPage,
				keyword: searchBar,
			})
		);
	};

	const handleSelectedItem = (index: number) => {
		const newSelectedItems = [...selectedItems];
		newSelectedItems[index] = !newSelectedItems[index];
		setSelectedItems(newSelectedItems);
	};

	const [showDelEdit, setShowDelEdit] = useState(
		Array(discountList.length).fill(false)
	);

	const handleshowdelEdit = (itemindex: number) => {
		const updatedShowDelEdit = [...showDelEdit];
		updatedShowDelEdit[itemindex] = !updatedShowDelEdit[itemindex];
		// updatedShowDelEdit.map((item, index) => {
		// 	index === itemindex
		// 		? (updatedShowDelEdit[index] = !updatedShowDelEdit[index])
		// 		: (updatedShowDelEdit[index] = false);
		// });

		setShowDelEdit(updatedShowDelEdit);
		setDiscountToEdit(offers.offerDetails[itemindex]);
	};

	const [showModelAre, setshowModelAre] = useState<boolean>(false);
	const toogleShowModelAre = () => {
		setshowModelAre(!showModelAre);
	};

	const [discountToEdit, setDiscountToEdit] = useState<Offer>({
		appliesTo: { categoryId: '' },
		businessId: '',
		category: { name: '' },
		createdAt: '',
		discountName: '',
		endDate: '',
		id: '',
		percentage: 0,
		quantity: 0,
		startDate: '',
		updatedAt: '',
	});

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	const [showEditDiscountModel, setShowDiscountModel] = useState(false);
	const toogleEditDiscountModel = () => {
		setShowDiscountModel(!showEditDiscountModel);
	};

	const [showdiscountModel, setshowdiscountModel] = useState(false);
	const toggleShowDiscountModel = () => {
		setshowdiscountModel(!showdiscountModel);
	};

	const [discountToDelete, setdiscountToDelete] = useState<string>('');

	const handleDeleteProduct = async (productId: string) => {
		dispatch(deleteDiscount(productId))
			.then((response) => {
				// Handle success, e.g., show a success message
				if (response.type === 'discounts/delete/fulfilled') {
					toast.success('Discount deleted succesfully', {
						theme: 'colored',
						type: 'success',
					});
				}
				toogleShowModelAre();
				dispatch(
					getAllDiscounts({ page: currentPage, itemsPerPage: itemsperPage })
				);
			})
			.catch((error) => {
				// Handle error, e.g., show an error message
				console.error('Error deleting product:', error.message);
			});
	};

	return (
		<div>
			<ManagerNavBar toggleSideBar={toggleSidebar} />
			<ManagerSideBar
				activeTab="Discount"
				openSideBar={showSideBar}
				toogleNavbar={toggleSidebar}
			/>
			<div className="productsDiscount">
				<div
					className={`${discountList.length > 0 && !loading ? 'productsHeading' : 'divDissapear'}`}
				>
					<div className="headingContainer">
						<div className="productsHead">
							<h2>Discounts</h2>

							{searchBar === '' && (
								<h3>
									{' '}
									{discountList.length * offerList.totalPages}{' '}
									{discountList.length * offerList.totalPages === 1
										? 'member'
										: 'members'}
								</h3>
							)}
							{searchBar != '' && (
								<h3>
									{' '}
									{searchcurrentPage * offerList.totalPages}{' '}
									{searchcurrentPage * offerList.totalPages === 1
										? 'member'
										: 'members'}
								</h3>
							)}
						</div>
						<div className="headicons">
							<div className="searchbar">
								<img src={magnify} alt="" />
								<input
									className="custom-input focus:border-transparent focus:outline-none"
									type="text"
									value={searchBar}
									onChange={handleSearch}
									ref={textFieldRef}
								/>
							</div>
							<CustomButton
								bgColor="#0408E7"
								borderProps={['none']}
								buttonText="New Discount"
								buttonType="button"
								paddingProps={['6px', '12px']}
								handleClick={() => {
									toggleShowDiscountModel();
								}}
								rounded="5px"
								className="text-[14px]"
								txtColor="white"
							/>
						</div>
					</div>
				</div>
				{loading && (
					<div className="loader self-center w-[50px] grow  flex justify-center items-center">
						<img src={loader} alt="" />
					</div>
				)}
				{discountList.length > 0 && !loading && (
					<div className="productsList">
						<div className="listContainer">
							<table>
								<thead>
									<tr className="tableHeadRow">
										<th>
											<input
												type="checkbox"
												name=""
												id="uniqueCheckboxId"
												onChange={() => {
													handleChange();
												}}
											/>
										</th>
										<th className="productName">
											<p>Name</p>
										</th>
										<th className="">category</th>
										<th>Percentage</th>
										<th className="">Start date</th>
										<th className="">End date</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{discountList.map((discount, index) => (
										<tr key={discount.id} className="tableBodyRow">
											<td>
												<input
													type="checkbox"
													name=""
													id=""
													checked={selectedItems[index]}
													onChange={() => handleSelectedItem(index)}
												/>
											</td>
											<td className="w-min productName">
												<p>{discount.discountName}</p>
											</td>
											<td className="">
												{discount.category &&
													discount.category.name &&
													discount.category.name}
												{!discount.category && 'No category'}
											</td>
											<td
												className={discount.percentage < 5 ? 'almostOut' : ''}
											>
												{discount.percentage}%
											</td>
											<td className="">{discount.startDate}</td>
											<td className="">{discount.endDate}</td>
											<td className="deleteEdit">
												<img
													onClick={() => handleshowdelEdit(index)}
													src={threeDots}
													alt=""
												/>
												<div
													className={`delEdit ${
														showDelEdit[index] ? 'showdelEdit' : ''
													}`}
												>
													<button
														className="flex items-center gap-[10px]"
														onClick={() => {
															toogleEditDiscountModel();
															handleshowdelEdit(index);
														}}
													>
														<FontAwesomeIcon icon={faPencil} />
														<div>Edit</div>
													</button>
													<hr className="w-full border-[1px]" />
													<button
														onClick={() => {
															setdiscountToDelete(discount.id);
															toogleShowModelAre();
														}}
													>
														<FontAwesomeIcon icon={faTrash} />
														<div>Delete</div>
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="showingNext">
							{searchBar === '' && (
								<div className="showingFrom">
									Showing page {currentPage} from {offerList.totalPages}{' '}
								</div>
							)}
							{searchBar != '' && (
								<div className="showingFrom">
									Showing page {searchcurrentPage} from {offerList.totalPages}{' '}
								</div>
							)}
							{searchBar === '' && (
								<ProductPagination
									currentPage={currentPage}
									totalPages={offerList.totalPages}
									onPageChange={handlePageChange}
									maxVisiblePages={1}
								/>
							)}
							{searchBar != '' && (
								<ProductPagination
									currentPage={searchcurrentPage}
									totalPages={offerList.totalPages}
									onPageChange={handlePageChangeSearch}
									maxVisiblePages={1}
								/>
							)}
						</div>
					</div>
				)}
				{discountList.length === 0 && !loading && !searchBar && (
					<div className="m-auto w-10/12 flex flex-col items-center gap-4">
						<img className="" src={emptybox} alt="" />
						<h2 className="text-[32px] font-bold">No discounts found</h2>
						<p>
							Your search “{searchBar}” did not match any projects. Please try
							again.
						</p>
						<button
							className="flex items-center gap-2 bg-[#0408E7] text-white py-2 px-3 rounded-md"
							onClick={toggleShowDiscountModel}
						>
							<FontAwesomeIcon icon={faPlus} color="white" />
							<p>New Discount</p>
						</button>
					</div>
				)}
				{discountList.length === 0 && !loading && searchBar && (
					<div className="m-auto w-10/12 flex flex-col items-center gap-4">
						<img className="" src={emptybox} alt="" />
						<h2 className="text-[32px] font-bold">No discounts found</h2>
						<p>
							Your search “{searchBar}” did not match any projects. Please try
							again.
						</p>
						<button
							className="flex items-center gap-2 bg-[#0408E7] text-white py-2 px-3 rounded-md"
							onClick={toggleShowDiscountModel}
						>
							<FontAwesomeIcon icon={faPlus} color="white" />
							<p>New Discount</p>
						</button>
					</div>
				)}
			</div>
			<NewDiscountModal
				showModel={toggleShowDiscountModel}
				toogleshowModel={showdiscountModel}
			/>
			<EditDiscount
				showModelEdit={toogleEditDiscountModel}
				toogleshowModelEdit={showEditDiscountModel}
				discountToEdit={discountToEdit}
			/>
			<AreYouSure
				deleteDiscount={() => handleDeleteProduct(discountToDelete)}
				showModelAre={toogleShowModelAre}
				toogleshowModelAre={showModelAre}
				message="Are you sure you want to delete the discount"
				btnAction="Delete"
			/>
		</div>
	);
};

export default ProductDiscounts;
