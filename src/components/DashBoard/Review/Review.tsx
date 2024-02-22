import React, { useState, useEffect } from 'react';
import StarComponent from '../../shopnest/starComponent';
import noimage from './../../../assets/icons/noimage.png';
import emptybox from './../../../assets/products/Pack.svg';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './product.css';
import { Link } from 'react-router-dom';

import magnify from './../../../assets/products/magnifier.svg';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { fetchreviews } from '../../../redux/actions/reviews';
import { sendReply } from '../../../redux/actions/replies';
import ProductPagination from '../../Pagination/ProductPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import loader from './../../../assets/loaders.gif';
import Avatar from 'react-avatar';

interface User {
	firstName: string;
	lastName: string;
}

interface Product {
	name: string;
	images: string[];
	price: number;
}

interface ReviewProps {
	id: string;
	createdAt: string;
	feedback: string;
	ratings: number;
	userId: string;
	productId: string;
	user?: User;
	product?: Product;
	selected: boolean;
	totalPages?: number;
}

const Review: React.FC = () => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const reviewsResponse = useSelector((state: RootState) => state.reviews);

	const [reviews, setReviews] = useState<ReviewProps[]>([]);
	const [selectedReview, setSelectedReview] = useState<ReviewProps | null>(
		null
	);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [selectAllChecked, setSelectAllChecked] = useState(false);
	const [replyText, setReplyText] = useState('');
	const { currentPage, loading: isloading, totalPages } = reviewsResponse;

	useEffect(() => {
		dispatch(fetchreviews(1));
	}, [dispatch]);

	useEffect(() => {
		setReviews(reviewsResponse.reviews || []);
	}, [reviewsResponse.reviews]);

	const handlePageChange = (pageNumber: number) => {
		dispatch(fetchreviews(pageNumber));
	};

	const handleCheckboxChange = (setIndex: number) => {
		const updatedReviews = [...reviews];
		updatedReviews[setIndex] = {
			...updatedReviews[setIndex],
			selected: !updatedReviews[setIndex].selected,
		};
		setSelectAllChecked(updatedReviews.every((review) => review.selected));
		setReviews(updatedReviews);
	};

	const handleSelectAllChange = () => {
		const updatedReviews = reviews.map((review) => ({
			...review,
			selected: !selectAllChecked,
		}));

		setSelectAllChecked(!selectAllChecked);
		setSelectedReview(null);
		setIsModalVisible(false);
		setReviews(updatedReviews);
	};

	const handleReviewClick = (event: React.MouseEvent, review: ReviewProps) => {
		event.stopPropagation();
		setSelectedReview(review);
		setIsModalVisible(true);
	};

	const handleReplyTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setReplyText(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setLoading(true);

			if (selectedReview) {
				await dispatch(sendReply({ reviewId: selectedReview.id, replyText }));
				setReplyText('');
			}
		} catch (error) {
			console.error('Error sending reply:', error);
		} finally {
			setLoading(false);
		}
	};

	const filteredReviews = reviews.filter(
		(review) =>
			(review.product?.name.toLowerCase() ?? '').includes(
				searchText.toLowerCase()
			) ||
			(review.user?.lastName.toLowerCase() ?? '').includes(
				searchText.toLowerCase()
			) ||
			(review.user?.firstName.toLowerCase() ?? '').includes(
				searchText.toLowerCase()
			)
	);

	const countSelectedReviews = () => {
		return reviews.filter((review) => review.selected).length;
	};

	const len = reviews.length;
	const totallength = len * totalPages;

	const selectedReviewsCount = countSelectedReviews();

	const truncateText = (text: string, maxLength: number) => {
		return text.length > maxLength
			? `${text.substring(0, maxLength)}.....`
			: text;
	};

	return (
		<div className="max-w-screen md:max-w-screen sm:max-w-screen-md text-[12px] md:m-2 content">
			<div className="productsContainer">
				<div className="productsHeading">
					<div className="headingContainer ">
						<div className="productsHead">
							<h2>Reviews</h2>
							<h3>
								{selectedReviewsCount} - {len} of {totallength} Reviews
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
									placeholder="Search ......"
								/>
							</div>
						</div>
					</div>
				</div>

				{isloading ? (
					<div className="flex items-center w-screen justify-center h-screen">
						<img src={loader} alt="" className=" h-12 w-12" />
					</div>
				) : filteredReviews.length === 0 ? (
					<div className="m-auto w-10/12 flex flex-col items-center gap-4">
						<img className="" src={emptybox} alt="" />
						<h2 className="emptyt">No reviews found</h2>
						<p className="par">
							Your search “Landing page design” did not match any reviews.
							Please try again.
						</p>
						<Link
							className="flex items-center gap-2 bg-[#0408E7] text-white py-2 px-3 rounded-md "
							to={''}
						>
							<FontAwesomeIcon icon={faPlus} color="white" />
							<p className="headers">shopnest</p>
						</Link>
					</div>
				) : (
					<div className="flex flex-col justify-center items-center w-full">
						<div className="w-[96%]">
							<div className=" mt-10 grid grid-cols-1 overflow-x-auto md:overflow-hidden max-w-full w-[98%] justify-center">
								{filteredReviews.length > 0 && (
									<div className=" mt-6  grid grid-cols-1 overflow-x-auto md:overflow-hidden max-w-full md:w-full justify-center">
										<table
											className="ml-4 justify-center  items-center mb-8 min-w-[900px] md:w-full rounded-lg bg-white shadow-slate-400 p-6 text-black "
											style={{
												boxShadow: '0px 24px 50px -12px rgba(45, 54, 67, 0.12)',
											}}
										>
											<thead>
												<tr className=" text-left bg-[#F9FAFB] text-[#667085] font-medium">
													<td className="w-1/12">
														<input
															className="text-start w-1/2"
															type="checkbox"
															name={`allCheckbox`}
															checked={selectAllChecked}
															onChange={handleSelectAllChange}
														/>
													</td>

													<td className=""></td>
													<td className="text-left ">Product Info</td>
													<td className=""></td>
													<td className="text-left ">Name</td>
													<td className="">Customer Reviews</td>
													<td className="text-left ">Rated</td>
												</tr>
											</thead>
											{filteredReviews.map((review, setIndex) => (
												<>
													<tbody>
														<tr
															key={review.id}
															className={`hover:bg-[#F9FAFB] border-solid items-center  border-[#E9EFF6] border-b-2  headers ${
																review.selected
																	? 'bg-[#E9EFF6] '
																	: 'bg-transparent text-black'
															}`}
														>
															<td className="w-1/12">
																<input
																	type="checkbox"
																	name={`checkbox-${setIndex}`}
																	checked={review.selected}
																	className="text-center align-middle  mt-3"
																	onChange={() =>
																		handleCheckboxChange(setIndex)
																	}
																/>
															</td>
															<td
																onClick={(event) =>
																	handleReviewClick(event, review)
																}
															>
																{review.product?.images?.[0] ? (
																	<img
																		src={review.product?.images[0]}
																		className="w-[50px] h-[50px] rounded"
																		alt=""
																	/>
																) : (
																	<img
																		src={noimage}
																		className="w-[50px] h-[50px] rounded"
																		alt=""
																	/>
																)}
															</td>
															<td
																className="flex flex-col "
																onClick={(event) =>
																	handleReviewClick(event, review)
																}
															>
																<p className="self-start">
																	{review.product?.name}
																</p>
																<p className="content">
																	posted:{' '}
																	{moment(review.createdAt).format(
																		'Do MMMM YYYY'
																	)}
																</p>
															</td>
															<td className="">
																<Avatar
																	name={`${review.user?.firstName} ${review.user?.lastName}`}
																	size="40"
																	round
																/>
															</td>
															<td
																className="flex  flex-col"
																onClick={(event) =>
																	handleReviewClick(event, review)
																}
															>
																<p className="self-start text-[500]">
																	{review.user?.firstName},{' '}
																	{review.user?.lastName}
																</p>
																<p className="self-start content">
																	{'Rwanda '}
																</p>
															</td>
															<td
																onClick={(event) =>
																	handleReviewClick(event, review)
																}
															>
																<p className="content">
																	{truncateText(review.feedback, 30)}
																</p>
															</td>
															<td className="">
																<StarComponent
																	rating={review.ratings}
																	clickable={false}
																/>
															</td>
														</tr>
													</tbody>
												</>
											))}
										</table>
									</div>
								)}
							</div>
						</div>
						<div className="flex justify-between w-[94%] md:w-full  pl-6 pb-5 md:relative   ">
							<p className=" ">
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
				)}
			</div>

			{isModalVisible && selectedReview && (
				<div className="fixed top-0 left-0 w-full h-full bg-[#fdfdfd49]  bg-opacity-50  z-10 flex items-center overflow-hidden justify-center">
					<div
						className="w-[30%] sm:w-4/5 md:w-2/3 content bg-white p-4 h-fit mt-36 md:mt-20 mr-10  fixed right-0 top-0 overflow-y-auto rounded-lg  shadow-[#698aaf] "
						style={{ boxShadow: '0px 24px 50px -12px rgba(45, 54, 67, 0.12)' }}
					>
						<div className="flex justify-between">
							<h1 className="font-bold headers">Review Details</h1>
							<button onClick={() => setIsModalVisible(false)}>
								<img src="/reviews/x-close.svg" alt="" />
							</button>
						</div>
						<div>
							<div className="flex flex-col gap-4 ">
								<div className="border-b py-6 ">
									<div className="flex gap-6">
										<div>
											<Avatar
												name={`${selectedReview.user?.firstName} ${selectedReview.user?.lastName}`}
												size="40"
												round
											/>
										</div>
										<div className="grid-cols-1 ">
											<h1 className=" headers">
												{selectedReview.user?.firstName},
												{selectedReview.user?.lastName}
											</h1>
											<p className="text-[#5E718D]">Country: {'Rwanda'}</p>
										</div>
										<div className="text-[#5E718D]">
											<p>
												Total Spent: {selectedReview.product?.price ?? 100}$
											</p>
											<p>Total Review: {selectedReview.ratings}</p>
										</div>
									</div>
								</div>
								<div className="border-b py-6 ">
									<div className="flex gap-6">
										{selectedReview.product?.images?.[0] ? (
											<img
												src={selectedReview.product?.images[0]}
												className="w-[50px] h-[50px] rounded"
												alt=""
											/>
										) : (
											<img
												src={noimage}
												className="w-[50px] h-[50px] rounded"
												alt=""
											/>
										)}
										<div>
											<h1 className=" headers ">
												{selectedReview.product?.name}
											</h1>
											<p className="text-[#5E718D]">
												Posted:
												{moment(selectedReview.createdAt).format(
													'Do MMMM YYYY'
												)}{' '}
											</p>
										</div>
									</div>
									<div className="flex justify-between mt-3">
										<h1 className=" font-semibold headers ">Disappointing</h1>
										<StarComponent rating={selectedReview.ratings} />
									</div>

									<div className="text-[#5E718D]">
										<p>{selectedReview.feedback}</p>
									</div>
								</div>

								<form onSubmit={handleSubmit}>
									<span className="font-bold ">Reply</span>
									<textarea
										name="replyText"
										className="block mt-5 p-2.5 w-full text-sm outline-none text-gray-900 bg-[white] rounded-lg border border-gray-300  focus:border-gray-300 "
										placeholder="Enter a description..."
										value={replyText}
										onChange={handleReplyTextChange}
									></textarea>
									<div className="flex p-3 gap-4">
										<button
											className="bg-white rounded-md align-middle text-center px-0.5 py-2.5 text-black w-full border-2"
											onClick={() => setIsModalVisible(false)}
										>
											Cancel
										</button>
										<button
											className="bg-[#0408E7] rounded-md align-middle text-center px-0.5 text-white w-full py-1.5"
											type="submit"
										>
											{loading ? (
												<div className="flex items-center justify-center">
													loading ...
													<div className="inline-block ml-2 w-4 h-4 border-t-2 border-white border-solid rounded-full animate-spin"></div>
												</div>
											) : (
												'Send'
											)}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Review;
