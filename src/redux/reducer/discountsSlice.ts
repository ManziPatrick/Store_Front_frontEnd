// reducers/contactUsSlice.js

import { createSlice } from '@reduxjs/toolkit';
import {
	deleteDiscount,
	getAllDiscounts,
	searchDiscounts,
} from '../actions/discounts';

export interface Offer {
	id: string;
	businessId: string;
	discountName: string;
	appliesTo: {
		categoryId: string;
	};
	quantity: number;
	percentage: number;
	startDate: string;
	endDate: string;
	createdAt: string;
	updatedAt: string;
	category: {
		name: string;
	};
}

interface IOffers {
	currentPage: number;
	offerDetails: Offer[];
	totalPages: number;
}

interface OfferState {
	offers: IOffers;
	loading: boolean;
	success: boolean;
	error: string | null;
	pages: number;
}

const initialState: OfferState = {
	offers: { currentPage: 1, offerDetails: [], totalPages: 1 },
	loading: false,
	success: false,
	error: null,
	pages: 0,
};

const discountSlice = createSlice({
	name: 'discounts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// get all discounts
			.addCase(getAllDiscounts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllDiscounts.fulfilled, (state, action) => {
				state.loading = false;
				state.offers = action.payload.offers;
				//state.pages = action.payload.offers.totalPages;
				state.success = true;
			})
			.addCase(getAllDiscounts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'failed';
			})

			//Performing a search
			.addCase(searchDiscounts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(searchDiscounts.fulfilled, (state, action) => {
				state.loading = false;
				state.offers.offerDetails = action.payload.offers.discounts;
				state.offers.currentPage = action.payload.offers.currentPage;
				state.offers.totalPages = action.payload.offers.totalPages;
				state.success = true;
			})
			.addCase(searchDiscounts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'failed';
			})

			// Adding the deleteProduct reducers within the same slice file
			.addCase(deleteDiscount.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteDiscount.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
				// state.offers.offerDetails = state.offers.offerDetails.filter(
				// 	(offer) => offer.id !== action.meta.arg
				// );
			})
			.addCase(deleteDiscount.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Failed to delete the product.';
			});
	},
});
export default discountSlice.reducer;
