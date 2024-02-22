import URL from '../../utils/api';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const resetPassword = createAsyncThunk(
	'users/forget-password',
	async (email: string) => {
		try {
			const response = await URL.post(
				`/api/v1/auth/customers/forget-password`,
				{ email }
			);

			// Store the token in a cookie
			document.cookie = `token=${response.data.otp}; path=/;`;
			// thunkAPI.dispatch(setOTP(response.data.otp));
			return response.data;
		} catch (error) {
			throw new Error('failed');
		}
	}
);

// export const setOTP = createAction<number>('setOTP');
interface resetData {
	otp: number;
	password: string;
}
export const updatePassword = createAsyncThunk(
	'users/reset-password',
	async ({ otp, password }: resetData) => {
		try {
			// Make sure the otp is available
			if (!otp) {
				throw new Error('Token not found');
			}

			const response = await URL.put(
				`/api/v1/auth/customers/reset-password/${otp}`,
				{ password }
			);

			return response.data;
		} catch (error) {
			const errorMessage = 'Failed to reset password. Please try again later.';
			throw new Error(errorMessage);
		}
	}
);

export const verifyOTP = createAsyncThunk(
	'customers/OTP',
	async (OTP: number) => {
		try {
			const response = await URL.post('/api/v1/auth/customers/OTP', { OTP });
			return response.data;
		} catch (error) {
			const errorMessage = 'Failed to get otp. Please try again later.';
			throw new Error(errorMessage);
		}
	}
);
