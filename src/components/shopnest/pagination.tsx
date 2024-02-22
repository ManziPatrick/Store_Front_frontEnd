import React from 'react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { fetchproduct } from '../../redux/actions/shopnest/products';
import { useAppDispatch } from '../../redux/hooks/hooks';

export function DefaultPagination() {
	const dispatch = useAppDispatch();
	const [active, setActive] = React.useState(1);
	const pages = useSelector((state: RootState) => state.product.pages);

	const handleButtonClick = (index: number) => {
		setActive(index);
		dispatch(fetchproduct(index));
	};

	const generateButtons = () => {
		const buttonArray = [];

		if (pages <= 8) {
			for (let i = 1; i <= pages; i++) {
				buttonArray.push(
					<button
						key={i}
						onClick={() => handleButtonClick(i)}
						className={`relative align-middle select-none font-sans font-medium text-center uppercase transition-all w-10 max-w-[40px]  h-10 min-h-[40px] sm:max-h-[20px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20 ${
							active === i ? 'bg-blue-500 text-white' : 'bg-gray-100'
						}`}
					>
						{i}
					</button>
				);
			}
		} else {
			buttonArray.length = 0;
			buttonArray.push(
				<button
					key={1}
					onClick={() => handleButtonClick(1)}
					className={`relative align-middle select-none font-sans font-medium text-center uppercase transition-all w-10 min-w-[40px]  h-10 min-h-[40px] sm:max-h-[20px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20 ${
						active === 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'
					}`}
				>
					1
				</button>
			);
			if (active > 7) {
				buttonArray.push(
					<div
						key="ellipsis-start"
						className="w-10 max-w-[40px] h-10 min-h-[40px] text-gray-900 text-xs"
					>
						...
					</div>
				);
			}
			for (
				let i = Math.max(active - 2, 2);
				i <= Math.min(active + 2, pages - 1);
				i++
			) {
				buttonArray.push(
					<button
						key={i}
						onClick={() => handleButtonClick(i)}
						className={`relative align-middle select-none font-sans font-medium text-center uppercase transition-all w-10 max-w-[40px]  h-10 min-h-[40px] sm:max-h-[20px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20 ${
							active === i ? 'bg-blue-500 text-white' : 'bg-gray-100'
						}`}
					>
						{i}
					</button>
				);
			}
			if (active < pages - 3) {
				buttonArray.push(
					<div
						key="ellipsis-end"
						className="w-10 max-w-[40px] h-10 min-h-[40px] text-gray-900 text-xs"
					>
						...
					</div>
				);
			}

			buttonArray.push(
				<button
					key={pages}
					onClick={() => handleButtonClick(pages)}
					className={`relative align-middle select-none font-sans font-medium text-center uppercase transition-all w-10 max-w-[40px]  h-10 min-h-[40px] sm:max-h-[20px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20 ${
						active === pages ? 'bg-blue-500 text-white' : 'bg-gray-100'
					}`}
				>
					{pages}
				</button>
			);
		}

		return buttonArray;
	};

	const next = () => {
		if (active < pages) {
			const newIndex = active + 1;
			setActive(newIndex);
			dispatch(fetchproduct(newIndex));
		}
	};

	const prev = () => {
		if (active > 1) {
			const newIndex = active - 1;
			setActive(newIndex);
			dispatch(fetchproduct(newIndex));
		}
	};

	return (
		<div className="flex relative items-center sm:w-full justify-center gap-1  md:gap-4">
			<button
				className="flex items-center gap-1 md:gap-2 "
				onClick={prev}
				disabled={active === 1}
			>
				<ArrowLeftIcon strokeWidth={2} className="h-3 w-4" /> Previous
			</button>
			<div className="flex items-center md:gap-2 sm:gap-2 sm:text-[10px]">
				{generateButtons()}
			</div>
			<button
				// variant="text"
				className="flex items-center gap-1 md:gap-2  sm:mr-4"
				onClick={next}
				disabled={active === pages}
			>
				Next <ArrowRightIcon strokeWidth={2} className="h-3 w-4" />
			</button>
		</div>
	);
}

export default DefaultPagination;
