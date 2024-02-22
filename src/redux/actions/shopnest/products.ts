import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import URL from '../../../utils/api';

export const fetchproduct = createAsyncThunk(
	'product/getproduct',
	async (page: number) => {
		try {
			const token = localStorage.getItem('token');

			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const res = await URL.get(`api/v1/store/allproducts/user`, {
				...config,
				params: { page },
			});

			return res.data;
		} catch (error) {
			console.error('Error fetching products:', error);
			throw new Error('Failed to fetch products');
		}
	}
);

const productSlice = createSlice({
	name: 'product',
	initialState: {
		products: [],
		pages: 0,
		loading: false,
		error: null as string | null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchproduct.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchproduct.fulfilled, (state, action) => {
			state.loading = false;
			state.pages = action.payload.totalPages;
			state.products = action.payload.products;
			state.error = null;
		});
		builder.addCase(fetchproduct.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || null;
		});
	},
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
