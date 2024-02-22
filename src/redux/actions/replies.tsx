import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import URL from '../../utils/api';
import { toast } from 'react-toastify';

interface User {
	firstName: string;
	lastName: string;
}

interface Product {
	name: string;
}

interface Review {
	id: string;
	createdAt: string;
	feedback: string;
	ratings: number;
	userId: string;
	productId: string;
	user?: User;
	product?: Product;
	selected: boolean;
	totalPages?: number;
}

interface ReplyData {
	reviewId: string;
	replyText: string;
}

export const sendReply = createAsyncThunk<void, ReplyData>(
	'reviews/sendReply',
	async ({ reviewId, replyText }) => {
		try {
			const token = localStorage.getItem('token');
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const apiUrl = `api/v1/reviews/comment/${reviewId}`;

			await URL.post(apiUrl, { replyText }, { headers: config.headers });
			toast.success('reply  sent', { theme: 'colored', type: 'success' });
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message, { theme: 'colored', type: 'error' });
			}
			console.error('Error sending reply:', error);
			throw error;
		}
	}
);

interface ReviewsState {
	reviews: Review[];
	pages: number;
	loading: boolean;
	totalPages: number;
	currentPage: number;
	error: string | null;
}

const reviewsSlice = createSlice({
	name: 'reviews',
	initialState: {
		reviews: [],
		pages: 0,
		loading: false,
		totalPages: 0,
		currentPage: 1,
		error: null,
	} as ReviewsState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(sendReply.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(sendReply.fulfilled, (state) => {
			state.loading = false;
			state.error = null;
		});
		builder.addCase(sendReply.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || null;
		});
	},
});

export default reviewsSlice.reducer;
