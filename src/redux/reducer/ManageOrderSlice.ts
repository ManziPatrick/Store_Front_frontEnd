import { createSlice } from '@reduxjs/toolkit';
import { getManagerAllOrders, AllOrders, Order } from '../actions/managerOrder';

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

const orderManagerSlice = createSlice({
	name: 'managerorders',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getManagerAllOrders.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.orders = [];
			})
			.addCase(getManagerAllOrders.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.orders = (action.payload as AllOrders)?.data || [];
			})
			.addCase(getManagerAllOrders.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'failed';
			});
	},
});

export default orderManagerSlice.reducer;
