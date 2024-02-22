import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from '../reducer/signupReducer';
import signinSlice from './../actions/login';
import resetPasswordSlice from '../reducer/ResetPasswordSlice';
import updatePasswordSlice from '../reducer/UpdatePasswordSlice';
import categoriesReducer from '../actions/shopnest/categories';
import OtpReducer from '../reducer/OtpSlice';
import LogoutReducer from '../reducer/LogoutSlice';
import ContactUsReducer from '../reducer/ContactUsSlice';
import reviewSlice from '../actions/reviews';
import products from '../actions/shopnest/products';
import AddProductSlice from '../reducer/AddProductSlice';
import EditProductSlice from '../reducer/EditProductSlice';
import discountsSlice from '../reducer/discountsSlice';
import ViewCategorySlice from '../reducer/ViewCategorySlice';
import cartSlice from '../actions/payment/Cartpayment';
import GetOrderSlice from '../reducer/GetOrderSlice';
import GetManagerOrderSlice from '../reducer/ManageOrderSlice';
import DeleteOrderSlice from '../reducer/DeleteOrderSlice';
import Reply from '../actions/replies';
import Historyslice from '../reducer/HistorySlice';
import payment from '../actions/payment/payment';
import customerReducer from '../actions/viewCustomers';
import wishlistReducer from '../reducer/WishlistSlice';
import orderUpdateReducer from '../reducer/ManageOrderSlice';
import ProductsSlice from '../reducer/ProductsSlice';
import similarProductSlice from '../reducer/similarProductSlice';
import singleProductSlice from '../reducer/singleProductSlice';
import paymentOptionsSlice from '../reducer/paymentOptionsSlice';

const reducers = {};

const store = configureStore({
	reducer: {
		userSignup: userReducer,
		...reducers,
		signin: signinSlice.reducer,
		categories: categoriesReducer,
		User: resetPasswordSlice,
		Update: updatePasswordSlice,
		product: products,
		otp: OtpReducer,
		logout: LogoutReducer,
		contactus: ContactUsReducer,
		ProductsSlice: ProductsSlice,
		singleProduct: singleProductSlice,
		similarProducts: similarProductSlice,
		paymentOptions: paymentOptionsSlice,
		addproduct: AddProductSlice,
		editproduct: EditProductSlice,
		category: ViewCategorySlice,
		businessDiscounts: discountsSlice,
		getOrders: GetOrderSlice,
		getManagerOrders: GetManagerOrderSlice,
		deleteOrders: DeleteOrderSlice,
		reviews: reviewSlice,
		Reply: Reply,
		history: Historyslice,
		Cartpayment: cartSlice,
		Payment: payment,
		wishlist: wishlistReducer,
		orderUpdate: orderUpdateReducer,
		Customers: customerReducer,
	},
	middleware: getDefaultMiddleware({
		immutableCheck: false,
		serializableCheck: false,
	}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
