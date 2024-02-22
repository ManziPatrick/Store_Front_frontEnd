import React, { useEffect, useState } from 'react';
import { deleteOne, getWishlist } from '../../../redux/actions/wishlistAction';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import { Popover } from '@headlessui/react';
import Pagination from '../Pagination/Pagination';
import IconDots from '../../../assets/icons/IconDots.svg';
import { toast } from 'react-toastify';
import Loader from '../../../assets/loaders.gif';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import emptybox from '../../../assets/products/Pack.svg';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';

export type WishlistItem = {
	wishlistItem: {
		id: string;
		product: {
			id: string;
			name: string;
			images: string[];
			stock: number;
			price: number;
			description: string;
		};
	};
};

const FavoriteProduct: React.FC = () => {
	const perPage = 5;
	const [currentPage, setCurrentPage] = useState<number>(1);

	const [updatedWishlist, setUpdatedWishlist] = useState<
		WishlistItem['wishlistItem'][]
	>([]);

	const { loading } = useSelector((state: RootState) => state.wishlist);

	const dispatch = useAppDispatch();

	useEffect(() => {
		const retrieveData = async () => {
			const response = (await dispatch(getWishlist())) as {
				payload: { status: number; data: WishlistItem[] };
			};
			if (response.payload.status === 200) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				setUpdatedWishlist(response.payload.data);
			}
		};
		retrieveData();
	}, [dispatch]);

	const totalProducts = updatedWishlist.length;
	const totalPages = Math.ceil(totalProducts / perPage);
	const indexOfLastProduct = currentPage * perPage;
	const indexOfFirstProduct = indexOfLastProduct - perPage;
	const currentProductsSlice = updatedWishlist.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);
	const handleRemoveItem = async (productId: string) => {
		try {
			const response = await dispatch(deleteOne(productId));

			if (response.payload && response.payload.status === 200) {
				// Trigger re-fetching of wishlist data
				const updatedResponse = (await dispatch(getWishlist())) as {
					payload: { status: number; data: WishlistItem[] };
				};

				if (updatedResponse.payload.status === 200) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					setUpdatedWishlist(updatedResponse.payload.data);
					toast.success('Product removed successfully!', {
						theme: 'colored',
						type: 'success',
					});
				} else {
					toast.error('Failed to update wishlist', {
						theme: 'colored',
						type: 'error',
					});
				}
			} else {
				toast.error('Failed to remove product', {
					theme: 'colored',
					type: 'error',
				});
			}
		} catch (error) {
			console.error('Error removing product:', error, {
				theme: 'colored',
				type: 'error',
			});
			// Handle error if needed
		}
	};

	const handleCheckboxChange = () => {
		// Handle checkbox change
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const truncateDescription = (description: string, maxLength: number) => {
		if (description.length > maxLength) {
			return description.substring(0, maxLength) + '...';
		}
		return description;
	};

	return (
		<div className="w-[100%] p-4  flex flex-col justify-between gap-5">
			<div className=" w-[100%] flex flex-col gap-10 font-sans ">
				{loading && (
					<div className="flex items-center justify-center h-screen">
						<img src={Loader} alt="" className=" h-12 w-12" />
					</div>
				)}

				<div className="flex gap-4">
					<h1
						style={{
							fontFamily: 'Inter',
							fontSize: '22px',
							fontWeight: '600',
							lineHeight: '35px',
							letterSpacing: '-0.30000001192092896px',
							textAlign: 'left',
						}}
					>
						Product
					</h1>
					<div
						style={{
							width: 'Hug (87px)',
							height: 'Hug (24px)',
							padding: '2px 8px 2px 8px',
							borderRadius: '6px',
							gap: '10px',
							background: '#F0F3F9',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						100 members
					</div>
				</div>

				{!loading && updatedWishlist.length === 0 && (
					<div className="m-auto w-10/12 flex flex-col items-center gap-4 ">
						<img className="" src={emptybox} alt="" />
						<h2 className="emptyt">No product liked</h2>
						<p className="par">
							It seems like there no favorite product in your list. Please try
							again.
						</p>
						<Link
							className="flex items-center gap-2 bg-[#0408E7] text-white py-2 px-3 rounded-md "
							to={'/shopnest'}
						>
							<FontAwesomeIcon icon={faPlus} color="white" />
							<p className="text-[16px]">shopnest</p>
						</Link>
					</div>
				)}
				{!loading && updatedWishlist.length > 0 && (
					<div
						className="relative overflow-x-auto rounded-b-[10px]"
						style={{
							boxShadow: '0px 24px 50px -12px rgba(45, 54, 67, 0.12)',
						}}
					>
						<table className="w-full bg-white rounded-b-[10px] overflow-hidden shadow-md opacity-95 z-50 ">
							<thead className="bg-[#F9FAFB] text-[#667085] font-bold">
								<tr
									style={{
										fontFamily: 'Inter',
										fontSize: '12px',
										fontWeight: '500',
										lineHeight: '20px',
										letterSpacing: '-0.20000000298023224px',
										textAlign: 'center',
									}}
								>
									<td className="p-3"></td>
									<td className="p-3"></td>
									<td className="p-3 text-left">Name</td>
									<td className="p-3">Price</td>
									{/* <td className="p-3 border-b">Product Id</td>  */}
									<td className="p-3">Stock</td>
									<td className="p-3">Description</td>

									<td className="p-3"></td>
									<td className="p-3"></td>
								</tr>
							</thead>
							<tbody>
								{currentProductsSlice.map((wishlist) =>
									wishlist.product !== null ? (
										<tr
											key={wishlist.id}
											className={` border-b-[1px] border-b-[#E9EFF6]`}
										>
											<td className="p-3">
												<input
													type="checkbox"
													onChange={() => handleCheckboxChange()}
												/>
											</td>
											<td>
												<img
													src={wishlist.product.images[0]}
													alt="Product Image"
													className="w-16 h-12"
												/>
											</td>

											<td
												style={{
													fontFamily: 'Inter',
													fontSize: '16px',
													fontWeight: '500',
													lineHeight: '28px',
													letterSpacing: '-0.30000001192092896px',
													textAlign: 'left',
													padding: '0.75rem',
													color: '#455468',
												}}
											>
												{truncateDescription(wishlist.product.name, 10)}
											</td>

											<td className="p-3">{wishlist.product.price}</td>
											<td className="p-3">{wishlist.product.stock}</td>
											<td className="p-3">
												<p style={{ whiteSpace: 'nowrap' }}>
													{truncateDescription(
														wishlist.product.description,
														15
													)}
												</p>
											</td>
											<td className="p-3">
												{/* ... (other code remains the same) */}
											</td>

											<td className="p-3">
												<Popover className="relative z-50">
													{({ open }) => (
														<>
															<Popover.Button className="inline-flex justify-center items-center p-2 border border-transparent text-gray-400 rounded-full  bg-gray-100 focus:outline-none focus:ring ring-gray-300 focus:ring-opacity-50">
																<img src={IconDots} alt="" />
															</Popover.Button>

															<Popover.Overlay
																className={`${
																	open
																		? 'opacity-30 fixed inset-0 z-99'
																		: 'opacity-0 absolute inset-0'
																} bg-black`}
															/>

															<Popover.Panel className="absolute z-99 right-0 bottom-auto mt-2 top-[-0.5rem] w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
																<div className="py-1" role="none">
																	<button
																		type="button"
																		className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 hover:text-red-900"
																		onClick={() =>
																			handleRemoveItem(wishlist.product.id)
																		}
																	>
																		Remove Product
																	</button>
																</div>
															</Popover.Panel>
														</>
													)}
												</Popover>
											</td>
										</tr>
									) : null
								)}
							</tbody>
						</table>
					</div>
				)}
			</div>
			<div className="flex justify-between items-center">
				{updatedWishlist.length > 0 && (
					<div className="   text-sm text-gray-700">
						Showing page {currentPage} from {totalPages}
					</div>
				)}
				{updatedWishlist.length > 0 && (
					<div className="">
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default FavoriteProduct;
