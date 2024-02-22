import React, { useState, useEffect } from 'react';
import Avatar from '../../assets/images/ishimwe.png';
import RingIcon from '../../assets/icons/notificationbing.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../services/auth';
import { logout } from '../../../redux/actions/logout';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	faBars,
	faTimes,
	faStore,
	faHeart,
	faHistory,
	faCreditCard,
	faShoppingBag,
	faSignOut,
	faQuestionCircle,
	faPlusCircle,
	faGlobe,
	faLanguage,
	faUser,
	faStar,
	faBox,
	faCaretDown, // Icon for dropdown
} from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { role } = useAuth();

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleLogout = async () => {
		try {
			// Dispatch the logout action to log the user out
			const response = await dispatch(logout());

			if (response.payload.status === 201) {
				toast.success('Logout successful',{theme: 'colored',type: 'success',});

				setTimeout(() => {
					navigate('/login');
				}, 2000);
			}
		} catch (error) {
			console.error('Logout error:', error);
			// Show an error toast notification for logout failure
			toast.error('Logout failed. Please try again.',{theme: 'colored',type: 'error',});
		}
	};

	useEffect(() => {
		// Retrieve the selected item from localStorage when the component mounts
		const storedSelectedItem = localStorage.getItem('selectedItem');
		if (storedSelectedItem) {
			setSelectedItem(storedSelectedItem);
		}
		return () => {
			setSelectedItem(null);
		};
	}, []);

	const handleItemClick = (item: string) => {
		setSelectedItem(item === selectedItem ? null : item);

		// Store the selected item in localStorage
		localStorage.setItem('selectedItem', item);
	};

	const isItemSelected = (item: string) => selectedItem === item;

	return (
		<div className="">
			<div className=" bg-[#00114a] p-4 flex justify-between items-center fixed top-0 z-50 w-full md:fixed">
				<ToastContainer />
				{/* Burger Menu Icon (visible on desktop screens) */}
				<div className="hidden lg:hidden md:block ">
					<div
						className="fixed top-0 left-0 z-50  pl-4 pt-4 cursor-pointer"
						onClick={toggleSidebar}
					>
						<FontAwesomeIcon
							icon={isSidebarOpen ? faTimes : faBars}
							className="text-3xl text-white"
						/>
					</div>
				</div>
				<h1 className="text-blue-600 text-2xl font-extrabold ml-4">
					StoreFront
				</h1>
				<div className="flex items-center">
					<div className="text-white mr-4">
						{/* Notification Icon */}
						<img src={RingIcon} alt="" className="h-6 w-6" />
					</div>
					<div className="relative">
						{/* Avatar Profile */}
						<div className="inline-block relative">
							{/* Active status indicator */}
							<div
								className="absolute bg-green-500 rounded-full w-2 h-2 bottom-0 right-0"
								title="Active"
							></div>

							<img
								src={Avatar}
								alt="User Avatar"
								className="w-7 h-7 rounded-full"
							/>
						</div>
					</div>

					<div className="relative">
						{/* Dropdown icon */}
						<FontAwesomeIcon
							icon={faCaretDown}
							className="text-white text-xl cursor-pointer top-0 left-0 ml-2"
							onClick={toggleDropdown}
						/>
						{isDropdownOpen && ( // Render dropdown menu if isDropdownOpen is true
							<div className="absolute top-10 right-0 mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-lg">
								<div className="flex items-center mb-3 p-3">
									<img
										src={Avatar}
										alt="User Avatar"
										className="w-12 h-12 rounded-full mr-3"
									/>
									<div>
										<div className="font-semibold text-sm">
											ISHIMWE Rodrigue
										</div>
									</div>
								</div>
								<ul className="p-2">
									{[
										{ icon: faGlobe, name: 'Domain' },
										{ icon: faPlusCircle, name: 'Create a New Site' },
										{ icon: faQuestionCircle, name: 'Help Center' },
										{ icon: faLanguage, name: 'Language' },
									].map((item, index) => (
										<li
											key={index}
											className={`px-3 py-2 flex items-center hover:bg-gray-100 cursor-pointer ${
												isItemSelected(item.name) ? 'text-blue-600' : ''
											}`}
											onClick={() => handleItemClick(item.name)}
										>
											<FontAwesomeIcon icon={item.icon} className="mr-3" />
											{item.name}
										</li>
									))}
									<li
										className={`p-2 ${
											isItemSelected('Logout')
												? 'text-blue-600 bg-[#F2F5FF] border border-primary-primary-500 rounded-lg'
												: ''
										}`}
										onClick={() => handleItemClick('Logout')}
									>
										<div className="ml-1 cursor-pointer" onClick={handleLogout}>
											<FontAwesomeIcon icon={faSignOut} className="mr-2" />
											Logout
										</div>
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
			{isSidebarOpen && (
				<div className="lg:translate-x-0 bg-white text-slate-700 p-4 flex flex-col min-h-screen shadow-lg shadow-custom md:fixed top-0 left-0 z-40 transition-transform duration-300 ease-in-out">
					<div className="lg:hidden text-right pl-12 pt-4">
						{/* Close Icon (visible on desktop screens) */}
						<FontAwesomeIcon
							icon={isSidebarOpen ? faBars : faTimes}
							className="text-3xl text-white"
						/>
					</div>
					<ul className="m-5 pt-12">
						{role === 'CLIENT' && (
							<li
								className={`p-2 ${
									isItemSelected('Shop')
										? 'text-blue-600 bg-[#F2F5FF] border border-primary-primary-500 rounded-lg'
										: ''
								}`}
								onClick={() => handleItemClick('Shop')}
							>
								<Link to="/dashboard">
									<FontAwesomeIcon icon={faStore} className="mr-2" />
									Shop
								</Link>
							</li>
						)}
						{role === 'MANAGER' && (
							<li
								className={`p-2 ${
									isItemSelected('Shop')
										? 'text-blue-600 bg-[#F2F5FF] border border-primary-primary-500 rounded-lg'
										: ''
								}`}
								onClick={() => handleItemClick('Shop')}
							>
								<Link to="/managerdashboard">
									<FontAwesomeIcon icon={faStore} className="mr-2" />
									Home
								</Link>
							</li>
						)}
						{role === 'CLIENT' && (
							<li
								className={`p-2 ${
									isItemSelected('Favorite Product')
										? 'text-blue-600 bg-[#F2F5FF] border border-primary-primary-500 rounded-lg'
										: ''
								}`}
								onClick={() => handleItemClick('Favorite Product')}
							>
								<Link to="/dashboard/favorite">
									<FontAwesomeIcon icon={faHeart} className="mr-2" />
									Favorite Product
								</Link>
							</li>
						)}
						{role === 'CLIENT' && (
							<li
								className={`p-2 ${
									isItemSelected('History')
										? 'text-blue-600 bg-[#F2F5FF] border-primary-primary-500 rounded-lg'
										: ''
								}`}
								onClick={() => handleItemClick('History')}
							>
								<Link to="/dashboard/history">
									<FontAwesomeIcon icon={faHistory} className="mr-2" />
									History
								</Link>
							</li>
						)}
						{role === 'CLIENT' && (
							<li
								className={`p-2 ${
									isItemSelected('Payment Option')
										? 'text-blue-600 bg-[#F2F5FF] border border-primary-primary-500 rounded-lg'
										: ''
								}`}
								onClick={() => handleItemClick('Payment Option')}
							>
								<Link to="/dashboard/payment">
									<FontAwesomeIcon icon={faCreditCard} className="mr-2" />
									Payment Option
								</Link>
							</li>
						)}
						{role === 'CLIENT' && (
							<li
								className={`p-2 ${
									isItemSelected('Orders')
										? 'text-blue-600 bg-[#F2F5FF] border border-primary-primary-500 rounded-lg'
										: ''
								}`}
								onClick={() => handleItemClick('Orders')}
							>
								<Link to="/dashboard/orders">
									<FontAwesomeIcon icon={faBox} className="mr-2" />
									Orders
								</Link>
							</li>
						)}
						{role === 'MANAGER' && (
							<li
								className={`p-2 ${
									isItemSelected('Product')
										? 'text-blue-600 bg-[#F2F5FF] border border-primary-primary-500 rounded-lg'
										: ''
								}`}
								onClick={() => handleItemClick('Product')}
							>
								<Link to="/managerdashboard/products">
									<FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
									Product
								</Link>
							</li>
						)}

						{role === 'MANAGER' && (
							<li
								className={`p-2 ${
									isItemSelected('Customers')
										? 'text-blue-600 bg-[#F2F5FF] border border-primary-primary-500 rounded-lg'
										: ''
								}`}
								onClick={() => handleItemClick('Customers')}
							>
								<Link to="/managerdashboard/customers">
									<FontAwesomeIcon icon={faStar} className="mr-2" />
									Customers
								</Link>
							</li>
						)}
						{role === 'MANAGER' && (
							<li
								className={`p-2 ${
									isItemSelected('Reviews')
										? 'text-blue-600 bg-[#F2F5FF] border border-primary-primary-500 rounded-lg'
										: ''
								}`}
								onClick={() => handleItemClick('Reviews')}
							>
								<Link to="/managerdashboard/reviews">
									<FontAwesomeIcon icon={faUser} className="mr-2" />
									Reviews
								</Link>
							</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Navbar;
