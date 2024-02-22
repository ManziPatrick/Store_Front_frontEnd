import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../../utils/api';
import { toast } from 'react-toastify';

interface RequestType {
	productId: string;
	page: number;
	itemsPerPage: number;
}

export interface Product {
	business_id: string;
	category_id: string;
	colors: string[];
	createdAt: string;
	description: string;
	expireDate: string;
	id: string;
	images: string[];
	name: string;
	price: number;
	size: string[];
	status: string[];
	stock: number;
	updatedAt: string;
}

interface ResponseData {
	details: Product;
	message: string;
	status: number;
}

export const fetchSingleproduct = createAsyncThunk<
	ResponseData,
	{ productId: string }
>(
	'product/getproduct',

	async ({ productId }) => {
		const id = productId;
		const res = await URL.get(`api/v1/store/product/single/${id}`);

		return res.data;
	}
);

export interface ResponseProduct {
	discountedPrice: number;
	percentage: number;
	business_id: string;
	categoryName: { name: string };
	category_id: string;
	colors: string[];
	createdAt: string;
	description: string;
	expireDate: string;
	id: string;
	images: string[];
	isInWishlist: boolean;
	name: string;
	price: number;
	size: number[];
	status: string;
	stock: number;
	updatedAt: string;
}

export interface ResponseTypeSimilar {
	currentPage: number;
	message: string;
	products: ResponseProduct[];
	status: number;
	totalPages: number;
}

export const fetchSimilarProducts = createAsyncThunk<
	ResponseTypeSimilar,
	RequestType
>('product/similar', async (args) => {
	const { productId, page, itemsPerPage } = args;
	const response = await URL.get(`api/v1/store/similar/products/${productId}`, {
		params: {
			page,
			itemsPerPage,
		},
	});
	return response.data;
});

export const addProductToCart = createAsyncThunk<
	ResponseType,
	{ productId: string; quantity: number; colors: string[]; size: string[] }
>('carts/products', async ({ productId, quantity, colors, size }) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const apiUrl = '/api/v1/carts/products';
	const requestData = {
		productId,
		quantity,
		colors,
		size,
	};
	try {
	const response = await URL.post(apiUrl, requestData, config);
	toast.success('Added', { theme: 'colored', type: 'success' });
	return response.data;
	} catch (error) {
	console.error('Error adding product to cart:', error);
	toast.error('Product already exists in the cart', { theme: 'colored', type: 'error' });
	throw error;
	}
});
