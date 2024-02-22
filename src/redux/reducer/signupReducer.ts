import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signup } from '../actions/signup';

interface UserState {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	loading: boolean;
	error: string | null;
}

const initialState: UserState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	loading: false,
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(signup.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signup.fulfilled, (state, action: PayloadAction<UserState>) => {
				const { firstName, lastName, email, password } = action.payload;
				state.firstName = firstName;
				state.lastName = lastName;
				state.email = email;
				state.password = password;
				state.loading = false;
			})
			.addCase(signup.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'signup failed';
			});
	},
});

export default userSlice.reducer;
