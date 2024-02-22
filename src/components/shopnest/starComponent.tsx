import React, { useState } from 'react';
import greenStar from './../../assets/shopnest/greenstar.svg';
import grayStar from './../../assets/shopnest/graystar.svg';

interface IStar {
	rating: number;
	onRatingChange?: (newRating: number) => void;
	clickable?: boolean;
}

const StarComponent: React.FC<IStar> = ({
	rating,
	onRatingChange,
	clickable = true,
}) => {
	const [selectedRating, setSelectedRating] = useState(rating);
	const fullStars = Math.floor(selectedRating);
	const halfStar = selectedRating - fullStars;
	const grayStars = 5 - fullStars - (halfStar ? 1 : 0);
	const actualunit = halfStar * 20;

	const handleStarClick = (newRating: number) => {
		setSelectedRating(newRating);

		if (onRatingChange) {
			onRatingChange(newRating);
		}
	};

	const stars = [];
	for (let i = 0; i < fullStars; i++) {
		stars.push(
			<div
				key={i}
				onClick={clickable ? () => handleStarClick(i + 1) : undefined}
			>
				<img className="w-[20px]" src={greenStar} />
			</div>
		);
	}
	if (halfStar) {
		stars.push(
			<div key={fullStars} className="flex">
				<div style={{ width: `${actualunit}px`, overflow: 'hidden' }}>
					<div className="w-[20px] md:w-[15]">
						<img className="w-[20px] md:w-[15]" src={greenStar} />
					</div>
				</div>
				<div
					style={{
						width: `${20 - actualunit}px`,
						overflow: 'hidden',
						position: 'relative',
						top: '0',
						left: '0',
					}}
				>
					<div
						style={{
							width: '20px',
							position: 'absolute',
							top: '0',
							right: '0',
						}}
					>
						<img
							style={{
								width: '20px',
							}}
							src={grayStar}
						/>
					</div>
				</div>
			</div>
		);
	}
	for (let i = 0; i < grayStars; i++) {
		stars.push(
			<div
				key={fullStars + i + 1}
				onClick={
					clickable ? () => handleStarClick(fullStars + i + 1) : undefined
				}
			>
				<img className="w-[20px]" src={grayStar} />
			</div>
		);
	}

	return <div className="flex">{stars}</div>;
};

export default StarComponent;
