import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

interface RequestType {
	page: number;
	itemsPerPage: number;
}

interface ResponseData {
	status: number;
	message: string;
	data: {
		currentPage: number;
		totalPages: number;
		orders: [];
	};
}

export const getAllHistory = createAsyncThunk<
	ResponseData, // Type for the return value
	RequestType // Type for the argument
>('history/owner', async (args) => {
	try {
		const { page, itemsPerPage } = args;
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const response = await URL.get('/api/v1/orders/customer/history/data', {
			...config,
			params: {
				page,
				itemsPerPage,
			},
		});
		return response.data;
	} catch (error) {
		const errorMessage = 'Failed to fetch products. Please try again later.';
		throw new Error(errorMessage);
	}
});
