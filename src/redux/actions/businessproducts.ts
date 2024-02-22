import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

interface RequestType {
	page: number;
	itemsPerPage: number;
}

interface Product {
	business_id: string;
	category_id: string;
	createdAt: string;
	description: string;
	expireDate: string;
	id: string;
	images: string[];
	name: string;
	price: number;
	stock: number;
	updatedAt: string;
	categoryName: {
		name: string;
	};
	status: string;
}

// Define the response data type (assuming it's an object with a 'data' property)
interface ResponseData {
	currentPage: number;
	products: Product[];
	totalPages: number;
	message: string;
	status: number;
}

export const getAllProductsOwner = createAsyncThunk<
	ResponseData, // Type for the return value
	RequestType // Type for the argument
>('products/owner', async (args) => {
	try {
		const { page, itemsPerPage } = args;
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const response = await URL.get('/api/v1/store/products', {
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

// search action
export const searchProductsOwner = createAsyncThunk<
	ResponseData, // Type for the return value
	{ keyword: string; page: number; itemsPerPage: number } // Type for the argument
>('products/searchOwner', async ({ keyword, page, itemsPerPage }) => {
	try {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const response = await URL.get('/api/v1/store/product/search', {
			...config,
			params: {
				keyword,
				page,
				itemsPerPage,
			},
		});

		return response.data;
	} catch (error) {
		const errorMessage = 'Failed to search products. Please try again later.';
		throw new Error(errorMessage);
	}
});

// Define the response data type
interface DeleteResponse {
	success: boolean;
	message: string;
}

export const deleteProduct = createAsyncThunk<
	DeleteResponse, // Type for the return value
	string // Type for the argument (product ID)
>('products/deleteProduct', async (productId) => {
	try {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const response = await URL.delete(
			`/api/v1/store/products/${productId}`,
			config
		);

		return response.data;
	} catch (error) {
		const errorMessage =
			'Failed to delete the product. Please try again later.';
		throw new Error(errorMessage);
	}
});
