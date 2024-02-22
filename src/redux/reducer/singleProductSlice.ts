import { createSlice } from '@reduxjs/toolkit';
import { Product, fetchSingleproduct } from '../actions/shopnest/singlePage';

interface InitialState {
	data: Product;
	pages: number;
	loading: boolean;
	error: string | null;
}

const initialState: InitialState = {
	data: {
		business_id: '',
		category_id: '',
		colors: [],
		createdAt: '',
		description: '',
		expireDate: '',
		id: '',
		images: [],
		name: '',
		price: 0,
		size: [],
		status: [],
		stock: 0,
		updatedAt: '',
	},
	pages: 0,
	loading: false,
	error: null,
};
const singleProductSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSingleproduct.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchSingleproduct.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload.details;
			state.error = null;
		});
		builder.addCase(fetchSingleproduct.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || null;
		});
	},
});
export const productActions = singleProductSlice.actions;
export default singleProductSlice.reducer;
