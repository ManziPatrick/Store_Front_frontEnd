import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import URL from '../../utils/api';

interface User {
	firstName: string;
	lastName: string;
}

interface Product {
	name: string;
	images: string[];
	price: number;
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

interface ApiResponse {
	totalPages: number;
	currentPage: number;
	reviews: Review[];
}

interface ReplyData {
	reviewId: string;
	replyText: string;
}

export const postReply = createAsyncThunk<void, ReplyData>(
	'reviews/postReply',
	async ({ reviewId, replyText }) => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const apiUrl = `api/v1/reviews/comment/${reviewId}/reply`;

		await URL.post(apiUrl, { replyText }, { headers: config.headers });
	}
);

export const fetchreviews = createAsyncThunk<ApiResponse, number>(
	'reviews/owner',
	async (page: number) => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const apiUrl = `api/v1/reviews/owner`;
		const res = await URL.get(apiUrl, {
			params: { page },
			headers: config.headers,
		});
		return res.data;
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

const reviewSlice = createSlice({
	name: 'reviews',
	initialState: {
		reviews: [],
		pages: 0,
		loading: false,
		totalPages: 0,
		currentPage: 1,
		error: null as string | null,
	} as ReviewsState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchreviews.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchreviews.fulfilled, (state, action) => {
			state.loading = false;
			state.totalPages = action.payload.totalPages;
			state.currentPage = action.payload.currentPage;
			state.reviews = action.payload.reviews;
			state.error = null;
		});
		builder.addCase(fetchreviews.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || null;
		});

		builder.addCase(postReply.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(postReply.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(postReply.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || null;
		});
	},
});

export const reviewsActions = reviewSlice.actions;
export default reviewSlice.reducer;
