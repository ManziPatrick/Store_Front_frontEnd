import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

interface RequestType {
	page: number;
	itemsPerPage: number;
}

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

// Define the response data type (assuming it's an object with a 'data' property)
interface ResponseData {
	messages: string;
	status: number;
	offers: IOffers;
}

export const getAllDiscounts = createAsyncThunk<
	ResponseData, // Type for the return value
	RequestType // Type for the argument
>('discounts/owner', async (args) => {
	try {
		const { page, itemsPerPage } = args;
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const response = await URL.get('/api/v1/discounts/retreive/offers', {
			...config,
			params: {
				page,
				itemsPerPage,
			},
		});

		return response.data;
	} catch (error) {
		const errorMessage = 'Failed to fetch discounts. Please try again later.';
		throw new Error(errorMessage);
	}
});

// interface Discount {
// 	id: string;
// 	businessId: string;
// 	discountName: string;
// 	appliesTo: {
// 		categoryId: string;
// 	};
// 	quantity: number;
// 	percentage: number;
// 	startDate: string;
// 	endDate: string;
// 	createdAt: string;
// 	updatedAt: string;
// }

interface IDiscount {
	currentPage: number;
	discounts: Offer[];
	totalPages: number;
}

interface SearchResponseData {
	messages: string;
	status: number;
	offers: IDiscount;
}
export const searchDiscounts = createAsyncThunk<
	SearchResponseData, // Type for the return value
	{ keyword: string; page: number; itemsPerPage: number } // Type for the argument
>('discounts/searchOwner', async ({ keyword, page, itemsPerPage }) => {
	try {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const response = await URL.get('/api/v1/discounts/offer/search', {
			...config,
			params: {
				keyword,
				page,
				itemsPerPage,
			},
		});

		return response.data;
	} catch (error) {
		const errorMessage = 'Failed to search discounts. Please try again later.';
		throw new Error(errorMessage);
	}
});

// Define the response data type
interface DeleteResponse {
	message: string;
	result: number;
	status: number;
}

export const deleteDiscount = createAsyncThunk<
	DeleteResponse, // Type for the return value
	string // Type for the argument (product ID)
>('discounts/delete', async (discountId) => {
	try {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await URL.delete(
			`/api/v1/discounts/offer/remove/${discountId}`,
			config
		);

		return response.data;
	} catch (error) {
		const errorMessage =
			'Failed to delete the discount. Please try again later.';
		throw new Error(errorMessage);
	}
});

interface EditResponseData {
	status: number;
	message: string;
	result: number[];
}

interface IFormData {
	discountName?: string;
	appliesTo?: {
		categoryId?: string;
	};
	percentage?: number;
	startDate?: string;
	endDate?: string;
}

export const editDiscount = createAsyncThunk<
	EditResponseData,
	{ data: IFormData; promoId: string }
>('discount/editPromo', async ({ data, promoId }) => {
	try {
		const authToken = localStorage.getItem('token');

		if (!authToken) {
			throw new Error('Authorization token not found.');
		}

		const config = {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		};

		const response = await URL.put(
			`/api/v1/discounts/offer/update/${promoId}`,
			data,
			config
		);

		return response.data;
	} catch (error) {
		const errorMessage =
			'Failed to updating a product. Please try again later.';
		throw new Error(errorMessage);
	}
});
