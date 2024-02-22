import { createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../utils/api';

interface IFormData {
	discountName: string;
	appliesTo: {
		categoryId: string;
	};
	percentage: number;
	startDate: string;
	endDate: string;
}
interface ResponseBody {
	status: number;
	message: string;
}

export const addDiscount = createAsyncThunk<ResponseBody, IFormData>(
	'discount/create',
	async (formData: IFormData) => {
		try {
			const authToken = localStorage.getItem('token');

			if (!authToken) {
				throw new Error('Authorization token not found.');
			}

			const config = {
				headers: {
					Authorization: 'Bearer ' + authToken,
				},
			};

			// Create a new FormData object to handle file uploads

			const response = await URL.post(
				'/api/v1/discounts/create',
				formData,
				config
			);

			return response.data;
		} catch (error) {
			const errorMessage =
				'Failed to create a product. Please try again later.';
			throw new Error(errorMessage);
		}
	}
);
