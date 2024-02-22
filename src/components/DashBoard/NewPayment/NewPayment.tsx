import React, { ChangeEvent, useEffect, useState } from 'react';

import CustomButton from '../../Custombutton/CustomButton';
import closebtn from './../../../assets/close.png';
import visa from './../../../assets/payments/visa.svg';
import mastercard from './../../../assets/payments/mastercard.svg';
import paypal from './../../../assets/payments/paypal.svg';
import defautCheck from './../../../assets/payments/check.svg';
import emptyCheck from './../../../assets/payments/emptyCheck.svg';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { addPaymentOption } from '../../../redux/reducer/paymentOptionsSlice';

interface NewDiscountModalProps {
	showModel: () => void;
	toogleshowModel: boolean;
}

interface IFormData {
	cardOwner: string;
	cardNumber: string;
	cvv: string;
}

interface PaymentOption {
	id: string;
	cardNumber: string;
	default: boolean;
	expiryDate: string;
	ownerName: string;
	paymentType: 'visa' | 'paypal' | 'mastercard';
}

const NewPayment: React.FC<NewDiscountModalProps> = ({
	showModel,
	toogleshowModel,
}) => {
	const [activeCard, setActiveCard] = useState<boolean>(true);
	const [selectedCard, setselectedCard] = useState<boolean>(true);
	const [payPalSelected, setpayPalSelected] = useState<boolean>(true);
	const tooglepayPalSelected = () => {
		setpayPalSelected(!payPalSelected);
	};
	const paymentOptions = useSelector(
		(state: RootState) => state.paymentOptions.paymentOptions
	);
	const dispatch = useAppDispatch();

	const cardOption: PaymentOption = {
		id: '',
		cardNumber: '',
		default: false,
		expiryDate: '',
		ownerName: '',
		paymentType: 'visa',
	};

	const [cardformData, setCardFormData] = useState<IFormData>({
		cardOwner: '',
		cardNumber: '',
		cvv: '',
	});

	const [palformData, setPalFormData] = useState<IFormData>({
		cardOwner: '',
		cardNumber: '',
		cvv: '',
	});

	const handleCardInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setCardFormData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	useEffect(() => {
		cardOption.id = paymentOptions.length.toString();
		cardOption.cardNumber = cardformData.cardNumber;
		cardOption.default = false;
		cardOption.expiryDate = '12/2025';
		cardOption.ownerName = cardformData.cardOwner;
		cardOption.paymentType = selectedCard ? 'visa' : 'mastercard';
		// eslint-disable-next-line
	}, [cardformData]);

	const handleSubmitCard = (e: React.FormEvent) => {
		e.preventDefault();

		// Perform validation checks

		if (
			!cardformData.cardOwner ||
			!cardformData.cardNumber ||
			!cardformData.cvv
		) {
			setCardFormData;
			toast.error('Empty fields are not allowed');
			return;
		} else {
			// Dispatch an action to add the new payment method
			dispatch(addPaymentOption(cardOption));
			toast.success('new payment method added');
		}

		// Close the modal
		showModel();
	};

	const handleSubmitPal = (e: React.FormEvent) => {
		e.preventDefault();

		// Perform validation checks
		if (!palformData.cardOwner || !palformData.cardNumber || !palformData.cvv) {
			setPalFormData;
			// Handle validation error (e.g., show error message)
			return;
		}

		// Dispatch an action to add the new payment method
		//dispatch(addPaymentMethod(formData));

		// Close the modal
		showModel();
	};

	return (
		<div
			className={`bg-[#FDFDFD80] absolute top-0 left-0 w-[100vw] h-[100vh] z-10 justify-center items-center overflow-auto ${toogleshowModel ? 'flex' : 'hidden'}`}
		>
			<div
				className="rounded-[12px] flex flex-col gap-[24px] z-11 w-[90vw] md:w-[30vw] px-[30px] py-[20px] md:absolute md:right-[20px] md:top-[80px]"
				style={{
					background: 'var(--base-white, #fff)',
					boxShadow:
						'0px 8px 8px -4px rgba(16, 24, 40, 0.03),0px 20px 24px -4px rgba(16, 24, 40, 0.08)',
				}}
			>
				<div className="flex flex-row justify-between items-center w-full">
					<h2 className="text-[18px] font-[600] leading-[30px]">Payment</h2>
					<img
						className="cursor-pointer"
						onClick={showModel}
						src={closebtn}
						alt=""
					/>
				</div>
				<div>
					<button
						className={`px-[12px] py-[8px] rounded-[6px] ${activeCard ? 'bg-[#F5F5FF] text-[#0408E7]' : 'bg-transparent text-[#667085]'}`}
						onClick={() => {
							setActiveCard(true);
						}}
					>
						Card
					</button>
					<button
						className={`px-[12px] py-[8px] rounded-[6px] ${!activeCard ? 'bg-[#F5F5FF] text-[#0408E7]' : 'bg-transparent text-[#667085]'}`}
						onClick={() => {
							setActiveCard(false);
						}}
					>
						Paypal
					</button>
				</div>

				<form
					className={`w-full flex-col gap-[10px] ${activeCard ? 'flex' : 'hidden'}`}
					onSubmit={handleSubmitCard}
				>
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
							<img src={selectedCard ? defautCheck : emptyCheck} alt="" />
						</div>
					</button>
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
							<img src={!selectedCard ? defautCheck : emptyCheck} alt="" />
						</div>
					</button>
					<div className="w-full flex flex-col gap-[10px]">
						<>
							<label
								className="text-[#3D4A5C] font-[600] text-[14px] leading-[24px]"
								htmlFor="cardOwner"
							>
								Name
							</label>
							<input
								className="w-full border-[1px] border-[#AFBACA] p-[10px] rounded-[6px]"
								type="text"
								id="cardOwner"
								placeholder="e.g John Doe "
								value={cardformData.cardOwner}
								onChange={handleCardInputChange}
							/>
						</>
						<>
							<label
								className="text-[#3D4A5C] font-[600] text-[14px] leading-[24px]"
								htmlFor="cardNumber"
							>
								Card number
							</label>
							<input
								className="w-full border-[1px] border-[#AFBACA] p-[10px] rounded-[6px]"
								type="text"
								id="cardNumber"
								placeholder="e.g 1234 1234 1234 1234 "
								value={cardformData.cardNumber}
								onChange={handleCardInputChange}
							/>
						</>
						<>
							<label
								className="text-[#3D4A5C] font-[600] text-[14px] leading-[24px]"
								htmlFor="cvv"
							>
								CVV
							</label>
							<input
								className="w-full border-[1px] border-[#AFBACA] p-[10px] rounded-[6px]"
								type="text"
								id="cvv"
								placeholder="e.g 123 "
								value={cardformData.cvv}
								onChange={handleCardInputChange}
							/>
						</>
					</div>
					<div className="flex justify-between gap-[10px] mt-5">
						<CustomButton
							bgColor="#fff"
							borderProps={['solid', '#D0D5DD', '1px']}
							buttonText="Cancel"
							buttonType="button"
							paddingProps={['10px', '20px']}
							handleClick={showModel}
							rounded="8px"
							className="w-1/2"
							txtColor="black"
						/>
						<CustomButton
							bgColor="#0408E7"
							borderProps={['solid', 'black', '0px']}
							buttonText="Send"
							buttonType="submit"
							paddingProps={['10px', '20px']}
							handleClick={() => {}}
							rounded="8px"
							className="w-1/2"
							txtColor="white"
						/>
					</div>
				</form>
				<form
					className={`w-full flex-col gap-[10px] ${!activeCard ? 'flex' : 'hidden'}`}
					onSubmit={handleSubmitPal}
				>
					<div
						className={`cursor-pointer border-[1px] flex w-full justify-between items-center p-[10px] rounded-[8px]
							${
								payPalSelected
									? 'border-[#0408E7] bg-[#F5F5FF]'
									: 'border-[#F5F5FF] bg-transparent'
							}
						`}
						onClick={tooglepayPalSelected}
					>
						<div className="flex gap-[12px] items-center">
							<div className={`optImg`}>
								<img src={paypal} alt="" />
							</div>

							<h1
								className={
									payPalSelected
										? 'text-[#0306BA] text-[14px] font-[600]'
										: 'text-[#344054] text-[14px] font-[600]'
								}
							>
								Visa ending in 1234
							</h1>
						</div>
						<div>
							<img src={payPalSelected ? defautCheck : emptyCheck} alt="" />
						</div>
					</div>

					<div className="w-full flex flex-col gap-[10px]">
						<>
							<label
								className="text-[#3D4A5C] font-[600] text-[14px] leading-[24px]"
								htmlFor="name"
							>
								Name
							</label>
							<input
								className="w-full border-[1px] border-[#AFBACA] p-[10px] rounded-[6px]"
								type="text"
								id="name"
								value={palformData.cardOwner}
								placeholder="e.g John Doe "
							/>
						</>
						<>
							<label
								className="text-[#3D4A5C] font-[600] text-[14px] leading-[24px]"
								htmlFor="cardnumber"
							>
								Card number
							</label>
							<input
								className="w-full border-[1px] border-[#AFBACA] p-[10px] rounded-[6px]"
								type="text"
								id="cardnumber"
								value={palformData.cardNumber}
								placeholder="e.g 1234 1234 1234 1234 "
							/>
						</>
						<>
							<label
								className="text-[#3D4A5C] font-[600] text-[14px] leading-[24px]"
								htmlFor="cvv"
							>
								CVV
							</label>
							<input
								className="w-full border-[1px] border-[#AFBACA] p-[10px] rounded-[6px]"
								type="text"
								id="cvv"
								value={palformData.cvv}
								placeholder="e.g 123 "
							/>
						</>
					</div>
					<div className="flex justify-between gap-[10px] mt-5">
						<CustomButton
							bgColor="#fff"
							borderProps={['solid', '#D0D5DD', '1px']}
							buttonText="Cancel"
							buttonType="button"
							paddingProps={['10px', '20px']}
							handleClick={showModel}
							rounded="8px"
							className="w-1/2"
							txtColor="black"
						/>
						<CustomButton
							bgColor="#0408E7"
							borderProps={['solid', 'black', '0px']}
							buttonText="Send"
							buttonType="submit"
							paddingProps={['10px', '20px']}
							handleClick={() => {}}
							rounded="8px"
							className="w-1/2"
							txtColor="white"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewPayment;
