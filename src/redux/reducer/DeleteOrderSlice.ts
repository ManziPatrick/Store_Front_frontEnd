import { createSlice } from '@reduxjs/toolkit';
import { Order } from '../actions/getOrder';
import { deleteOrder } from '../actions/deleteOrder';

interface OrderState {
	orders: Order[];
	success: boolean;
	loading: boolean;
	error: string | null;
}

const initialState: OrderState = {
	orders: [],
	success: false,
	loading: false,
	error: null,
};

const deleteOrderSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(deleteOrder.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.orders = state.orders.filter(
					(order) => order.id !== action.payload
				);
			})
			.addCase(deleteOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'failed';
			});
	},
});

export default deleteOrderSlice.reducer;
