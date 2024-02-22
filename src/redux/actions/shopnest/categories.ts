import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import URL from '../../../utils/api';

export const fetchcategories = createAsyncThunk(
	'categories/getcategories',
	async () => {
		const res = await URL.get(`/api/v1/categories`);
		return res.data;
	}
);
const categoriesSlice = createSlice({
	name: 'categories',
	initialState: {
		categories: [],
		loading: false,
		error: null as string | null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchcategories.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchcategories.fulfilled, (state, action) => {
			state.loading = false;
			state.categories = action.payload;
			state.error = null;
		});
		builder.addCase(fetchcategories.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || null;
		});
	},
});

export const productActions = categoriesSlice.actions;
export default categoriesSlice.reducer;
