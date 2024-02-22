import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updatePassword } from '../actions/resetPasswordAction';

const updatePasswordSlice = createSlice({
	name: 'Update',
	initialState: {
		data: null,
		status: '',
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(updatePassword.pending, (state) => {
				state.loading = true;
				state.status = 'Loading';
				state.error = null;
			})

			.addCase(
				updatePassword.fulfilled,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(state, action: PayloadAction<any>) => {
					state.loading = false;
					state.status = 'Password Successfully Reset!';
					state.data = action.payload;
					state.error = null;
				}
			)
			.addCase(updatePassword.rejected, (state) => {
				state.loading = false;
				state.status = 'Password Reset Unsuccessfully!';
				state.error = null;
			});
	},
});
export default updatePasswordSlice.reducer;
