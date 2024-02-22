import { RootState } from '../../redux/store/store';
import { useEffect } from 'react';
import { fetchSimilarProducts } from '../../redux/actions/shopnest/singlePage';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { useSelector } from 'react-redux';
import { Img } from '../../components/fistcustomerlogin/lmage';
import { Text } from '../../components/fistcustomerlogin/searchField';
import StarComponent from './starComponent';
import { Link } from 'react-router-dom';

const SimilarProducts: React.FC<{ productId: string }> = ({ productId }) => {
	const dispatch = useAppDispatch();

	const { data } = useSelector((state: RootState) => state.similarProducts);

	const newproducts = data ?? [];

	const itemsPerPage = 8;
	useEffect(() => {
		dispatch(fetchSimilarProducts({ productId, page: 1, itemsPerPage }));
	}, [dispatch, productId]);

	return (
		<>
			<button
				className="mx-auto grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-[34px] items-center justify-center  w-[95%] lg:[w-[85%]]"
				onClick={() => {
					window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
				}}
				role="button"
			>
				{newproducts ? (
					newproducts.slice(0, 8).map((product, index) => (
						<div key={index} className="w-full relative">
							<button className=" absolute top-4 right-4 px-[8px] py-1 text-[#11A75C] bg-[#1DB4691F] ">
								best seller
							</button>
							<Link to={`/shopnest/${product.id}`}>
								<Img
									className="md:h-[286px] sm:h-auto object-cover w-full md:w-full"
									src={product.images[0] || 'no image '}
									alt={`image_${index + 1}`}
								/>
							</Link>

							<div className="flex relative flex-row items-start justify-start w-full">
								<div className="flex relative flex-1 flex-col gap-2 items-start justify-start w-full">
									<Text className="text-base text-gray-900 tracking-[-0.30px] w-auto font-bold">
										{product.name}
									</Text>
									<Text className="text-gray-900 text-sm tracking-[-0.20px] w-auto">
										{product.categoryName.name}
									</Text>
									<div className="flex">
										<StarComponent rating={3} clickable={false} />
										<Text className="font-medium px-10 placeholder:text-gray-900 text-gray-900 text-left text-sm tracking-[-0.20px] w-full">
											{3} ratings
										</Text>
									</div>

									<div className="flex flex-row gap-2 items-center justify-start w-full">
										<Text className="text-base text-gray-900 font-bold  tracking-[-0.30px] w-auto">
											$
											{product.price && product.discountedPrice
												? product.price - product.discountedPrice
												: product.price}
										</Text>
										<Text className="text-base text-[#AFBACA] line-through tracking-[-0.30px] w-auto">
											{product.percentage ? `$${product.price}` : null}
										</Text>
										<Text className="text-base text-[#D21A0E] font-bold tracking-[-0.30px] w-auto">
											{product.percentage ? `${product.percentage}% OFF` : null}
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
							</div>
						</div>
					))
				) : (
					<div>No similar products available now, please wait</div>
				)}
			</button>
			<div className="sm:w-full my-8"></div>
		</>
	);
};
export default SimilarProducts;
