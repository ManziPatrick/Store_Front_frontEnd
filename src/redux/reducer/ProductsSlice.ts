// reducers/contactUsSlice.js

import { createSlice } from '@reduxjs/toolkit';
import {
	deleteProduct,
	getAllProductsOwner,
	searchProductsOwner,
} from '../actions/businessproducts';

interface Product {
	business_id: string;
	category_id: string;
	createdAt: string;
	description: string;
	expireDate: string;
	id: string;
	images: string[];
	name: string;
	price: number;
	stock: number;
	updatedAt: string;
	categoryName: {
		name: string;
	};
	status: string;
}
interface ProductState {
	products: Product[];
	loading: boolean;
	success: boolean;
	error: string | null;
	pages: number;
}

const initialState: ProductState = {
	products: [],
	loading: false,
	success: false,
	error: null,
	pages: 0,
};

const ProductsSlice = createSlice({
	name: 'contactus',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// get all products
			.addCase(getAllProductsOwner.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllProductsOwner.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload.products;
				state.pages = action.payload.totalPages;
				state.success = true;
			})
			.addCase(getAllProductsOwner.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'failed';
			})

			// Performing a search
			.addCase(searchProductsOwner.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(searchProductsOwner.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload.products;
				state.pages = action.payload.totalPages;
				state.success = true;
			})
			.addCase(searchProductsOwner.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'failed';
			})

			// Adding the deleteProduct reducers within the same slice file
			.addCase(deleteProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.products = state.products.filter(
					(product) => product.id !== action.meta.arg
				);
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Failed to delete the product.';
			});
	},
});
export default ProductsSlice.reducer;
