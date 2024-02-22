import { createSlice } from '@reduxjs/toolkit';
import { verifyOTP } from '../actions/resetPasswordAction';

interface OtpData {
	inputOTP: number;
	isMatching: boolean;
	loading: boolean;
	error: string | null;
}
const initialState: OtpData = {
	inputOTP: 0,
	isMatching: false,
	loading: false,
	error: null,
};
const otpSlice = createSlice({
	name: 'otp',
	initialState,
	reducers: {
		setInputOTP: (state, action) => {
			state.inputOTP = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(verifyOTP.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(verifyOTP.fulfilled, (state, action) => {
				state.loading = false;
				state.isMatching = action.payload.isMatching;
			})
			.addCase(verifyOTP.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'failed';
			});
	},
});

export const { setInputOTP } = otpSlice.actions;
export default otpSlice.reducer;
