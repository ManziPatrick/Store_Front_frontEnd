import React from 'react';
import star from './../../assets/Star 4.svg';
interface IRating {
	rating: number;
}
const Rating: React.FC<IRating> = ({ rating }) => {
	const starwidth: string = String(rating * 20) + 'px';
	return (
		<div
			style={{
				width: starwidth,
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: '100px',
					display: 'flex',
				}}
			>
				<img style={{ width: '20px' }} src={star} alt="" />
				<img style={{ width: '20px' }} src={star} alt="" />
				<img style={{ width: '20px' }} src={star} alt="" />
				<img style={{ width: '20px' }} src={star} alt="" />
				<img style={{ width: '20px' }} src={star} alt="" />
			</div>
		</div>
	);
};

export default Rating;
