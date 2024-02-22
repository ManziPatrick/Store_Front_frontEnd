import { createSlice } from '@reduxjs/toolkit';
import { getAllHistory } from '../actions/history';

interface HistoryState {
	history: [];
	loading: boolean;
	success: boolean;
	error: string | null;
	pages: number;
}

const initialState: HistoryState = {
	history: [],
	loading: false,
	success: false,
	error: null,
	pages: 0,
};

const ownerProductsSlice = createSlice({
	name: 'history',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder

			.addCase(getAllHistory.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllHistory.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload.data) {
					state.history = action.payload.data.orders || [];
					state.pages = action.payload.data.totalPages;
					state.success = true;
				}
			})
			.addCase(getAllHistory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'failed';
			});
	},
});
export default ownerProductsSlice.reducer;
