import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import URL from "../../../../utils/api";



export const paypalPayment = createAsyncThunk<void, undefined>(
  'payment/paypal',
  async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const apiUrl = `/api/v1/payment/checkout/paypal`;

      await URL.post(apiUrl, null, { headers: config.headers });
      toast.success("Paid with PayPal");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      console.error('Error during PayPal payment:', error);
      throw error; 
    }
  }
);