import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';
import { RootState } from '../store/store';

type WishlistItem = {
	wishlistItem: {
		id: string;
		product: {
			id: string;
			name: string;
			images: string[];
			stock: number;
			price: number;
			description: string;
		};
	};
};

export const getWishlist = createAsyncThunk<
	WishlistItem[],
	void,
	{ state: RootState }
>('wish-lists/products', async () => {
	try {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await URL.get('/api/v1/wish-lists/products', config);

		return response.data;
	} catch (error) {
		throw new Error('error');
	}
});

export const addToWishlist = createAsyncThunk(
	'/wishlist/add',
	async (productId: string) => {
		try {
			const token = localStorage.getItem('token');
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const response = await URL.post(
				`/api/v1/wish-lists/products`,
				{ productId },
				config
			);
			return response.data;
		} catch (error) {
			throw new Error('error');
		}
	}
);

export const deleteOne = createAsyncThunk(
	'wishlist/delete',
	async (id: string) => {
		try {
			const token = localStorage.getItem('token');
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const response = await URL.delete(
				`/api/v1/wish-lists/product/${id}`,
				config
			);

			return response.data;
		} catch (error) {
			throw new Error('error');
		}
	}
);
