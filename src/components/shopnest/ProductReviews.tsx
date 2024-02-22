import { useState } from 'react';
import Descrition from './discription';
import Review from './reviews';

interface Mydata {
	productId: string;
}
const ProductReviews: React.FC<Mydata> = ({ productId }) => {
	const [activeTab, setActiveTab] = useState('description');

	const handleTabClick = (tabId: string) => {
		setActiveTab(tabId);
	};

	return (
		<div className="mb-4 flex flex-col md:border-gray-200 dark:border-gray-200  md:w-[95%] lg:[w-[85%]] ">
			<div className="mb-4 md:mx-auto border-b border-gray-200 dark:border-gray-200   sm:ml-0 md:w-full">
				<ul
					className="flex flex-wrap -mb-px text-sm font-medium text-center"
					role="tablist"
				>
					<li className="mr-2" role="listitem">
						<button
							className={`inline-block p-4 border-b-2 rounded-t-lg ${
								activeTab === 'description' ? 'border-blue-500' : ''
							}`}
							type="button"
							role="tab"
							aria-controls="profile"
							aria-selected={activeTab === 'description'}
							onClick={() => handleTabClick('description')}
						>
							DESCRIPTION
						</button>
					</li>
					<li className="mr-2" role="presentation">
						<button
							className={`inline-block p-4 border-b-2 rounded-t-lg ${
								activeTab === 'reviews'
									? 'border-blue-500'
									: 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
							}`}
							type="button"
							role="tab"
							aria-controls="dashboard"
							aria-selected={activeTab === 'reviews'}
							onClick={() => handleTabClick('reviews')}
						>
							REVIEWS
						</button>
					</li>
				</ul>
				{activeTab === 'description' && (
					<div>
						<Descrition productId={productId} />
					</div>
				)}
				{activeTab === 'reviews' && (
					<div>
						<Review />
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductReviews;
