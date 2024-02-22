import { createSlice } from '@reduxjs/toolkit';
import { viewCategories } from '../actions/viewCategory';

interface ICategory {
	id: string;
	description: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}
interface CategoryState {
	categories: ICategory[];
	success: boolean;
	loading: boolean;
	error: string | null;
}

const initialState: CategoryState = {
	categories: [],
	success: false,
	loading: false,
	error: null,
};

const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(viewCategories.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(viewCategories.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = action.payload;
				state.success = true;
			})
			.addCase(viewCategories.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'failed';
			});
	},
});

export default categorySlice.reducer;
