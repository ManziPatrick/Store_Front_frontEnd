import { useEffect, useState } from 'react';

import CustomButton from '../../Custombutton/CustomButton';
import magnify from './../../../assets/products/magnifier.svg';
import './payment.css';
import visa from './../../../assets/payments/visa.svg';
import mastercard from './../../../assets/payments/mastercard.svg';
import paypal from './../../../assets/payments/paypal.svg';
import defautCheck from './../../../assets/payments/check.svg';
import emptyCheck from './../../../assets/payments/emptyCheck.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultPayment } from '../../../redux/reducer/paymentOptionsSlice';
import { RootState } from '../../../redux/store/store';
import ProductPagination from '../../Pagination/ProductPagination';
import NewPayment from '../NewPayment/NewPayment';

interface PaymentOption {
	paymentType: 'visa' | 'paypal' | 'mastercard';
	ownerName: string;
	cardNumber: string;
	expiryDate: string;
	default: boolean;
}
const PaymentOption: React.FC = () => {
	const dispatch = useDispatch();
	const paymentOptions = useSelector(
		(state: RootState) => state.paymentOptions.paymentOptions
	);
	const [searchBar, setsearchBar] = useState('');
	const itemsperPage = 3;
	//const newPaymentOptions: PaymentOption[] = paymentOptions.reverse() || [];

	const loading: boolean = false;
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setsearchBar(event.target.value);
	};

	const [showNewPaymentModal, setShowNewPaymentModal] = useState(false);
	const toggleShowNewPayementModal = () => {
		setShowNewPaymentModal(!showNewPaymentModal);
	};
	useEffect(() => {
		setsearchBar('');
	}, [loading]);

	const getPaymentImage = (paymentType: string) => {
		if (paymentType === 'visa') {
			return visa;
		} else if (paymentType === 'paypal') {
			return paypal;
		} else {
			return mastercard;
		}
	};
	const toggleDefaultPayment = (index: number) => {
		dispatch(setDefaultPayment(index));
	};

	return (
		<>
			<div className="md:fixed static top-[10vh] mt-[10vh] md:mt-0  left-[0vw] md:left-[19vw] lg:left-[15vw] md:w-[80vw] lg:w-[85vw] w-[100vw]  h-[90vh]">
				<div className="productsPayment">
					<div
						className={`${paymentOptions.length > 0 && !loading ? 'paymentHeading' : 'divDissapear'}`}
					>
						<div className="headingContainer">
							<div className="productsHead">
								<h2>Payment options</h2>

								{searchBar === '' && (
									<h3>{paymentOptions.length ? 'member' : 'members'}</h3>
								)}
							</div>
							<div className="headicons">
								<div className="searchbar">
									<img src={magnify} alt="" />
									<input
										className="custom-input focus:border-transparent focus:outline-none"
										type="text"
										value={searchBar}
										onChange={handleSearch}
									/>
								</div>
								<CustomButton
									bgColor="#0408E7"
									borderProps={['none']}
									buttonText="New Payment Option"
									buttonType="button"
									paddingProps={['6px', '12px']}
									handleClick={toggleShowNewPayementModal}
									rounded="5px"
									className="text-[14px]"
									txtColor="white"
								/>
							</div>
						</div>
					</div>
					<div className="paymentsOptions">
						{paymentOptions.slice(0, itemsperPage).map((payment, index) => (
							<div
								className={
									payment.default ? 'paymentOptionDefault' : 'paymentOption'
								}
							>
								<div className="flex gap-[12px]">
									<div className={`optImg`}>
										<img src={getPaymentImage(payment.paymentType)} alt="" />
									</div>
									<div className="detButtons">
										<div className={`customerDetails`}>
											<h1
												className={
													payment.default
														? 'text-[#0306BA] text-[14px] font-[600]'
														: 'text-[#344054] text-[14px] font-[600]'
												}
											>
												{payment.ownerName}
											</h1>
											<p
												className={
													payment.default
														? 'text-[#0306BA] text-[14px] font-[500]'
														: 'text-[#344054] text-[14px] font-[500]'
												}
											>
												{payment.cardNumber}
											</p>
											<p
												className={
													payment.default
														? 'text-[#0306BA] text-[14px] font-[500]'
														: 'text-[#344054] text-[14px] font-[500]'
												}
											>
												Expiry {payment.expiryDate}
											</p>
										</div>
										<div className="flex gap-[20px]">
											<button
												className={
													payment.default
														? 'text-[#0306BA] text-[14px] font-[400]'
														: 'text-[#344054] text-[14px] font-[400]'
												}
												onClick={() => toggleDefaultPayment(index)}
											>
												Set as default
											</button>
											<button className="text-[#0306BA] text-[14px] font-[500]">
												Edit
											</button>
										</div>
									</div>
								</div>
								<div>
									<img
										src={payment.default ? defautCheck : emptyCheck}
										alt=""
									/>
								</div>
							</div>
						))}
					</div>
					<div className="flex justify-between w-[98%] pb-3">
						{searchBar === '' && (
							<div className="showingFrom">
								Showing page {1} from {1}{' '}
							</div>
						)}

						{searchBar === '' && (
							<ProductPagination
								currentPage={1}
								totalPages={1}
								onPageChange={() => {}}
								maxVisiblePages={1}
							/>
						)}
					</div>
				</div>
			</div>
			<NewPayment
				showModel={toggleShowNewPayementModal}
				toogleshowModel={showNewPaymentModal}
			/>
		</>
	);
};

export default PaymentOption;
