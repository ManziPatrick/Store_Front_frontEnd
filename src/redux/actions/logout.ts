import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

export const logout = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		// Get the authentication token from local storage or any other secure source
		const token = localStorage.getItem('token');

		try {
			const response = await URL.put('/api/v1/auth/customers/logout', _, {
				headers: {
					Authorization: `Bearer ${token}`, // Include the token in the headers
				},
			});

			// Clear local storage upon successful logout
			localStorage.clear();

			return response.data;
		} catch (error) {
			return rejectWithValue('Failed to logout. Please try again later.');
		}
	}
);
