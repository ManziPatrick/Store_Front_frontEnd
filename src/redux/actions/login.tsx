import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import URL from '../../utils/api';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';

interface User {
	id: number;
	name: string;
	email: string;
}

interface SigninState {
	response: AxiosResponse<User> | null;
	loading: boolean;
	error: AxiosError<ResponseType> | null;
}

export interface SigninData {
	email: string;
	password: string;
}

export const signin = createAsyncThunk(
	'users/signin',
	async (data: SigninData, { rejectWithValue }) => {
		try {
			const response = await URL.post('/api/v1/auth/customers/login', data);
			if (response.status === 200) {
				const { token } = response.data;
				localStorage.setItem('token', token);
				const responseData = JSON.stringify(response.data);
				localStorage.setItem('response', responseData);

				const js = JSON.parse(responseData);
				const role = js.data.role;
				const isFirstTimeLogin = js.data.isFirstTimeLogin;
				localStorage.setItem('isfirstlogin', isFirstTimeLogin);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const roleRedirects: Record<string, any> = {
					CLIENT: {
						true: '/firstloginpagecustomer',
						false: '/dashboard',
					},
					ADMIN: {
						true: '/firstloginpagebusiness',
						false: '/managerdashboard',
					},
					MANAGER: {
						true: '/firstloginpagebusiness',
						false: '/managerdashboard',
					},
				};

				const redirectUrl = roleRedirects[role][isFirstTimeLogin];

				if (redirectUrl) {
					toast.error('login successfull', {
				theme: 'colored',
				type: 'success',
			});
					setTimeout(() => {
					window.location.href = redirectUrl;
					},2000)
					
					
				} else {
					toast('error in login', { theme: 'colored', type: 'error' });
				}

				return response.data;
			}
			return rejectWithValue('Server returned a non-200 status code');
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				if (
					error.response &&
					error.response.data &&
					error.response.data.message
				) { 
					toast(error.response.data.message, {
						theme: 'colored',
						type: 'error',
					});
				} else {
					toast('An error occurred', { theme: 'colored', type: 'error' });
				}
			} else {
				toast('An unexpected error occurred', {
					theme: 'colored',
					type: 'error',
				});
			}

			throw new Error('Email or password is wrong');
		}
	}
);

const signinSlice = createSlice({
	name: 'signin',
	initialState: {
		response: null,
		loading: false,
		error: null,
	} as SigninState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(signin.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			signin.fulfilled,
			(state, action: PayloadAction<AxiosResponse<User>>) => {
				state.loading = false;
				state.response = action.payload;
				state.error = null;
			}
		);
		builder.addCase(signin.rejected, (state) => {
			state.loading = false;
		});
	},
});

export const signinActions = signinSlice.actions;
export default signinSlice;
