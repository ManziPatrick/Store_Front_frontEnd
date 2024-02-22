import magnify from './../../assets/products/magnifier.svg';
import './products.css';
import threeDots from './../../assets/products/threedots.svg';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { RootState } from '../../redux/store/store';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks/hooks';
import {
	deleteProduct,
	getAllProductsOwner,
	searchProductsOwner,
} from '../../redux/actions/businessproducts';
import { faPencil, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductPagination from '../../components/Pagination/ProductPagination';
import emptybox from './../../assets/products/Pack.svg';
import { Link } from 'react-router-dom';
import ManagerSideBar from '../../components/ManagerSideBar/ManagerSideBar';
import ManagerNavBar from '../../components/ManagerNavBar/ManagerNavBar';
import { toast } from 'react-toastify';
import loader from './../../assets/loaders.gif';
import AreYouSure from '../../components/AreYouSure/AreYouSure';

interface Product {
	business_id: string;
	category_id: string;
	createdAt: string;
	description: string;
	expireDate: string;
	id: string;
	images: string[];
	name: string;
	price: number;
	stock: number;
	updatedAt: string;
	categoryName: {
		name: string;
	};
	status: string;
}
const Products = () => {
	const itemsperPage = 6;
	const [currentPage, setCurrentPage] = useState(1);
	const [searchcurrentPage, setSearchCurrentPage] = useState(0);
	const dispatch = useAppDispatch();
	const [searchBar, setsearchBar] = useState('');
	const { loading, pages, products } = useSelector(
		(state: RootState) => state.ProductsSlice
	);

	useEffect(() => {
		dispatch(
			getAllProductsOwner({ page: currentPage, itemsPerPage: itemsperPage })
		);
	}, [dispatch, currentPage]);

	// get the window width to determine if the side bar appears
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

	const newproducts: Product[] = products ?? [];
	//const newproducts: Product[] = [];

	const [selectAllItems, setSelectAllItems] = useState<boolean>(false);
	const [selectedItems, setSelectedItems] = useState<boolean[]>(
		newproducts.map(() => selectAllItems)
	);
	const handleChange = () => {
		setSelectAllItems(!selectAllItems);
		const productStatusArray: boolean[] = newproducts.map(
			() => !selectAllItems
		); // Toggle the checkbox values
		setSelectedItems(productStatusArray);
	};

	// makes the search based on keyword
	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setsearchBar(event.target.value);
		setSearchCurrentPage(1);
		if (searchBar != '') {
			setTimeout(() => {
				dispatch(
					searchProductsOwner({
						page: searchcurrentPage,
						itemsPerPage: itemsperPage,
						keyword: event.target.value,
					})
				);
			}, 2000);
		} else {
			dispatch(
				getAllProductsOwner({ page: currentPage, itemsPerPage: itemsperPage })
			);
		}
	};

	const handleSelectedItem = (index: number) => {
		const newSelectedItems = [...selectedItems]; // Create a copy of the state array
		newSelectedItems[index] = !newSelectedItems[index]; // Toggle the checkbox value
		setSelectedItems(newSelectedItems); // Update the state with the new array
	};

	const PageNumbers: number = pages;

	const [showDelEdit, setShowDelEdit] = useState(
		Array(newproducts.length).fill(false)
	);

	const handleshowdelEdit = (itemindex: number) => {
		const updatedShowDelEdit = [...showDelEdit];
		updatedShowDelEdit[itemindex] = !updatedShowDelEdit[itemindex];
		setShowDelEdit(updatedShowDelEdit);
	};
	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};
	const handlePageChangeSearch = (newPage: number) => {
		setSearchCurrentPage(newPage);
		dispatch(
			searchProductsOwner({
				page: newPage,
				itemsPerPage: itemsperPage,
				keyword: searchBar,
			})
		);
	};
	const [productToDelete, setProductToDelete] = useState('');
	const [showModelAre, setshowModelAre] = useState<boolean>(false);
	const toogleShowModelAre = () => {
		setshowModelAre(!showModelAre);
	};

	const handleDeleteProduct = (productId: string) => {
		dispatch(deleteProduct(productId))
			.then((response) => {
				if (response.type === 'products/deleteProduct/fulfilled') {
					toast.success('Product deleted succesfully', {
						theme: 'colored',
						type: 'success',
					});
					toogleShowModelAre();
					dispatch(
						getAllProductsOwner({
							page: currentPage,
							itemsPerPage: itemsperPage,
						})
					);
				} else if (response.type === 'products/deleteProduct/rejected') {
					toast.error('Something went wrong', {
						theme: 'colored',
						type: 'error',
					});
				}
			})
			.catch((error) => {
				// Handle error, e.g., show an error message
				console.error('Error deleting product:', error.message);
			});
	};

	const inputRef = useRef<HTMLInputElement>(null);

	const setFocus = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	useEffect(() => {
		setTimeout(() => {
			setFocus();
		}, 0);
	}, []);

	return (
		<>
			<ManagerNavBar toggleSideBar={toggleSidebar} />
			<ManagerSideBar
				activeTab={'Products'}
				openSideBar={showSideBar}
				toogleNavbar={toggleSidebar}
			/>

			<div className="productsContainer">
				<div
					className={`${newproducts.length > 0 && !loading ? 'productsHeading' : 'divDissapear'}`}
				>
					<div className="headingContainer">
						<div className="productsHead">
							<h2>Product</h2>
							<h3>
								{searchBar === '' && (
									<h3>
										{' '}
										{newproducts.length * pages}{' '}
										{newproducts.length * pages === 1 ? 'member' : 'members'}
									</h3>
								)}
								{searchBar != '' && (
									<h3>
										{' '}
										{searchcurrentPage * pages}{' '}
										{searchcurrentPage * pages === 1 ? 'member' : 'members'}
									</h3>
								)}
							</h3>
						</div>
						<div className="headicons">
							<div className="searchbar">
								<img src={magnify} alt="" />
								<input
									className="custom-input focus:border-transparent focus:outline-none"
									type="text"
									value={searchBar}
									onChange={handleSearch}
									ref={inputRef}
								/>
							</div>
							<Link to={'/managerdashboard/addproduct'} className="newPrdtBtn">
								New Product
							</Link>
						</div>
					</div>
				</div>
				{loading && (
					<div className="loader self-center w-[50px] grow  flex justify-center items-center">
						<img src={loader} alt="" />
					</div>
				)}
				{newproducts.length > 0 && !loading && (
					<div className="productsList">
						<div className="listContainer">
							<table>
								<thead>
									<tr className="tableHeadRow">
										<th>
											<input
												type="checkbox"
												name=""
												id=""
												onChange={() => {
													handleChange();
												}}
											/>
										</th>
										<th></th>
										<th className="productName">
											<p>Name</p>
										</th>
										<th className="">status</th>
										<th>inventory</th>
										<th className="">Categories</th>
										<th>price</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{newproducts.map((product, index) => (
										<tr key={product.id} className="tableBodyRow">
											<td>
												<input
													type="checkbox"
													name=""
													id=""
													checked={selectedItems[index]}
													onChange={() => handleSelectedItem(index)}
												/>
											</td>
											<td className="prdtImg">
												<img src={product.images[0]} alt="" />
											</td>
											<td className="w-min productName">
												<p>{product.name}</p>
											</td>
											<td
												className={`${
													product.status == 'ACTIVE'
														? 'activeTab'
														: 'inactiveTab'
												}`}
											>
												<div className="dotContainer">
													<div className="circleDot"></div>
													<p>
														{product.status === 'ACTIVE'
															? 'Active'
															: 'Inactive'}
													</p>
												</div>
											</td>
											<td className={product.stock < 4 ? 'almostOut' : ''}>
												{product.stock}
											</td>
											<td className="">{product.categoryName.name}</td>
											<td>{product.price} EUR </td>
											<td className="deleteEdit">
												<img
													onClick={() => handleshowdelEdit(index)}
													src={threeDots}
													alt=""
												/>
												<div
													className={`delEdit border ${
														showDelEdit[index] ? 'showdelEdit' : ''
													}`}
												>
													<Link
														className="flex gap-2 items-center"
														to={`/managerdashboard/editproduct/${product.id}`}
													>
														<FontAwesomeIcon icon={faPencil} />
														<div>Edit</div>
													</Link>
													<hr className="w-full border-[1px]" />
													<button
														onClick={() => {
															setProductToDelete(product.id);
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
									Showing page {currentPage} from {PageNumbers}{' '}
								</div>
							)}
							{searchBar != '' && (
								<div className="showingFrom">
									Showing page {searchcurrentPage} from {PageNumbers}{' '}
								</div>
							)}
							{searchBar === '' && (
								<ProductPagination
									currentPage={currentPage}
									totalPages={pages}
									onPageChange={handlePageChange}
									maxVisiblePages={1}
								/>
							)}
							{searchBar != '' && (
								<ProductPagination
									currentPage={searchcurrentPage}
									totalPages={pages}
									onPageChange={handlePageChangeSearch}
									maxVisiblePages={1}
								/>
							)}
						</div>
					</div>
				)}
				{newproducts.length == 0 && !loading && !searchBar && (
					<div className="m-auto w-10/12 flex flex-col items-center gap-4">
						<img className="" src={emptybox} alt="" />
						<h2 className="text-[32px] font-bold">No products found</h2>
						<p>
							Your search “Landing page design” did not match any projects.
							Please try again.
						</p>
						<Link
							className="flex items-center gap-2 bg-[#0408E7] text-white py-2 px-3 rounded-md"
							to={'/managerdashboard/addproduct'}
						>
							<FontAwesomeIcon icon={faPlus} color="white" />
							<p>New Product</p>
						</Link>
					</div>
				)}
				{newproducts.length == 0 && !loading && searchBar && (
					<div className="m-auto w-10/12 flex flex-col items-center gap-4">
						<img className="" src={emptybox} alt="" />
						<h2 className="text-[32px] font-bold">No products found</h2>
						<p>
							Your search “Landing page design” did not match any projects.
							Please try again.
						</p>
						<Link
							className="flex items-center gap-2 bg-[#0408E7] text-white py-2 px-3 rounded-md"
							to={'/managerdashboard/addproduct'}
						>
							<FontAwesomeIcon icon={faPlus} color="white" />
							<p>New Product</p>
						</Link>
					</div>
				)}
			</div>
			<AreYouSure
				deleteDiscount={() => handleDeleteProduct(productToDelete)}
				showModelAre={toogleShowModelAre}
				toogleshowModelAre={showModelAre}
				message="Are you sure you want to delete the product?"
				btnAction="Delete"
			/>
		</>
	);
};

export default Products;
