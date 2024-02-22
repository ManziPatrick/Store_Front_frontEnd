import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

export const deleteOrder = createAsyncThunk(
	'api/v1/orders/products/delete',
	async (orderId: string, { rejectWithValue }) => {
		try {
			const authToken = localStorage.getItem('token');
			const config = {
				headers: {
					Authorization: 'Bearer ' + authToken,
				},
			};
			const response = await URL.delete(
				`/api/v1/orders/products/${orderId}`,
				config
			);

			return response.data; // Return the deleted orderId on success
		} catch (error) {
			const errorMessage = 'Failed to delete order. Please try again later.';
			return rejectWithValue(errorMessage);
		}
	}
);
