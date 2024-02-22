import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import {
	fetchCartProducts,
	deleteCartProduct,
	updateQuantity,
	// clearCart,
	deleteAllCartProducts
	
} from '../../../redux/actions/payment/Cartpayment';
import visa from './../../../assets/payments/visa.svg';
import defautCheck from './../../../assets/payments/check.svg';
import mastercard from '../../../assets/payments/mastercard.svg';
import { chargePayment } from '../../../redux/actions/payment/payment';
import { RootState } from '../../../redux/store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import tash from '../../../assets/icons/payment/ei_trash.svg';
import fluent_card from '../../../assets/icons/payment/fluent_card-ui-20-filled.png';
import PayPal from '../../../assets/icons/payment/PayPal_logo logo.png';
import Bluebutton from '../../../components/Bluebutton/Bluebutton';

import { Link } from 'react-router-dom';
import { paypalPayment } from '../../../redux/actions/payment/paypal/paypal';
import emptycart from './../../../assets/icons/payment/Empty Cart.svg';
import Pagination from '../../../components/DashBoard/Pagination/Pagination';
import ShopNestNavbar from '../../../components/shopnest/ShopNestNavbar';
import Footer from '../../../components/shopnest/Footer';
import emptyCheck from './../../../assets/payments/emptyCheck.svg';
import './cartpayment.css';
import { toast } from 'react-toastify';

// import { set } from 'lodash';

interface Product {
	id: string;
	productId: string;
	quantity: number;
	userId: string;
	colors: string[];
	size: string[];
	Product: {
		id: string;
		business_id: string;
		name: string;
		images: string[];
		discountedPrice?: number;
		price: number;
	};
}

const CartShopping: React.FC = () => {
	const dispatch = useAppDispatch();
	// const [payPalSelected, setpayPalSelected] = useState<boolean>(true);
	const cartProducts = useSelector((state: RootState) => state.Cartpayment);
	const [currentPage, setCurrentPage] = useState(1);
	const [activeCard, setActiveCard] = useState<boolean>(true);
	const [showForm, setShowForm] = useState(false);
	const [deletedProductIds, setDeletedProductIds] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedCard, setselectedCard] = useState<boolean>(true);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [paymentInfo, setPaymentInfo] = useState({
		nameOnCard: '',
		cardNumber: '',
		expDate: '',
		expMonth: '',
		expYear: '',
		cvc: '',
	});
	const [formData, setFormData] = useState({
		name: '',
		cardNumber: '',
		cvv: '',
	});
	const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prevData) => ({
		...prevData,
		[id]: value,
		}));
	};
	

	

	const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPaymentInfo((prevInfo) => ({
			...prevInfo,
			[name]: value,
		}));
	};
	

	const handleClear = async () => {
	try {
		
		await dispatch(deleteAllCartProducts());
		
	} catch (error) {
		
		console.error('Error clearing cart:', error);
		
	}
	};
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		dispatch(fetchCartProducts({ page }));
	};
	
