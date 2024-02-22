import { useState, useEffect } from 'react';
import StarComponent from './starComponent';
import { useParams } from 'react-router-dom';
import URL from '../../utils/api';
import { toast } from 'react-toastify';
import moment from 'moment';
import Avatar from 'react-avatar';

interface User {
	firstName: string;
	lastName: string;
	avatar:string
}

interface Review {
	id: string;
	user?: User;
	ratings: number;
	feedback: string;
	userId: string;
	productId: string;
	createdAt: string;
	updatedAt: string;
	loading: boolean;
}

const Reviews = () => {
	const { id } = useParams();

	const [showContent, setShowContent] = useState(false);
	const [reviewFeedback, setReviewFeedback] = useState({
		title: '',
		feedback: '',
		rating: 0,
	});

	const [rating, setRating] = useState(3);
	const rows = 4;
	const [reviews, setReviews] = useState<Review[]>([]);

	const toggleContent = () => {
		setShowContent(!showContent);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setReviewFeedback({
			...reviewFeedback,
			[name]: value,
		});
	};
	const [loading, setLoading] = useState(false);
	const handleRatingChange = (selectedRating: number) => {
		setRating(selectedRating);
		setReviewFeedback({
			...reviewFeedback,
			rating: selectedRating,
		});
	};
	
	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			setLoading(true);

			const apiUrl = `/api/v1/reviews/${id}`;
			const token = localStorage.getItem('token');
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			const data = {
				title: reviewFeedback.title,
				feedback: reviewFeedback.feedback,
				ratings: reviewFeedback.rating,
			};

			await URL.post(apiUrl, data, config);

			toast.success('Review submitted successfully', {
				theme: 'colored',
				type: 'success',
			});

			setReviewFeedback({
				title: '',
				feedback: '',
				rating: 0,
			});
		} catch (error) {
			toast.error('Error submitting review:', {
				theme: 'colored',
				type: 'success',
			});
		} finally {
			setLoading(false); // Set loading to false after the API call is complete
		}
	};

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const token = localStorage.getItem('token');
				const config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
				const apiUrl = `/api/v1/reviews/get/${id}`;
				const response = await URL.get(apiUrl, config);
				setReviews(response.data.reviews);
			} catch (error) {
				console.error('Error fetching reviews:', error);
			}
		};

		fetchReviews();
	}, [id]);

	return (
		<div className="bg-white p-4  md:flex-col md:items-center justify-between flex-row w-full font-sans">
			<div className="grid grid-cols-2">
				<h3 className="font-bold">{reviews.length} Reviews</h3>
				<div className="grid grid-cols-1">
					<div className="flex items-center gap-5 md:gap-0 justify-center">
						<div>
							<StarComponent rating={3} clickable={false} />
						</div>
						<div className="text-[12px] md:text-[16px]">Ratings</div>
					</div>
					<button
						className="cursor-pointer sm:text-[12px] md:text-[16px] text-[#5ECE7B] text-center"
						onClick={toggleContent}
					>
						Leave my review
					</button>
				</div>
			</div>
			<div className="w-full">
				{showContent && (
					<div className="md:ml-9 ml-4 py-4">
						<div className="bg-[#F9FAFB] mt-7 p-2.5 grid grid-cols-2   md:w-3/5 w-full ">
							<p className="md:w-3/4 w-full md:text-[12px] text-[16px] ">
								How will you rate this product?
							</p>
							<div className="mr-4">
								<StarComponent
									rating={rating}
									onRatingChange={handleRatingChange}
									clickable={true}
								/>
							</div>
						</div>
						<form
							onSubmit={handleFormSubmit}
							className="py-4 flex md:flex-col md:items-center md:gap-4 md:justify-center md:w-3/5 w-full"
						>
							<input
								type="text"
								name="title"
								placeholder="Title....."
								onChange={handleInputChange}
								value={reviewFeedback.title}
								className="bg-[white] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
							/>
							<textarea
								name="feedback"
								rows={rows}
								className="block mt-5 p-2.5 w-full text-sm text-gray-900 bg-[white] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
								value={reviewFeedback.feedback}
								onChange={handleInputChange}
								placeholder="Any feedback you would like to give your account manager..."
							></textarea>
							<button
								className="p-2.5 bg-[#1c222b] text-[white] sm:text-[12px] sm:p-2 w-1/2 md:w-1/2"
								disabled={loading}
							>
								{loading ? (
									<div className="flex items-center justify-center">
										Loading...
										<div className="inline-block ml-2 w-4 h-4 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
									</div>
								) : (
									'Submit Feedback'
								)}
							</button>
						</form>
					</div>
				)}
				{reviews.map((review) => (
					<div key={review.id} className="flex items-start gap-5 mt-6">
						
							<Avatar
							src={review.user?.avatar}
								name={`${review.user?.firstName} ${review.user?.lastName}`}
								size="40"
								round
							/>
					
						<div className="flex flex-col gap-3">
							<h1>
								{review.user?.firstName} {review.user?.lastName}
							</h1>
							<StarComponent rating={review.ratings} clickable={false} />
							<p>{moment(review.createdAt).format('Do MMMM YYYY')}</p>
							<p className="font-inter text-[14px] font-normal leading-6 tracking-wide ">
								{review.feedback}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Reviews;
