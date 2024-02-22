import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

export interface Order {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any;
	id: string;
	createdAt: string;
	customerId: string;
	price: string;
	productId: string;
	quantity: number;
	status: string;
	totoalPrice: string;
	updatedAt: string;
	product: {
		name: string;
		images: string[];
	};
	owner: {
		firstName: string;
		lastName: string;
		email: string;
	};
}

export interface AllOrders {
	data: Order[];
}

export const getAllOrders = createAsyncThunk<AllOrders>(
	'api/v1/manager/orders',
	async () => {
		try {
			const authToken = localStorage.getItem('token');
			const config = {
				headers: {
					Authorization: 'Bearer ' + authToken,
				},
			};
			const response = await URL.get<Order[]>(
				'/api/v1/orders/products',
				config
			);

			return { data: response.data };
		} catch (error) {
			const errorMessage = 'Failed to get orders. Please try again later.';
			throw new Error(errorMessage);
		}
	}
);
