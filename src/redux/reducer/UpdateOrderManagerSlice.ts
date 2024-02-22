import { createSlice } from '@reduxjs/toolkit';
import { updateOrderStatus } from '../actions/updateOrderManager';

interface OrderUpdateState {
	success: boolean;
	loading: boolean;
	error: string | null;
}

const initialState: OrderUpdateState = {
	success: false,
	loading: false,
	error: null,
};

const orderUpdateSlice = createSlice({
	name: 'orderUpdate',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(updateOrderStatus.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateOrderStatus.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(updateOrderStatus.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'failed';
			});
	},
});

export default orderUpdateSlice.reducer;
