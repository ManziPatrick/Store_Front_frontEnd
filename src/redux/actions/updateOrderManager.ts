import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api'; // Import your API URL or relevant service

interface UpdateOrder {
	id: string;
	status: string;
}

export const updateOrderStatus = createAsyncThunk(
	'orders/updateStatus',
	async ({ id, status }: UpdateOrder, { rejectWithValue }) => {
		try {
			// Get the authorization token from local storage
			const authToken = localStorage.getItem('token');

			if (!authToken) {
				throw new Error('Authorization token not found.');
			}

			// Set up the request headers with the authorization token
			const config = {
				headers: {
					Authorization: 'Bearer ' + authToken,
				},
			};

			// Call the API or service to update the order status
			const response = await URL.put(
				`/api/v1/orders/products/${id}`,
				{ status },
				config
			);

			return response.data;
		} catch (error) {
			// Handle errors and reject with a meaningful error message
			return rejectWithValue('Failed to update order status');
		}
	}
);
