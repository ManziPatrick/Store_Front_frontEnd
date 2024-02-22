// paymentOptionsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentOption {
	id: string;
	cardNumber: string;
	default: boolean;
	expiryDate: string;
	ownerName: string;
	paymentType: 'visa' | 'paypal' | 'mastercard';
}

interface PaymentOptionsState {
	paymentOptions: PaymentOption[];
}

const initialState: PaymentOptionsState = {
	paymentOptions: [
		{
			id: '0',
			cardNumber: '7892938412983',
			default: true,
			expiryDate: '12/12/2025',
			ownerName: 'Henry Rukundo',
			paymentType: 'visa',
		},
		{
			id: '1',
			cardNumber: '349182374192',
			default: false,
			expiryDate: '12/12/2025',
			ownerName: 'Henry Rukundo',
			paymentType: 'mastercard',
		},
		{
			id: '2',
			cardNumber: '349182374192',
			default: false,
			expiryDate: '12/12/2025',
			ownerName: 'LIz Betty',
			paymentType: 'paypal',
		},
	],
};

const paymentOptionsSlice = createSlice({
	name: 'paymentOptions',
	initialState,
	reducers: {
		setDefaultPayment: (state, action: PayloadAction<number>) => {
			return {
				...state,
				paymentOptions: state.paymentOptions.map((payment, index) => ({
					...payment,
					default: index === action.payload,
				})),
			};
		},
		addPaymentOption: (state, action: PayloadAction<PaymentOption>) => {
			return {
				...state,
				paymentOptions: [...state.paymentOptions, action.payload],
			};
		},
	},
});

export const { setDefaultPayment, addPaymentOption } =
	paymentOptionsSlice.actions;

export default paymentOptionsSlice.reducer;
