import {
	ResponseProduct,
	addProductToCart,
	fetchSimilarProducts,
} from '../actions/shopnest/singlePage';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
	data: ResponseProduct[];
	pages: number;
	loading: boolean;
	error: string | null;
}

const initialState: InitialState = {
	data: [],
	pages: 0,
	loading: false,
	error: null,
};

const similarProductSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSimilarProducts.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchSimilarProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload.products;
				state.error = null;
			})
			.addCase(fetchSimilarProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || null;
			});
		builder.addCase(addProductToCart.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(addProductToCart.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(addProductToCart.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || null;
		});
	},
});

export default similarProductSlice.reducer;
