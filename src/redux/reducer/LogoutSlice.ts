import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logout } from '../actions/logout';

interface LogoutState {
	logout: string | null;
	status: string | null;
	error: string | null;
	loading: boolean;
	data: string | null;
}

const initialState: LogoutState = {
	logout: null,
	status: null,
	error: null,
	loading: false,
	data: null,
};

const logoutSlice = createSlice({
	name: 'logout',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(logout.pending, (state) => {
				state.loading = true;
				state.status = 'loading';
				state.error = null;
			})
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.addCase(logout.fulfilled, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.status = 'Logout Successfully!';
				state.data = action.payload;
				state.error = null;
			})
			.addCase(logout.rejected, (state) => {
				state.loading = false;
				state.status = 'Logout was unsuccessful!';
				state.error = null;
			});
	},
});

export default logoutSlice.reducer;
