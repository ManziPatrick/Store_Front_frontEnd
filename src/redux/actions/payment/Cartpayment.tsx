// cartSlice.ts
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import URL from '../../../utils/api';
// import { AxiosRequestConfig } from 'axios';
// import { RootState } from '../../store/store';


interface Product {
	id: string;
	productId: string;
	quantity: number;
	userId: string;
	colors: string[];
	size: string[];
	createdAt: string;
	updatedAt: string;
	Product: {
		discountedPrice: number;
		id: string;
		business_id: string;
		name: string;
		images: string[];
		description: string;
		price: number;
		stock: number;
		expireDate: string;
		size: null | string;
		colors: null | string[];
		status: string;
		category_id: string;
		createdAt: string;
		updatedAt: string;
	};
}

interface ApiResponse {
	data: {
		totalPages: number;
		currentPage: number;
		results: Product[];
		cartProducts :number
		totalCount:number;
	};
	message: string;
	status: number;
}

export const fetchCartProducts = createAsyncThunk<
	ApiResponse,
	{ page: number; sortBy?: string; sortOrder?: string }
>('cart/fetchCartProducts', async ({ page, sortBy, sortOrder }) => {
	try {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const apiUrl = '/api/v1/carts/products';
		const res = await URL.get(apiUrl, {
			params: { page, itemsPerPage: 5, sortBy, sortOrder },
			headers: config.headers,
		});

		return res.data;
	} catch (error) {
		if (error instanceof DOMException && error.name === 'AbortError') {
			return { totalPages: 0, currentPage: 0, results: [] };
		}
	}
});

export const deleteCartProduct = createAsyncThunk<Product, string>(
	'cart/deleteCartProduct',
	async (productId: string, { dispatch }) => {
		try {
			const token = localStorage.getItem('token');
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			const apiUrl = `/api/v1/carts/products/${productId}`;
			await URL.delete(apiUrl, {
				headers: config.headers,
			});
			dispatch(fetchCartProducts({ page: 1 }));

			return {} as Product;
		} catch (error) {
			let message = 'Unknown Error';
			if (error instanceof Error) message = error.message;
			toast.error(`Failed to remove product: ${message}`, {
				theme: 'colored',
				type: 'error',
			});
			throw error;
		}
	}
);

export const updateQuantity = createAsyncThunk<
	Product,
	{ productId: string; quantity: number }
>('cart/updateQuantity', async ({ productId, quantity }, { dispatch }) => {
	try {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const apiUrl = `/api/v1/carts/products/${productId}`;
		const res = await URL.put(
			apiUrl,
			{ quantity },
			{ headers: config.headers }
		);

		dispatch(fetchCartProducts({ page: 1 }));

		return res.data;
	} catch (error) {
		let message = 'Unknown Error';
		if (error instanceof Error) message = error.message;
		toast.error(`Failed to update quantity: ${message}`, {
			theme: 'colored',
			type: 'error',
		});
		throw error;
	}
});

export const deleteAllCartProducts = createAsyncThunk<void, void>(
'cart/deleteAllCartProducts',
async () => {
	try {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
		Authorization: `Bearer ${token}`,
		},
	};

	const apiUrl = `/api/v1/carts/products/deleteAll`;
	await URL.delete(apiUrl, {
		headers: config.headers,
	});

	
	return undefined;
	} catch (error) {
	let message = 'Unknown Error';
	if (error instanceof Error) message = error.message;
	toast.error(`Failed to remove product: ${message}`, {
		theme: 'colored',
		type: 'error',
	});
	throw error;
	}
}
);
  




interface CartState {
	products: Product[];
	loading: boolean;
	error: string | null;
	currentPage: number;
	totalPages: number;
	totalCount:number;
}

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		products: [],
		loading: false,
		error: null as string | null,
		currentPage: 1,
		totalPages: 0,
		totalCount:0
	} as CartState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCartProducts.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchCartProducts.fulfilled, (state, action) => {
			state.loading = false;

			state.products = action.payload.data.results;
			state.currentPage = action.payload.data.currentPage;
			state.totalPages = action.payload.data.totalPages;
			state.totalCount=action.payload.data.totalCount;
			state.error = null;
		});
		builder.addCase(fetchCartProducts.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload
				? (action.payload as { errorMessage: string }).errorMessage
				: 'Unknown error';
		});
		builder.addCase(deleteCartProduct.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(deleteCartProduct.fulfilled, (state, action) => {
			state.loading = false;
			state.products = state.products.filter(
				(product) => product.id !== action.payload.id
			);
			state.error = null;
		});
		builder.addCase(deleteCartProduct.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload
				? (action.payload as { errorMessage: string }).errorMessage
				: 'Unknown error';
		});
		builder.addCase(updateQuantity.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(updateQuantity.fulfilled, (state, action) => {
			state.loading = false;
			const updatedProductIndex = state.products.findIndex(
				(product) => product.id === action.payload.id
			);
			if (updatedProductIndex !== -1) {
				state.products[updatedProductIndex].quantity = action.payload.quantity;
			}
			state.error = null;
		});
		builder.addCase(updateQuantity.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload
				? (action.payload as { errorMessage: string }).errorMessage
				: 'Unknown error';
		});
		builder.addCase(clearCart, (state) => {
			state.products = [];
			state.loading = false;
			state.error = null;
			
		});
	},
});


export const clearCart = createAction('cart/clearCart');
export const cartActions = { ...cartSlice.actions, clearCart }; 
export default cartSlice.reducer;
