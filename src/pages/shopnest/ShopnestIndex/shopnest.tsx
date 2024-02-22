import {
	Text,
	Img,
	Input,
} from '../../../components/fistcustomerlogin/searchField';

import Pagination from '../../../components/shopnest/pagination';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import { useEffect, useState } from 'react';
import { fetchcategories } from '../../../redux/actions/shopnest/categories';
import { fetchproduct } from '../../../redux/actions/shopnest/products';
import { RootState } from '../../../redux/store/store';
import Footer from '../../../components/shopnest/Footer';
import ShopNestNavbar from '../../../components/shopnest/ShopNestNavbar';
import { Link } from 'react-router-dom';
import StarComponent from '../../../components/shopnest/starComponent';
import {
	addToWishlist,
	deleteOne,
} from '../../../redux/actions/wishlistAction';
import { toast } from 'react-toastify';

type Category = {
	id: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
};

export type product = {
	id: string;
	business_id: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	name: string;
	images: string;
	discountedPrice: number;
	price: number;
	stock: number;
	expireDate: string;
	category_id: string;
	colors: string[];
	categoryName: { name: string };
	percentage: number;
	isInWishlist: boolean;
};

const HomePagevOnePage: React.FC = () => {
	const dispatch = useAppDispatch();
	const categories: Category[] = useSelector(
		(state: RootState) => state.categories.categories
	);
	const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);
	const products: product[] = useSelector(
		(state: RootState) => state.product.products
	);

	useEffect(() => {
		dispatch(fetchproduct(1));
		dispatch(fetchcategories());
	}, [dispatch]);

	const handleAddToWishlist = async (productId: string) => {
		try {
			const isProductInWishlist = favoriteProducts.includes(productId);

			const action = isProductInWishlist ? deleteOne : addToWishlist;
			const res = await dispatch(action(productId));

			const successMessage = isProductInWishlist
				? 'Removed from Wishlist!'
				: 'Added to Wishlist!';
			const errorMessage = isProductInWishlist
				? 'Failed to remove from wishlist'
				: 'Failed to add to wishlist';

			if (
				(res.payload && res.payload.status === 200) ||
				res.payload.status === 201
			) {
				toast.success(successMessage, { theme: 'colored', type: 'success' });
				const updatedFavorites = isProductInWishlist
					? favoriteProducts.filter((id) => id !== productId)
					: [...favoriteProducts, productId];
				setFavoriteProducts(updatedFavorites);
			} else {
				toast.error(errorMessage, { theme: 'colored', type: 'error' });
			}
		} catch (error) {
			console.error('Error handling wishlist:', error);
		}
	};

	const data = categories.length;

	return (
		<div className="bg-white-A700 flex flex-col font-inter relative  justify-start  w-auto sm:w-full md:w-full md:overflow-x-hidden">
			<ShopNestNavbar initialNavBar={'Home'} />
			<div className="px-6 md:px-2 relative  ">
				<Img
					className="h-[800px] object-cover w-full  md:w-full"
					src="loginpageImg/img_image.png"
					alt="image"
				/>
				<div className="absolute flex flex-col inset-x-0 inset-y-0 items-center  w-full justify-center md:w-full">
					<Text className="  mb-12 font-bold max-w-[80%;] md:max-w-[60%]     text-center items-center md:text-7xl text-4xl text-gray-900 tracking-[-2.30px] uppercase">
						level up your style with our summer collections
					</Text>
					<button className="cursor-pointer font-bold min-w-[150px] text-center text-lg tracking-[-0.30px] sm:mt-4 p-2.5 rounded-none align-middle border border-[#1C222B]">
						SHOP NOW
					</button>
				</div>
			</div>

			<div className="">
				<Text className="text-2xl font-bold md:text-[22px] m-8 text-black-900 sm:text-xl text-center tracking-[-0.50px] ">
					CATEGORIES
				</Text>
				{data ? (
					<div className=" grid  px-6 md:px-5 gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-4">
						<div className=" h-[500px] relative w-full">
							<div className="h-[500px] m-auto w-full">
								<Img
									className="h-[500px] m-auto object-cover w-full"
									src="loginpageImg/img_filter.png"
									alt="cardcoverTwenty"
								/>
							</div>
							<button
								className="absolute bottom-[0]  h-10 bg-[#21212140] rounded-none shadow-white cursor-pointer font-bold inset-x-[0] min-w-full sm:min-w-full mx-auto text-center text-lg tracking-[-0.30px]"
								color="white_A700_4c"
							>
								{categories[19].name.toUpperCase()}
							</button>
						</div>
						<div className="h-[500px] relative w-full">
							<Img
								className="h-[500px] m-auto object-cover w-full"
								src="loginpageImg/img_cardcover21.png"
								alt="cardcoverTwentyOne"
							/>
							<div className="absolute h-[500px] inset-[0] justify-center m-auto w-full">
								<Img
									className="h-[500px] m-auto object-cover w-full"
									src="loginpageImg/img_filter_500x329.png"
									alt="filter_One"
								/>
								<button className="absolute bottom-[0] h-10 bg-[#21212140] rounded-none shadow-white cursor-pointer font-bold inset-x-[0] min-w-full mx-auto text-center text-lg  tracking-[-0.30px] ">
									{categories[20].name.toUpperCase()}
								</button>
							</div>
						</div>
						<div className=" grid grid-cols-2 md:grid-cols-1 justify-start gap-3 w-full">
							<div className="h-[242px] mb-4 relative w-full">
								<Img
									className="h-[242px] object-cover w-full"
									src="loginpageImg/img_cardcover22.png"
									alt="cardcoverTwentyTwo"
								/>
								<button
									className="absolute bottom-[0] h-10 bg-[#21212140] shadow-white cursor-pointer rounded-none font-bold inset-x-[0] min-w-full sm:min-w-full mx-auto text-center text-lg tracking-[-0.30px]"
									color="white_A700"
								>
									{categories[0].name.toUpperCase()}
								</button>
							</div>
							<div className=" h-[242px] inset-[0] justify-center  relative mb-4 w-full">
								<Img
									className="h-[242px] m-auto object-cover w-full"
									src="loginpageImg/img_filter_1.png"
									alt="filter"
								/>
								<button
									className="absolute bottom-[0] cursor-pointer h-10 bg-[#21212140] rounded-none shadow-white font-bold inset-x-[0] min-w-full sm:min-w-full mx-auto text-center text-lg tracking-[-0.30px]"
									color="white_A700_4c"
								>
									{categories[1].name.toUpperCase()}
								</button>
							</div>
						</div>
					</div>
				) : null}
			</div>

			<div className="grid relative grid-cols-1 md:grid-cols-2 gap-6 m-6 bg-[#F2F2F2]   items-center  md:m-5 justify-start md:justify-center w-auto ">
				<Img
					className="h-[448px] sm:h-auto object-cover w-full items-center md:w-full"
					src="loginpageImg/img_frame1000004858.png"
					alt="frame1000004858"
				/>

				<div className="flex flex-col gap-8 p-8  items-center justify-start w-auto  sm:w-full">
					<Text className="text-5xl sm:text-[38px] md:text-[24px] text-center text-gray-900 tracking-[-1.75px] w-[346px]">
						UPTO 40% OFF
					</Text>
					<Text className="text-center text-gray-900 text-xl tracking-[-0.30px] w-[273px]">
						Special offers and great deals
					</Text>

					<button className="cursor-pointer font-bold min-w-[150px] text-center text-lg tracking-[-0.30px] sm:mt-4 p-2.5 rounded-none align-middle border border-[#1C222B]">
						SHOP NOW
					</button>
				</div>
			</div>

			<div>
				<Text className="text-2xl md:text-[22px] m-8 text-black-900 sm:text-xl text-center font-bold tracking-[-0.50px] ">
					Featured Items
				</Text>

				<div className="grid lg:grid-cols-4  grid-cols-1 md:grid-cols-2 gap-[34px] items-stretch justify-start px-6  md:px-5 w-full">
					{products
						? products.slice(0, 8).map((product, index) => (
								<div key={index} className="w-full relative">
									<button className=" absolute top-4 right-4 px-[8px] py-1 text-[#11A75C] bg-[#1DB4691F] ">
										best seller
									</button>
									<Link to={`${product.id}`}>
										<Img
											className="md:h-[286px] sm:h-auto object-cover w-full md:w-full"
											src={
												product.images
													? product.images[0]
													: '/loginpageImg/img_image_8.png'
											}
											alt={`image_${index + 1}`}
										/>
									</Link>
									<div className="flex relative flex-row items-start justify-start w-full">
										<div className="flex relative flex-1 flex-col gap-2 items-start justify-start w-full">
											<Text className="text-base text-gray-900 tracking-[-0.30px] w-auto font-bold">
												{product.name || 'Product Name Missing'}
											</Text>
											<Text className="text-gray-900 text-sm tracking-[-0.20px] w-auto">
												{product.categoryName
													? product.categoryName.name
													: 'Category Missing'}
											</Text>

											<Input
												name={`language_${index}`}
												placeholder="3 Ratings"
												className="font-medium px-10 placeholder:text-gray-900 text-gray-900 text-left text-sm tracking-[-0.20px] w-full"
												wrapClassName="flex w-[100%]"
												prefix={<StarComponent rating={3} clickable={false} />}
											/>
											<div className="flex flex-row gap-2 items-center justify-start w-full">
												<Text className="text-base text-gray-900 font-bold  tracking-[-0.30px] w-auto">
													$
													{product.price && product.discountedPrice
														? (product.price - product.discountedPrice).toFixed(
																1
															)
														: product.price.toFixed(1)}
												</Text>
												<Text className="text-base text-[#AFBACA] line-through tracking-[-0.30px] w-auto">
													{product.percentage ? `$${product.price}` : null}
												</Text>
												<Text className="text-base text-[#D21A0E] font-bold tracking-[-0.30px] w-auto">
													{product.percentage
														? `${product.percentage}% OFF`
														: null}
												</Text>
											</div>
											<div className="flex items-center gap-[5px]">
												{(
													product?.colors || [
														'#1B4DFF',
														'#FFD027',
														'#8F0EA2',
														'#E92215',
													]
												).map((color, index) => (
													<div key={index} className="selectedColorWrapper ">
														<div
															style={{
																width: '15px',
																height: '15px',
																backgroundColor: `${color}`,
															}}
														></div>
													</div>
												))}
											</div>
										</div>

										<Img
											className="h-6 w-6"
											src={
												favoriteProducts.includes(product.id) ||
												product.isInWishlist === true
													? 'loginpageImg/red.svg'
													: 'loginpageImg/img_favorite.svg'
											}
											alt={`favorite_${index + 1}`}
											onClick={() => handleAddToWishlist(product.id)}
										/>
									</div>
								</div>
							))
						: null}
				</div>
			</div>
			<div className="md:w-full md:my-8">
				<Pagination />
			</div>
			<Footer />
		</div>
	);
};

export default HomePagevOnePage;
