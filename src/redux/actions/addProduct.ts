import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

interface Product {
	name: string;
	price: number;
	stock: number;
	description: string;
	images: File[];
	category_id: string;
	size: string[];
	colors: string[];
	status: 'ACTIVE' | 'INACTIVE' | string;
}

export const addProduct = createAsyncThunk(
	'product/add',
	async (productData: Product) => {
		try {
			const authToken = localStorage.getItem('token');

			if (!authToken) {
				throw new Error('Authorization token not found.');
			}

			// Create a new FormData object to handle file uploads
			const formData = new FormData();

			formData.append('name', productData.name);
			formData.append('price', productData.price.toString());
			formData.append('stock', productData.stock.toString());
			formData.append('description', productData.description);
			formData.append('category_id', productData.category_id);
			formData.append('status', productData.status);

			// Append the size and colors as arrays
			productData.size.forEach((sizeOption) => {
				formData.append(`size`, sizeOption);
			});

			productData.colors.forEach((colorOption) => {
				formData.append(`colors`, colorOption);
			});

			// Append the images

			productData.images.forEach((imageFile) => {
				formData.append('images', imageFile);
			});

			const config = {
				headers: {
					Authorization: 'Bearer ' + authToken,
					'Content-Type': 'multipart/form-data',
				},
			};

			const response = await URL.post(
				'/api/v1/stores/product/add',
				formData,
				config
			);

			return response.data;
		} catch (error) {
			const errorMessage =
				'Failed to create a product. Please try again later.';
			throw new Error(errorMessage);
		}
	}
);