const handlePalpal = async () => {
	const isConfirmed = window.confirm('Are you sure you want to proceed with the payment?');
	if (!Object.values(formData).every((value) => value.trim() !== '')) {
		
		toast('Please fill in all required fields', { theme: 'colored', type: 'error' });
		return;
	}
	const cardNumberRegex = /^\d{16}$/;
	const cvvRegex = /^\d{3}$/; 
	
	if (!cardNumberRegex.test(formData.cardNumber)) {
		toast('Invalid card number format', { theme: 'colored', type: 'error' });
		return;
	}
	
	if (!cvvRegex.test(formData.cvv)) {
		toast('Invalid CVV format', { theme: 'colored', type: 'error' });
		return;
	}
	if (!isConfirmed) {
     
		return;
	}
	
	try {
		setIsLoading(true);
	
		// Perform PayPal action
		await dispatch(paypalPayment());
	
		// Fetch cart products after successful PayPal action
		await dispatch(fetchCartProducts({ page: 1 }));
	} catch (error) {
		console.error(error);
		toast('An error occurred during PayPal payment', { theme: 'colored', type: 'error' });
	} finally {
		setIsLoading(false);
		toggleModal();
	}
	};
	
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		
	};

	const handleCheckout = async () => {
		
		const isConfirmed = window.confirm('Are you sure you want to proceed with the payment?');
    if (!isConfirmed) {
     
      return;
    }
		setIsLoading(true);

		try {
			await dispatch(chargePayment(paymentInfo));
			dispatch(fetchCartProducts({ page: 1 }));
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
			toggleModal();
		}
	};


	const updateCartItemQuantity = async (
		productId: string,
		newQuantity: number
	) => {
		try {
			await dispatch(
				updateQuantity({
					productId,
					quantity: newQuantity,
				})
			);
		} catch (error) {
			console.error(error);
		}
	};

	const toggleModal = () => {
		setShowForm(!showForm);
	};
	const closeForm = () => {
		setShowForm(false);
	};

	const toggleColor = (productId: string) => {
		setDeletedProductIds((prevIds) => {
			if (prevIds.includes(productId)) {
				return prevIds.filter((id) => id !== productId);
			} else {
				return [...prevIds, productId];
			}
		});
	};

	const deleteCartItem = async (productId: string) => {
		try {
			await dispatch(deleteCartProduct(productId));

			toggleColor(productId);
			dispatch(fetchCartProducts({ page: 1 }));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const abortController = new AbortController();

		const fetchCartData = async (page: number) => {
			try {
				await dispatch(fetchCartProducts({ page }));
			} catch (error) {
				console.error(error);
			}
		};

		fetchCartData(currentPage);

		return () => {
			abortController.abort();
		};
	}, [currentPage, dispatch, setIsLoading]);

	useEffect(() => {
		const calculatedTotalPrice = cartProducts.products.reduce(
		(acc, product) => {
			const price = product.Product.price;
			const discountedPrice = product.Product.discountedPrice || 0;
			return acc + (price - discountedPrice) * product.quantity;
		},
		0
		);
		setTotalPrice(calculatedTotalPrice);
	}, [cartProducts]);
	const calculateTotalProductPrice = (product: Product): number => {
		const price = product.Product.price;
		const discountedPrice = product.Product.discountedPrice || 0;
		return price * product.quantity - discountedPrice * product.quantity;
	};

	return (
		<div className="w-[100%] ">
			<ShopNestNavbar initialNavBar="cart" />
			<div className="px-4">
				<div className="flex flex-col gap-10">
					<div className=" text-center flex flex-col gap-2">
						<p className="hidden md:block">Home / Shopping Cart </p>
						<h1
							style={{
								fontFamily: 'Oswald',
								fontSize: '48px',
								fontWeight: '400',
								lineHeight: '68px',
								letterSpacing: '0em',
								textAlign: 'center',
							}}
							className="hidden md:block"
						>
							Shopping Cart
						</h1>
					</div>
					{cartProducts.products.length === 0 ? (
						<div className="flex flex-col  items-center justify-center h-[70vh]">
							<div className="w-1/3 md:w-full flex flex-col items-center justify-center ">
								<img className="" src={emptycart} alt="" />
								<h2 className="text-[28px] font-bold text-center">
									Your cart is currently empty
								</h2>
								<p className="text-center">
									Looks like you haven't added any product on cart yet. Start by
									adding a new product to cart to get things going.
								</p>
								<Link
									className="flex items-center gap-2 bg-[black] text-white py-2 mt-3 px-3 rounded-md"
									to={'/shopnest'}
								>
									<FontAwesomeIcon icon={faPlus} color="white" />
									<p>shop now</p>
								</Link>
							</div>
						</div>
					) : (
						<div>
							<div className="flex w-full gap-4 md:flex-col md:w-full sm:w-full">
								<div className="w-full">
									{isLoading ? (
										<div className="animate-pulse flex">
											<div className="flex-1">
												<div className="h-1 bg-green-600"></div>
											</div>
										</div>
									) : (
										<div></div>
									)}

									<div className="flex flex-col lg:flex-row items-start gap-10 ">
										<div className="w-full flex flex-col  justify-center">
											<div className="flex justify-between mb-8 md:hidden">
												<div className="flex items-center gap-3">
													<p className="text-[24px] font-[600]">My Cart</p>
													<button className=" w-[32px] h-[32px] rounded-full bg-[#0A9952] text-[#FFFFFF]">
														{cartProducts.products.length}
													</button>
												</div>
												<div>
													<img src="/reviews/x-close.svg" alt="" />
												</div>
											</div>
											{/* table starts here */}
											<div
												className="w-full flex flex-col gap-4"
												style={{
													borderCollapse: 'collapse',
												}}
											>
												{/* table head */}
												<div className=" hidden md:flex flex-row font-[700]">
													<div className=" w-[45%]">product</div>
													<div className=" w-[13%]">price</div>
													<div className="w-[12%]">size</div>
													<div className=" w-[17%]">Quantity</div>
													<div className="w-[8%]">total</div>
													<div className=" w-[4%]"></div>
												</div>
												{/* table body */}
												<div className="flex flex-col md:py-0 py-4">
													{cartProducts.products
														.slice()

														.map((products: Product) => (
															<div
																key={products.id}
																
																className="tableshadow  flex flex-row items-center justify-around rounded-[12px] py-[3px]"
															>
																<div className="w-[29%] md:w-[17%]">
																	<img
																		src={products.Product.images[0]}
																		alt=""
																		className={`w-[120px] h-[120px] object-cover  md:w-[100px] md:h-[100px] rounded-[10px]  cursor-pointer ${
																			deletedProductIds.includes(products.id)
																				? 'filter brightness-75'
																				: ''
																		}`}
																		onClick={() => toggleColor(products.id)}
																	/>
																</div>
																<div className="text-left flex flex-col justify-between md:flex-row w-[52%] md:w-[68%]  gap-[10px] md:gap-0 self-stretch items-center">
																	<div className="w-[100%] md:w-[39%] flex flex-col gap-[10px] md:gap-0 justify-around md:justify-center md:self-stretch">
																		<h1 className="text-[16px] font-[800]">
																			{products.Product.name}
																		</h1>
																		<div className="flex flex-col-reverse md:gap-[10px] md:flex-row">
																			<div className="size : {products.size}">
																				size : {products.size}
																			</div>

																			<div className="flex flex-row gap-1">
																				<label className="text-[14px] text-[#475367]">
																					color :
																				</label>
																				<div className="mt-1">
																					{(
																						products?.colors || [
																							'#1B4DFF',
																							'#FFD027',
																							'#8F0EA2',
																							'#E92215',
																						]
																					).map((color, index) => (
																						<div key={index}>
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
																	<div className="md:w-[18%] hidden md:block ">
																		<div>$ {calculateTotalProductPrice(products)}</div>
																	</div>
																	<div className="md:w-[18%] hidden md:block ">
																		size: {products.size}
																	</div>
																	<div className="w-fit self-start md:self-center md:w-[25%]  ">
																		<div className="border-2 flex justify-around gap-[15px] items-center py-[4px] px-[15px] w-fit">
																			<div
																				className="text-center text-[#9ca1a8]"
																				onClick={() =>
																					updateCartItemQuantity(
																						products.id,
																						products.quantity - 1
																					)
																				}
																			>
																				<FontAwesomeIcon icon={faMinus} />
																			</div>
																			<div className="text-center">
																				{products.quantity}
																			</div>
																			<div
																				className="text-center text-[#9ca1a8]"
																				onClick={() =>
																					updateCartItemQuantity(
																						products.id,
																						products.quantity + 1
																					)
																				}
																			>
																				<FontAwesomeIcon icon={faPlus} />
																			</div>
																		</div>
																	</div>
																</div>
																<div className="w-[16%] md:w-[12%] flex flex-col md:flex-row self-stretch justify-between md:self-center">
																	<div className=" w-[70%] relative font-extrabold md:font-normal ">
																		<span className="text-[10px] md:text-[16px]  md:font-normal absolute -left-2 md:relative   font-extrabold">
																			$
																		</span>
																		{(calculateTotalProductPrice(products)) * products.quantity}
																	</div>
																	<div className=" w-[30%]  ">
																		<img
																			src={tash}
																			alt=""
																			onClick={() =>
																				deleteCartItem(products.id)
																			}
																		/>
																	</div>
																</div>
															</div>
														))}
												</div>
												{cartProducts.products.length > 0 && (
													<div className=" flex justify-center items-center">
														<Pagination
															currentPage={currentPage}
															totalPages={cartProducts.totalPages || 1} // Adjust based on actual data structure
															onPageChange={handlePageChange}
														/>
													</div>
												)}
											</div>
											{/* big screen button  */}
											<div className=" md:flex justify-between flex-row items-start hidden  py-3">
												<Link to={''} className="w-full ">
													<Bluebutton
														buttonText={'Clear Cart'}
														isLoading={false}
														onClick={handleClear}
														style={{
															background: '#F0F2F2',
															color: 'black',
															width: '50%',
														}}
													/>
												</Link>

												<Link
													to={'/shopnest'}
													className="w-full flex flex-col items-end"
												>
													<Bluebutton
														buttonText={'CONTINUE SHOPPING'}
														isLoading={false}
														style={{
															background: '#F0F2F2',
															color: 'black',
															width: '50%',
														}}
													/>
												</Link>
											</div>
											<div className="flex justify-between  border-y-2 py-6 md:hidden">
												<p>subtotal</p>
												<div className=" font-extrabold relative">
													<span className="text-[10px]  absolute -left-2 font-extrabold">
														$
													</span>
													{(totalPrice - totalPrice * 0.05).toFixed(0)}
												</div>
											</div>
											{/* small screen button */}

											<div className=" flex justify-center font-[500] text-[14px] flex-col gap-3 py-8 items-center md:hidden ">
												<Bluebutton
													buttonText={'VIEW AND EDIT CART'}
													isLoading={false}
													style={{
														background: 'white',
														color: 'black',
														width: '100%',
														border: '1px solid #C4C4C4',
													}}
												/>

												<Bluebutton
													buttonText={'GO TO CHECKOUT'}
													isLoading={false}
													onClick={toggleModal}
													style={{
														background: 'black',
														color: 'white',
														width: '100%',
													}}
												/>
											</div>
										</div>

										{/* payments forms  */}

										<div
											className={`${
												showForm
													? 'fixed md:relative top-0 left-0 w-full h-full   items-center  bg-white'
													: 'hidden'
											} sm:hidden md:block md:flex-col justify-center items-center w-[100%] lg:w-1/2 border-2 p-4 rounded-md`}
										>
											<div className="  flex flex-col gap-3">
												<div className="flex justify-between ">
													<h1 className="font-bold text-xl">payment Details</h1>
													<button onClick={closeForm} className="">
														<img src="/reviews/x-close.svg" alt="" />
													</button>
												</div>
												{/* <div className=''> */}
												<h1 className="  ">Choose your mode of payment</h1>
												<div className="flex gap-3  justify-around items-center">
													<button
														className={`px-[12px] py-[8px] rounded-[6px] ${activeCard ? 'bg-[#F5F5FF] text-[#0408E7]' : 'bg-transparent text-[#667085]'}`}
														onClick={() => {
															setActiveCard(true);
														}}
													>
														<div className="flex gap-3">
															<img src={fluent_card} />
															<label className=" text-xl">card</label>
														</div>
													</button>
													
													<button
														className={`px-[12px] py-[8px] rounded-[6px] ${!activeCard ? 'bg-[#F5F5FF] text-[#0408E7]' : 'bg-transparent text-[#667085]'}`}
														onClick={() => {
															setActiveCard(false);
														}}
													>
														<img src={PayPal} />
													</button>
												</div>
												<form
													className={`w-full flex-col gap-[10px] ${activeCard ? 'flex' : 'hidden'}`}
													onSubmit={handleSubmit}
												>
													<button
														className={`border-[1px] flex w-full justify-between items-center p-[10px] rounded-[8px]
							${
								!selectedCard
									? 'border-[#0408E7] bg-[#F5F5FF]'
									: 'border-[#F5F5FF] bg-transparent'
							}
						`}
														onClick={() => {
															setselectedCard(false);
														}}
													>
														<div className="flex gap-[12px] items-center">
															<div className={`optImg`}>
																<img src={mastercard} alt="" />
															</div>

															<h1
																className={
																	!selectedCard
																		? 'text-[#0306BA] text-[14px] font-[600]'
																		: 'text-[#344054] text-[14px] font-[600]'
																}
															>
																Mastercard ending in 1234
															</h1>
														</div>
														<div>
															<img
																src={!selectedCard ? defautCheck : emptyCheck}
																alt=""
															/>
														</div>
													</button>
													<button
														className={`border-[1px] flex w-full justify-between items-center p-[10px] rounded-[8px]
							${
								selectedCard
									? 'border-[#0408E7] bg-[#F5F5FF]'
									: 'border-[#F5F5FF] bg-transparent'
							}
						`}
														onClick={() => {
															setselectedCard(true);
														}}
													>
														<div className="flex gap-[12px] items-center">
															<div className={`optImg`}>
																<img src={visa} alt="" />
															</div>

															<h1
																className={
																	selectedCard
																		? 'text-[#0306BA] text-[14px] font-[600]'
																		: 'text-[#344054] text-[14px] font-[600]'
																}
															>
																Visa ending in 1234
															</h1>
														</div>
														<div>
															<img
																src={selectedCard ? defautCheck : emptyCheck}
																alt=""
															/>
														</div>
													</button>

													<label>Name on Card</label>
													<input
														defaultValue={''}
														value={paymentInfo.nameOnCard}
														onChange={handlePaymentInfoChange}
														type="text"
														name="nameOnCard"
														placeholder="Bill Gates"
														className="w-full p-2 border text-[#666771] border-gray-300 rounded focus:outline-none"
													/>
													<label>Card Number</label>
													<input
														defaultValue={''}
														name="cardNumber"
														type="text"
														value={paymentInfo.cardNumber}
														onChange={handlePaymentInfoChange}
														placeholder="XXX-XXXX-XXXX-XXXXXX-X"
														className="w-full p-2 border text-[#666771] border-gray-300 rounded focus:outline-none"
													/>

													<div className="flex w-full gap-6 ">
														<div >
															<label className='py-3'> Expiration </label>
															<div className="flex ">
																<input
																	type="text"
																	name="expMonth"
																	value={`${paymentInfo.expMonth}`}
																	placeholder="MM"
																	maxLength={2}
																	className="w-full p-2 border  rounded text-[#666771] border-gray-300 focus:outline-none border-r-0"
																	onChange={handlePaymentInfoChange}
																/>
																<input
																	type="text"
																	name="expYear"
																	value={paymentInfo.expYear}
																	placeholder="YYYY"
																	maxLength={4}
																	className="p-2 border rounded  text-[#666771] border-gray-300 focus:outline-none w-full"
																	onChange={handlePaymentInfoChange}
																/>
															</div>
														</div>

														<div className="w-full">
															<label className="block py-3 font-semibold text-[#666771]">
																CVC
															</label>
															<input
																defaultValue={''}
																type="text"
																name="cvc"
																placeholder="XXX-XXXX"
																value={paymentInfo.cvc}
																onChange={handlePaymentInfoChange}
																className="p-2 border text-[#666771]  border-gray-300 rounded focus:outline-none w-full"
															/>
														</div>
													</div>

													

													<div className="flex gap-6">
														<div>
															<p>Sub-total</p>

															<p>Total</p>
														</div>
														<div>
															<p>
																${(totalPrice - totalPrice * 0.05).toFixed(0)}
															</p>

															<p>$
															{totalPrice}</p>
														</div>
													</div>

													<Bluebutton
														buttonText={isLoading ? 'Processing...' : 'Checkout'}
														isLoading={isLoading}
														onClick={handleCheckout}
														style={{ background: 'black' }}
													/>
												</form>
											</div>
											<form
												className={`w-full flex-col gap-[10px] ${!activeCard ? 'flex' : 'hidden'}`}
												onSubmit={handleSubmit}
											>
												<div className="w-full flex flex-col gap-[10px]">
													<>
														<label
															className=" text-[14px] leading-[24px]"
															htmlFor="name"
														>
															Name
														</label>
														<input
															className="w-full p-2 border text-[#666771] border-gray-300 rounded focus:outline-none"
															type="text"
															id="name"
															onChange={handleInputChange}
															value={formData.name}
															placeholder="e.g John Doe "
														/>
													</>
													<>
														<label
															className=" text-[14px] leading-[24px]"
															htmlFor="cardnumber"
														>
															Card number
														</label>
														<input
														className="w-full p-2 border text-[#666771] border-gray-300 rounded focus:outline-none"
														type="text"
														id="cardNumber"
														name='cardnumber'
														onChange={handleInputChange}
														value={formData.cardNumber}
														placeholder="e.g 1234 1234 1234 1234 "
														/>
													</>
													<>
														<label
															className="text-[14px] leading-[24px]"
															htmlFor="cvv"
														>
															CVV
														</label>
														<input
															className="w-full p-2 border text-[#666771] border-gray-300 rounded focus:outline-none"
															type="text"
															id="cvv"
															onChange={handleInputChange}
															value={formData.cvv}
															
															placeholder="e.g 123 "
														/>
														<div className="flex gap-6">
														<div>
															<p>Sub-total</p>

															<p>Total</p>
														</div>
														<div>
															<p>
																${(totalPrice - totalPrice * 0.05).toFixed(0)}
															</p>

															<p>$
															{totalPrice}</p>
														</div>
													</div>
													</>
												</div>
												<div className="flex justify-between gap-[10px] mt-5">
													<Bluebutton
														buttonText={'Checkout'}
														isLoading={isLoading}
														onClick={handlePalpal}
														style={{ background: 'black' }}
													/>
												</div>
											</form>
										</div>
									</div>
								</div>
								{/* )} */}
							</div>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default CartShopping;
