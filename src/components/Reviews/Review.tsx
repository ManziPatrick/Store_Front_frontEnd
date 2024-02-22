import React from 'react';
import Rating from '../Rating/Rating';

interface IReview {
	customerName: string;
	customerPosition: string;
	rating: number;
	reviewDetails: string;
	imgUrl: string;
}

const Review: React.FC<IReview> = ({
	customerName,
	customerPosition,
	rating,
	reviewDetails,
	imgUrl,
}) => {
	return (
		<div className="slider-item">
			<div className="imgName">
				<img className="reviewImg" src={imgUrl} alt="" />
				<div className="customer">
					<h2>{customerName}</h2>
					<p>{customerPosition}</p>
					<Rating rating={rating} />
				</div>
			</div>
			<p className="text-justify">{reviewDetails}</p>
		</div>
	);
};

export default Review;
