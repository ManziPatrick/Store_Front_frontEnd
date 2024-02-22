import { createAsyncThunk } from '@reduxjs/toolkit';

import URL from '../../utils/api';

// Define the types for your product data

// Define async thunk to get product details
export const getProductDetails = createAsyncThunk(
	'product/getProductDetails',
	async (productId: string | undefined) => {
		try {
			const response = await URL.get(
				`/api/v1/store/product/single/${productId}`
			);
			return response.data;
		} catch (error) {
			const errorMessage =
				'Failed to create a product. Please try again later.';
			throw new Error(errorMessage);
		}
	}
);

interface ProductData {
	// Define your product data structure here

	name: string;
	price: number;
	stock: number;
	description: string;
	category_id: string;
	expiredAt: string;
	status: 'ACTIVE' | 'INACTIVE' | string;
	images: File[];
	size: string[];
	colors: string[];
}

interface ResponseData {
	data: ProductData;
	productId: string;
}

export const editProduct = createAsyncThunk<
	ResponseData,
	{ data: ProductData; productId: string | undefined }
>('product/add', async ({ data, productId }) => {
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
			`/api/v1/store/product/update/${productId}`,
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
