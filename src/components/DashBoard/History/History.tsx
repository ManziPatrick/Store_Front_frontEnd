import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import emptybox from './../../../assets/products/Pack.svg';
import { useSelector } from 'react-redux';
import loader from './../../../assets/loaders.gif';
import { RootState } from '../../../redux/store/store';
import { getAllHistory } from '../../../redux/actions/history';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import threeDots from './../../../assets/products/threedots.svg';
import ProductPagination from '../../Pagination/ProductPagination';
import './history.css';

interface IHistory {
	createdAt: string;
	customerId: string;
	id: string;
	price: string;
	product: {
		id: string;
		business_id: string;
		name: string;
		images: string[];
		description: string;
		expireDate: string;
		price: number;
		size: null;
		status: string;
		stock: number;
	};
	productId: string;
	quantity: 1;
	status: string;
	totoalPrice: string;
	updatedAt: string;
}

const History: React.FC = () => {
	const itemsperPage = 6;
	const dispatch = useAppDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [selectAllItems, setSelectAllItems] = useState<boolean>(false);
	const { loading, pages, history } = useSelector(
		(state: RootState) => state.history
	);

	const PageNumbers: number = pages;

	useEffect(() => {
		dispatch(getAllHistory({ page: currentPage, itemsPerPage: itemsperPage }));
	}, [dispatch, currentPage]);

	const newHistory: IHistory[] = history ?? [];

	const [selectedItems, setSelectedItems] = useState<boolean[]>(
		newHistory.map(() => selectAllItems)
	);
	const handleChange = () => {
		setSelectAllItems(!selectAllItems);
		const productStatusArray: boolean[] = newHistory.map(() => !selectAllItems); // Toggle the checkbox values
		setSelectedItems(productStatusArray);
	};

	const [showDelEdit, setShowDelEdit] = useState(
		Array(newHistory.length).fill(false)
	);

	const handleshowdelEdit = (index: number) => {
		const updatedShowDelEdit = [...showDelEdit];
		updatedShowDelEdit[index] = !updatedShowDelEdit[index];
		setShowDelEdit(updatedShowDelEdit);
	};
	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	const handleSelectedItem = (index: number) => {
		const newSelectedItems = [...selectedItems]; // Create a copy of the state array
		newSelectedItems[index] = !newSelectedItems[index]; // Toggle the checkbox value
		setSelectedItems(newSelectedItems); // Update the state with the new array
	};

	const handleDeleteProduct = () => {};

	const getHistoryNumber = (numberOfPages: number) => {
		if (numberOfPages == 1) {
			if (newHistory.length !== 1) {
				return newHistory.length + ' members';
			} else {
				return newHistory.length + ' member';
			}
		} else {
			return itemsperPage * numberOfPages + ' members';
		}
	};

	return (
		<div className="historyContainer">
			<div className="historyHeading">
				<div className="headingContainer">
					<div className="historysHead">
						<h2>History</h2>
						<h3>{getHistoryNumber(PageNumbers)}</h3>
					</div>
				</div>
			</div>
			{loading && (
				<div className="loader self-center w-[50px] grow  flex justify-center items-center">
					<img src={loader} alt="" />
				</div>
			)}
			{newHistory.length > 0 && !loading && (
				<div className="historyList">
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
									<th className="productName">
										<p>Store</p>
									</th>

									<th>price</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{newHistory.map((product, index) =>
									product.product !== null ? (
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
												<img src={product.product.images[0]} alt="" />
											</td>
											<td>{product.product.name} </td>
											<td className="w-min productName">
												<p>Shopnest</p>
											</td>

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
													<button onClick={() => handleDeleteProduct()}>
														<FontAwesomeIcon icon={faTrash} />
														<div>Delete</div>
													</button>
												</div>
											</td>
										</tr>
									) : null
								)}
							</tbody>
						</table>
					</div>
					<div className="showingNext">
						<div className="showingFrom">
							Showing page {currentPage} from {PageNumbers}
						</div>

						<ProductPagination
							currentPage={currentPage}
							totalPages={pages}
							onPageChange={handlePageChange}
							maxVisiblePages={1}
						/>
					</div>
				</div>
			)}
			{newHistory.length == 0 && !loading && (
				<div className="m-auto w-10/12 flex flex-col items-center gap-4">
					<img className="" src={emptybox} alt="" />
					<h2 className="text-[32px] font-bold">No Orders Found</h2>
					<p>
						Your search “Landing page design” did not match any projects. Please
						try again.
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
	);
};

export default History;
