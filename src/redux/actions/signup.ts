import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

interface SignupData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface BusinessSignup {
	businessName: string;
	email: string;
	password: string;
}

export const signup = createAsyncThunk('/signup', async (data: SignupData) => {
	try {
		const response = await URL.post('/api/v1/auth/customers/signup', data);
		return response.data;
	} catch (error) {
		throw new Error('Signup failed');
	}
});

export const businessSignup = createAsyncThunk(
	'/business-signup',
	async (data: BusinessSignup) => {
		try {
			const response = await URL.post(
				'/api/v1/auth/customers/business/signup',
				data
			);

			return response.data;
		} catch (error) {
			throw new Error('Signup failed');
		}
	}
);
