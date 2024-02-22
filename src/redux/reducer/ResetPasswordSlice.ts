import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { resetPassword } from '../actions/resetPasswordAction';

const resetPasswordSlice = createSlice({
	name: 'User',
	initialState: {
		data: null,
		status: '',
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(resetPassword.pending, (state) => {
				state.loading = true;
				state.status = 'loading';
				state.error = null;
			})
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.addCase(resetPassword.fulfilled, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.status = 'Password Reset Request was Successfully!';
				state.data = action.payload;
				state.error = null;
			})
			.addCase(resetPassword.rejected, (state) => {
				state.loading = false;
				state.status = 'Request to reset the password was unsuccessful!';
				state.error = null;
			});
	},
});
export default resetPasswordSlice.reducer;
