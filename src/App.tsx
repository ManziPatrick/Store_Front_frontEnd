import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/StorefrontIndex/index.tsx';
import Login from './pages/Login/Login.tsx';
import SignupCustomer from './pages/Signupcustomer/signupCustomer.tsx';
import Notfound from './pages/NotFound/Notfound.tsx';
import SignupBusiness from './pages/Signupbusiness/Signupbusiness.tsx';
import Firstcustomerlogin from './pages/Firstlogin/Firstloginpagecustomer2.tsx';
import Firstloginpagebussiness from './pages/Firstlogin/secondloginpagebussiness.tsx';
import ChooseTempletebussiness from './pages/Firstlogin/chooseTempletebussiness.tsx';
import Firstloginpage1 from './pages/Firstlogin/Firstloginpagebusiness.tsx';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.tsx';
import ForgotPasswordForm from './pages/ForgotPasswordForm/ForgotPasswordForm.tsx';
import CheckEmail from './pages/CheckEmail/CheckEmail.tsx';
import VerifyOtp from './pages/VerifyOTP/VerifyOtp.tsx';
import VerifliedBussiness from './pages/VerifiedBusiness/verifliedBusiness.tsx';
import Success from './pages/Success/Success.tsx';
import CustomerDashboard from './pages/Dashboard/CustomerDashboard/CustomerDashboard.tsx';
import HistoryDashboard from './pages/Dashboard/HistoryDashboard/HistoryDashboard.tsx';
import OrderDashboard from './pages/Dashboard/OrderDashboard/OrderDashBoard.tsx';
import PaymentDashboard from './pages/Dashboard/PaymentDashBoard/PaymentDashboard.tsx';
import FavoriteDashboard from './pages/Dashboard/FavouriteDashboard/FavoriteDashboard.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verified/veriflied.tsx';
import ChooseTemplete from './pages/Firstlogin/chooseTempletecustomer.tsx';
import Shopnest from './pages/shopnest/ShopnestIndex/shopnest.tsx';
import ContactUs from './pages/shopnest/ContactUs/ContactUs.tsx';
import Unauthorized from './pages/Unauthorised/Unauthorized.tsx';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute.tsx';
import AboutUs from './pages/shopnest/AboutUs/AboutUs.tsx';
import CustomDashboard from './pages/Dashboard/CustomDashboard/CustomDashboard.tsx';
import ReviewDashboard from './pages/Dashboard/ReviewsDashboard/ReviewsDashboard.tsx';
import { SingleProduct } from './pages/shopnest/SingleProduct/singleproduct.tsx';
import Products from './pages/Products/Products.tsx';
import AddProductDashboard from './pages/Dashboard/AddProductDashBoard/AddProductDashboard.tsx';
import EditProductDashboard from './pages/Dashboard/EditProductDashBoard/EditProductDashboard.tsx';
import HomeDashboard from './pages/Dashboard/HomeDashBoard/HomeDashboard.tsx';
import ProductDiscsounts from './pages/ProductDiscounts/ProductDiscounts.tsx';
import ManagerOrdersDashboard from './pages/Dashboard/ManagerOrderDashBoard/ManagerOrdersDashboard.tsx';
import Analytics from './pages/Analytics/Analytics.tsx';

import CartShopping from './pages/shopnest/CartPayment/cartPayment.tsx';

export const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Index />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signupcustomer" element={<SignupCustomer />} />
					<Route path="/signupbusiness" element={<SignupBusiness />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/reset-password/:otp" element={<ForgotPasswordForm />} />
					<Route path="/checkemail" element={<CheckEmail />} />
					<Route path="/verifyotp" element={<VerifyOtp />} />
					<Route path="/success" element={<Success />} />

					<Route path="/firstloginpagebusiness" element={<Firstloginpage1 />} />
					<Route
						path="/firstloginpagecustomer"
						element={<Firstcustomerlogin />}
					/>
					<Route path="/choosetemplete" element={<ChooseTemplete />} />
					<Route
						path="/secondloginpagebussiness"
						element={<Firstloginpagebussiness />}
					/>
					<Route
						path="/chooseTempletebussiness"
						element={<ChooseTempletebussiness />}
					/>
					<Route path="/shopnest" element={<Shopnest />} />

					<Route
						path="/customers/verify/:verificationToken"
						element={<Verify />}
					/>
					<Route
						path="/customers/business/verify/:verificationToken"
						element={<VerifliedBussiness />}
					/>
					<Route
						path="/dashboard/*"
						element={
							<ProtectedRoute
								element={<CustomerDashboard />}
								requiredRoles={['CLIENT']}
							/>
						}
					/>
					<Route
						path="dashboard/history"
						element={
							<ProtectedRoute
								element={<HistoryDashboard />}
								requiredRoles={['CLIENT']}
							/>
						}
					/>
					<Route
						path="dashboard/payment"
						element={
							<ProtectedRoute
								element={<PaymentDashboard />}
								requiredRoles={['CLIENT']}
							/>
						}
					/>
					<Route
						path="dashboard/favorite"
						element={
							<ProtectedRoute
								element={<FavoriteDashboard />}
								requiredRoles={['CLIENT']}
							/>
						}
					/>

					<Route
						path="dashboard/orders"
						element={
							<ProtectedRoute
								element={<OrderDashboard />}
								requiredRoles={['CLIENT']}
							/>
						}
					/>

					{/* manager dashboard */}
					<Route
						path="managerdashboard/customers"
						element={
							<ProtectedRoute
								element={<CustomDashboard />}
								requiredRoles={['MANAGER']}
							/>
						}
					/>
					<Route
						path="managerdashboard/orders"
						element={
							<ProtectedRoute
								element={<ManagerOrdersDashboard />}
								requiredRoles={['MANAGER']}
							/>
						}
					/>
					<Route
						path="managerdashboard/editproduct/:productId"
						element={
							<ProtectedRoute
								element={<EditProductDashboard />}
								requiredRoles={['MANAGER']}
							/>
						}
					/>
					<Route
						path="managerdashboard/reviews"
						element={
							<ProtectedRoute
								element={<ReviewDashboard />}
								requiredRoles={['MANAGER']}
							/>
						}
					/>
					<Route
						path="/managerdashboard/*"
						element={
							<ProtectedRoute
								element={<HomeDashboard />}
								requiredRoles={['MANAGER', 'ADMIN']}
							/>
						}
					/>
					<Route
						path="managerdashboard/addproduct"
						element={
							<ProtectedRoute
								element={<AddProductDashboard />}
								requiredRoles={['MANAGER']}
							/>
						}
					/>
					<Route
						path="managerdashboard/products"
						element={
							<ProtectedRoute
								element={<Products />}
								requiredRoles={['MANAGER']}
							/>
						}
					/>
					<Route
						path="managerdashboard/discount"
						element={
							<ProtectedRoute
								element={<ProductDiscsounts />}
								requiredRoles={['MANAGER']}
							/>
						}
					/>

					<Route
						path="managerdashboard/analytics"
						element={
							<ProtectedRoute
								element={<Analytics />}
								requiredRoles={['MANAGER']}
							/>
						}
					/>

					{/* Shop nest urls */}
					<Route path="/shopnest/about" element={<AboutUs />}></Route>
					<Route path="*" element={<Notfound />} />
					<Route path="/unauthorized" element={<Unauthorized />} />
					<Route path="/shopnest/contact" element={<ContactUs />} />
					<Route path="shopnest/:id" element={<SingleProduct />} />
					<Route path="shopnest/shop/" element={<SingleProduct />} /> 
					<Route path="shopnest/cart/" element={<CartShopping/>} />
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
};
