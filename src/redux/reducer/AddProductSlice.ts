import { createSlice } from '@reduxjs/toolkit';
import { addProduct } from '../actions/addProduct';

// Define the initial state for the slice
interface ProductState {
	success: boolean;
	loading: boolean;
	error: string | null;
}

const initialState: ProductState = {
	success: false,
	loading: false,
	error: null,
};

const productSlice = createSlice({
	name: 'addproduct',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addProduct.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(addProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'failed';
			});
	},
});

export default productSlice.reducer;
