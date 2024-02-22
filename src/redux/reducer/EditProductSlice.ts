import { createSlice } from '@reduxjs/toolkit';
import { editProduct, getProductDetails } from '../actions/editProduct'; // Adjust the import path as needed

// Define the state type for the product details slice
interface ProductDetailsState {
	success: boolean;
	loading: boolean;
	error: string | null;
}

const initialState: ProductDetailsState = {
	success: false,
	loading: false,
	error: null,
};

// Create a slice for the product details
const productDetailsSlice = createSlice({
	name: 'editproduct',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getProductDetails.pending, (state) => {
				state.error = null;
			})
			.addCase(getProductDetails.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(getProductDetails.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'failed';
			})
			.addCase(editProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(editProduct.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(editProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'failed';
			});
	},
});

// Export the reducer
export const productDetailsReducer = productDetailsSlice.reducer;
export default productDetailsReducer;
