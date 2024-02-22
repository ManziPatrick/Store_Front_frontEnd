import { createSlice } from '@reduxjs/toolkit';
import { getAllOrders, AllOrders, Order } from '../actions/getOrder';

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

const orderSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllOrders.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.orders = [];
			})
			.addCase(getAllOrders.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.orders = (action.payload as AllOrders)?.data || [];
			})
			.addCase(getAllOrders.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'failed';
			});
	},
});

export default orderSlice.reducer;
