import { toast } from 'react-toastify';

export const showToast = (message: string, type: 'success' | 'error') => {
	toast[type](message, {
		position: toast.POSITION.TOP_RIGHT,
	});
};
