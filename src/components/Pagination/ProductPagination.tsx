import React from 'react';
import './pagination.css';
import leftArrow from './../../assets/products/arrowLeft.svg';
import rightArrow from './../../assets/products/arrowRight.svg';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	maxVisiblePages: number;
}

const ProductPagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
	maxVisiblePages,
}) => {
	const range = (start: number, end: number) => {
		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	};

	const shouldShowEllipsis = totalPages > maxVisiblePages;
	const numButtonsBeforeCurrent = Math.min(
		Math.floor(maxVisiblePages / 2),
		currentPage - 1
	);
	const numButtonsAfterCurrent = Math.min(
		Math.floor(maxVisiblePages / 2),
		totalPages - currentPage
	);
	const getPageButtons = () => {
		if (shouldShowEllipsis) {
			const buttons = [];
			if (currentPage <= maxVisiblePages - numButtonsAfterCurrent) {
				// Display buttons from 1 to maxVisiblePages
				buttons.push(...range(1, maxVisiblePages), '...');
			} else if (currentPage >= totalPages - numButtonsBeforeCurrent) {
				// Display buttons from totalPages - maxVisiblePages + 1 to totalPages
				buttons.push(...range(totalPages - maxVisiblePages + 1, totalPages));
			} else {
				// Display buttons around the current page with ellipsis
				const start = currentPage - numButtonsBeforeCurrent;
				const end = currentPage + numButtonsAfterCurrent;
				buttons.push(1, '...');

				buttons.push(...range(start, end));

				buttons.push('...', totalPages);
			}
			return buttons;
		} else {
			return range(1, totalPages);
		}
	};

	return (
		<div className="pagination">
			<button
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
			>
				<img src={leftArrow} alt="" />
			</button>
			{getPageButtons().map((page, index) => (
				<button
					key={index}
					onClick={() => {
						if (typeof page === 'number') {
							onPageChange(page);
						}
					}}
					className={page === currentPage ? 'active' : ''}
				>
					{page}
				</button>
			))}
			<button
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
			>
				<img src={rightArrow} alt="" />
			</button>
		</div>
	);
};

export default ProductPagination;
