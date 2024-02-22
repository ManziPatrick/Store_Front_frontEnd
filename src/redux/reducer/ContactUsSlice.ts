// reducers/contactUsSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { contactUs } from '../actions/contactUs';

interface ContactUsState {
	loading: boolean;
	success: boolean;
	error: string | null;
}

const initialState: ContactUsState = {
	loading: false,
	success: false,
	error: null,
};

const contactUsSlice = createSlice({
	name: 'contactus',
	initialState,
	reducers: {
		// Define other reducers if needed
	},
	extraReducers: (builder) => {
		builder
			.addCase(contactUs.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(contactUs.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(contactUs.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'failed';
			});
	},
});

export default contactUsSlice.reducer;
