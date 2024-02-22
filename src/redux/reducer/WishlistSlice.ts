import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getWishlist } from '../actions/wishlistAction';

type WishlistItem = {
	wishlistItem: {
		id: string;
		product: {
			id: string;
			name: string;
			stock: number;
			price: number;
			description: string;
		};
	};
};
interface WishlistState {
	wishlist: {
		data: WishlistItem[];
	};
	loading: boolean;
	error: string;
}

const initialState: WishlistState = {
	wishlist: {
		data: [],
	},
	loading: false,
	error: '',
};

export const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState,
	reducers: {
		setWishlist: (
			state,
			action: PayloadAction<{ status: number; data: WishlistItem[] }>
		) => {
			state.wishlist = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getWishlist.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				getWishlist.fulfilled,
				(state, action: PayloadAction<WishlistItem[]>) => {
					state.wishlist.data = action.payload;
					state.loading = false;
				}
			)
			.addCase(getWishlist.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Get wishlist failed';
			});
	},
});

export const { actions, reducer } = wishlistSlice;
export const { setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
