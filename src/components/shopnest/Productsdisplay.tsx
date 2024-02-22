import { useEffect, useMemo, useState } from 'react';
import StarComponent from './starComponent';
import { Link } from 'react-router-dom';
import { addToWishlist, deleteOne } from '../../redux/actions/wishlistAction';
import heart from './../../assets/shopnest/heart-outline.svg';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { useAppDispatch } from '../../redux/hooks/hooks';
import {
	fetchSingleproduct,
	addProductToCart,
	Product,
} from '../../redux/actions/shopnest/singlePage';
import { toast } from 'react-toastify';
import { fetchCartProducts } from '../../redux/actions/payment/Cartpayment';

const Productsdisplay: React.FC<{ productId: string }> = ({ productId }) => {
	const dispatch = useAppDispatch();
	const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	const { data } = useSelector((state: RootState) => state.singleProduct);

	useEffect(() => {
		dispatch(fetchSingleproduct({ productId }));
		
	}, [dispatch, productId]);

	const addToCart = () => {
		if (!seletedColor || !seletedSize) {
			return;
		}

		if (product) {
			setLoading(true);
			dispatch(
				addProductToCart({
					productId,
					quantity,
					colors: [seletedColor],
					size: [seletedSize],
				})
				
			).finally(() => {
				dispatch(fetchCartProducts({ page: 1 }));
				setLoading(false);
			});
		}
	};

	const handleAddToWishlist = async (productId: string) => {
		try {
			// Check if the product is already in the wishlist

			const isProductInWishlist = favoriteProducts.includes(productId);

			if (isProductInWishlist) {
				// If the product is in the wishlist, remove it
				await dispatch(deleteOne(productId));
			} else {
				const response = await dispatch(addToWishlist(productId));
				if (response.payload && response.payload.status === 201) {
					toast.success('Added to Wishlist!', {
						theme: 'colored',
						type: 'success',
					});
				} else {
					toast.error('Failed to update wishlist', {
						theme: 'colored',
						type: 'error',
					});
				}
			}

			// Toggle the favorite status for the clicked product
			const updatedFavorites = isProductInWishlist
				? favoriteProducts.filter((id) => id !== productId)
				: [...favoriteProducts, productId];
			setFavoriteProducts(updatedFavorites);
		} catch (error) {
			console.error('Error handling wishlist:', error);
		}
	};

	const product: Product | undefined | null = useMemo(() => {
		if (data) {
			return {
				business_id: data.business_id || '',
				category_id: data.category_id || '',
				colors: data.colors || ['red', '#FFD027'],
				createdAt: data.createdAt || '',
				description: data.description || '',
				expireDate: data.expireDate || '',
				id: data.id || '',
				images: data.images || [],
				name: data.name || '',
				price: data.price || 0,
				size: data.size || ['xs', 's', 'l'],
				status: data.status || [],
				stock: data.stock || 0,
				updatedAt: data.updatedAt || '',
			};
		}
		return null;
	}, [data]);

	const [displayedProductImg, setDisplayedProductImg] = useState<string>('');

	useEffect(() => {
		if (product && product?.images && product.images.length > 0) {
			setDisplayedProductImg(product.images[0]);
		}
	}, [product]);

	const setCurrentImg = (currentImg: number) => {
		if (product) {
			setDisplayedProductImg(product.images[currentImg]);
		}
	};

	const [seletedColor, setSeletedColor] = useState<string>(
		product ? product.colors[0] : ''
	);

	const setCurrentColor = (currentColor: number) => {
		if (product) {
			setSeletedColor(product.colors[currentColor]);
		}
	};

	const [seletedSize, setSeletedSize] = useState<string>(
		product ? product.size[0] : ''
	);

	const setCurrentSize = (currentSize: number) => {
		if (product) {
			setSeletedSize(product.size[currentSize]);
		}
	};

	const [quantity, setQuantity] = useState<number>(1);

	const addQuantity = () => {
		if (product && quantity < product.stock) {
			setQuantity(quantity + 1);
		}
	};

	const subtractQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	return (
		<div className="p-5 w-full flex flex-col justify-between gap-6 lg:gap-0 lg:flex-row lg:h-[80vh]">
			<div className="gap-4 w-full lg:w-1/2 flex flex-col lg:flex-row justify-around lg:h-full">
				<div className="lg:h-full flex flex-row lg:flex-col w-full lg:w-[20%] order-2 lg:order-1 justify-between">
					{product?.images ? (
						product.images.map((productImg, index) => (
							<img
								key={index}
								onClick={() => setCurrentImg(index)}
								src={productImg}
								alt=""
								className="w-[24%] lg:w-auto lg:h-[24%]"
							/>
						))
					) : (
						<div>loading... </div>
					)}
				</div>
				<div className="w-full lg:w-[80%] order-1 lg:order-2 lg:h-full flex justify-center">
					<img
						src={displayedProductImg}
						alt=""
						className="h-[60vh] lg:h-full w-auto"
					/>
				</div>
			</div>
			<div className="w-full lg:w-1/2 flex justify-center">
				<div className="w-full lg:w-[90%] gap-6 lg:gap-0 h-full flex flex-col justify-between">
					<div className="productPath ">
						Home/{product?.category_id[1]}/{product?.name}
					</div>
					<h4
						style={{
							fontFamily: 'Inter',
							fontSize: '48px',
							fontWeight: '500',
							lineHeight: '60px',
							letterSpacing: '-1.75px',
							textAlign: 'left',
						}}
					>
						{product?.name}
					</h4>
					<div className=" flex flex-col justify-center gap-[20px]">
						<section className="flex justify-between items-center ">
							<div className="flex items-center gap-[10px]">
								<StarComponent rating={4} clickable={false} />
								<div>{4} Ratings</div>
							</div>
							<div>{product?.stock} Available</div>
						</section>
						<section className="flex justify-between">
							<h3
								style={{
									fontFamily: 'Inter',
									fontSize: '14px',
									fontWeight: '700',
									lineHeight: '24px',
									letterSpacing: '-0.20000000298023224px',
									textAlign: 'left',
								}}
							>
								Select color
							</h3>
							<div className="flex items-center gap-[5px]">
								{product?.colors.map((productcolor, index) => (
									<div
										key={index}
										className={`p-[2px] ${
											seletedColor === productcolor
												? 'border-[1px]  border-[#1C222B]'
												: ''
										}`}
									>
										<div
											onClick={() => {
												setCurrentColor(index);
											}}
											style={{
												width: '15px',
												height: '15px',
												backgroundColor: `${productcolor}`,
											}}
										></div>
									</div>
								))}
							</div>
						</section>
						<section className="flex flex-col gap-2">
							<div className="flex justify-between">
								<h3
									style={{
										fontFamily: 'Inter',
										fontSize: '14px',
										fontWeight: '700',
										lineHeight: '24px',
										letterSpacing: '-0.20000000298023224px',
										textAlign: 'left',
									}}
								>
									{' '}
									select size
								</h3>
								<Link
									className="text-blue-700 underline self-end text-right"
									to=""
								>
									Size guide
								</Link>
							</div>
							<div className="flex gap-2">
								{product?.size.map((size, index) => (
									<div
										key={index}
										className={`sizes cursor-pointer border-[1px] py-2 px-4 ${
											seletedSize === size
												? 'border-[2px] border-[#1C222B]'
												: 'no size'
										}`}
										onClick={() => {
											setCurrentSize(index);
										}}
									>
										{size}
									</div>
								))}
							</div>
						</section>
						<section className="flex gap-6">
							<div className="flex flex-col gap-4">
								<h3
									style={{
										fontFamily: 'Inter',
										fontSize: '14px',
										fontWeight: '700',
										lineHeight: '24px',
										letterSpacing: '-0.20000000298023224px',
										textAlign: 'left',
									}}
								>
									Quantity
								</h3>
								<div className="flex gap-4 py-2 px-4 border-[1px] border-[#D7DFE9]">
									<div className="text-[#D7DFE9]" onClick={subtractQuantity}>
										<FontAwesomeIcon icon={faMinus} />
									</div>
									<div className="">{quantity}</div>
									<div className="text-[#D7DFE9]" onClick={addQuantity}>
										<FontAwesomeIcon icon={faPlus} />
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-4">
								<h3
									style={{
										fontFamily: 'Inter',
										fontSize: '14px',
										fontWeight: '700',
										lineHeight: '24px',
										letterSpacing: '-0.20000000298023224px',
										textAlign: 'left',
									}}
								>
									Price
								</h3>
								<p className="font-bold mt-2" style={{ whiteSpace: 'nowrap' }}>
									{product ? (
										<>
											{product.price ? (
												<div>{((product.price || 0) - 0) * quantity} EUR</div>
											) : (
												<div>{product.price * quantity} EUR</div>
											)}
										</>
									) : (
										<div>Loading...</div>
									)}
								</p>
							</div>
						</section>
					</div>
					<section className="flex gap-[20px]">
						<button
							className={`bg-[#1C222B] py-[10px] px-[40px] text-[white] ${
								loading ? 'opacity-50 cursor-not-allowed' : ''
							} `}
							style={{
								whiteSpace: 'nowrap',
								opacity: !seletedColor || !seletedSize || loading ? '0.5' : '1',
							}}
							onClick={addToCart}
							disabled={(!seletedColor && !seletedSize) || loading}
						>
							{loading ? (
								<div className="flex items-center justify-center">
									Loading...
									<div className="inline-block ml-2 w-4 h-4 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
								</div>
							) : (
								'Add to bag'
							)}
						</button>
						<button
							className="flex gap-[5px] justify-center items-center border-[2px] border-[#D7DFE9] py-[10px] px-[40px]"
							style={{ whiteSpace: 'nowrap' }}
							onClick={() => handleAddToWishlist(productId)}
						>
							<img src={heart} alt="" />
							<p>Save</p>
						</button>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Productsdisplay;
