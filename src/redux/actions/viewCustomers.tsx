import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import URL from '../../utils/api';


interface Owner {
	email: string;
	firstName: string;
	lastName: string;
	name: string;
}

interface Customer {
	createdAt: string;
	customerId: string;
	id: string;
	owner: Owner;
	price: string;
	productId: string;
	quantity: number;
	status: string;
	totalPrice: string;
}

interface ApiResponse {
	data: Customer[];
	totalPages: number;
	currentPage: number;
	customers: Customer[];
}

export const fetchCustomers = createAsyncThunk<ApiResponse, { page: number; itemsPerPage : number }>(
	'customer/fetchCustomers',
	async ({ page, itemsPerPage  }) => {
		try {
			const token = localStorage.getItem('token');
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const apiUrl = `/api/v1/orders/merchant/customer/purchase/history`;

			const res = await URL.get(apiUrl, {
				params: { page , itemsPerPage },
				headers: config.headers,
			});

			

			return res.data;
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.clear
			}
			
			throw error;
		}
	}
);

interface CustomerState {
	customers: Customer[];
	pages: number;
	loading: boolean;
	totalPages: number;
	currentPage: number;
	error: string | null;
}

const customerSlice = createSlice({
	name: 'customer',
	initialState: {
		customers: [],
		pages: 0,
		loading: false,
		totalPages: 0,
		currentPage: 1,
		error: null,
	} as CustomerState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCustomers.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchCustomers.fulfilled, (state, action) => {
			state.loading = false;
			state.totalPages = action.payload.totalPages;
			state.currentPage = action.payload.currentPage;
			state.customers = action.payload.data;
			state.error = null;
		});
		builder.addCase(fetchCustomers.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'An error occurred';
		});
	},
});

export default customerSlice.reducer;
export { fetchCustomers as viewCustomersFetchCustomers };
