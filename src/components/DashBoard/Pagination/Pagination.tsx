import React from 'react';
import LeftArrow from '../../../assets/icons/LeftArrow.svg';
import RightArrow from '../../../assets/icons/RightArrow.svg';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const MAX_PAGE_DISPLAY = 4; // Maximum number of pages to display

	const getPageNumbers = () => {
		const pageNumbers = [];
		const startPage = Math.max(
			1,
			currentPage - Math.floor(MAX_PAGE_DISPLAY / 2)
		);
		const endPage = Math.min(totalPages, startPage + MAX_PAGE_DISPLAY - 1);

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		return pageNumbers;
	};
	return (
		<div className="">
			<button
				type="submit"
				className={`px-3 py-1  mr-2 ${
					currentPage === 1 && 'pointer-events-none'
				}`}
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				<img src={RightArrow} alt="" />
			</button>

			{getPageNumbers().map((pageNumber) => (
				<button
					key={pageNumber}
					className={`px-3 py-1  rounded-md mx-1 ${
						currentPage === pageNumber
							? 'bg-blue-600 text-white'
							: 'bg-white text-gray-800'
					}`}
					onClick={() => onPageChange(pageNumber)}
				>
					{pageNumber}
				</button>
			))}

			<button
				type="submit"
				className={`px-3 py-1  ml-2 ${
					currentPage === totalPages && 'pointer-events-none'
				}`}
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				<img src={LeftArrow} alt="" />
			</button>
		</div>
	);
};

export default Pagination;
