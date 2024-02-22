// actions/contactUsAction.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

export interface ContactUsData {
	fullName: string;
	phone: number;
	email: string;
	message: string;
}
export const contactUs = createAsyncThunk(
	'contact/user',
	async (messageData: ContactUsData) => {
		try {
			const response = await URL.post(
				'/api/v1/feedback/contact/user',
				messageData
			);
			return response.data;
		} catch (error) {
			const errorMessage =
				'Failed to send the contact message. Please try again later.';
			throw new Error(errorMessage);
		}
	}
);
