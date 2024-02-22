import { createAsyncThunk } from '@reduxjs/toolkit';

import URL from '../../utils/api';

export const viewCategories = createAsyncThunk('/categories', async () => {
	try {
		const response = await URL.get('/api/v1/categories');

		return response.data;
	} catch (error) {
		const errorMessage = 'Failed to create a product. Please try again later.';
		throw new Error(errorMessage);
	}
});
