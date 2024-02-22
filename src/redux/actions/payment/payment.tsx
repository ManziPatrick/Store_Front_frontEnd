import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../../utils/api';
import { toast } from 'react-toastify';
// import { clearCart } from './Cartpayment';

interface PaymentInfo {
	cardNumber: string;
	expMonth: string;
	expYear: string;
	cvc: string;
}

interface PaymentError {
	errorMessage: string;
}

interface PaymentState {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	cart: any;
	loading: boolean;
	error: PaymentError | null;
}

export const chargePayment = createAsyncThunk<
	void,
	PaymentInfo,
	{ rejectValue: PaymentError }
>('payment/charge', async (paymentInfo: PaymentInfo) => {
	try {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const apiUrl = `/api/v1/payment/charge`;
		const response = await URL.post(apiUrl, paymentInfo, {
			headers: config.headers,
		});
		toast.success(response.data.message, { theme: 'colored', type: 'success' });

		return response.data;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error.response) {
			const errorMessage = `${JSON.stringify(error.response.data.error)}`;
			toast.error(errorMessage, { theme: 'colored', type: 'error' });
			throw new Error(errorMessage);
		} else {
			const errorMessage = 'Failed to pay . Please try again later.';
			toast.error(errorMessage, { theme: 'colored', type: 'error' });
			throw new Error(errorMessage);
		}
	}
});

const paymentSlice = createSlice({
	name: 'payment',
	initialState: {
		loading: false,
		error: null,
	} as PaymentState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(chargePayment.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(chargePayment.fulfilled, (state) => {
			state.loading = false;
			state.error = null;

			// clearCart();
		});
		builder.addCase(chargePayment.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload ?? { errorMessage: 'Unknown error' };
		});
	},
});

export default paymentSlice.reducer;
