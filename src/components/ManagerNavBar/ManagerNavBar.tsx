import React, { useEffect, useState } from 'react';
import burger from './../../assets/shopnest/shopnestburger.svg';
import dropdown from './../../assets/icons/arrowdown2.svg';
import notificatinBing from './../../assets/icons/notificationbing.svg';
import './navbar.css';
import Logo from '../Logo/logo';
import { logout } from '../../redux/actions/logout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCaretDown,
	faGlobe,
	faLanguage,
	faQuestionCircle,
	faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../../redux/hooks/hooks';
import DecodeToken from '../../utils/token';
import Avatar from 'react-avatar';
import AreYouSure from '../AreYouSure/AreYouSure';

interface ManagerProps {
	toggleSideBar: () => void;
	currentPage?: string;
}

const ManagerNavBar: React.FC<ManagerProps> = ({
	toggleSideBar,
	currentPage,
}) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const [hideNotch, setHideNotch] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const decodedToken = DecodeToken();

	const businessName = decodedToken?.businessName;

	const [showModelAre, setshowModelAre] = useState<boolean>(false);
	const toogleShowModelAre = () => {
		setshowModelAre(!showModelAre);
	};

	const handleLogout = async () => {
		try {
			// Dispatch the logout action to log the user out
			const response = await dispatch(logout());
			if (response.payload.status === 201) {
				toast.success('Logout successful', {
					theme: 'colored',
					type: 'success',
				});

				setTimeout(() => {
					navigate('/login');
				}, 2000);
			}
		} catch (error) {
			console.error('Logout error:', error);

			toast.error('Logout failed. Please try again.', {
				theme: 'colored',
				type: 'error',
			});
		}
	};
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
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
	useEffect(() => {
		if (currentPage == 'Home') {
			setHideNotch(true);
		} else {
			setHideNotch(false);
		}
	}, [currentPage]);

	const handleItemClick = (item: string) => {
		setSelectedItem(item === selectedItem ? null : item);

		// Store the selected item in localStorage
		localStorage.setItem('selectedItem', item);
	};

	const isItemSelected = (item: string) => selectedItem === item;
	return (
		<>
			<div className="managerNavbar">
				<div className="logoBusinesName">
					<div className="menulogo">
						<img
							className="burger"
							onClick={toggleSideBar}
							src={burger}
							alt=""
						/>
						<div className="logo">
							<Logo />
						</div>
					</div>
					<div className={hideNotch ? 'businessName' : 'hideNotch'}>
						<div className="capitalize">{businessName}</div>
						<img className="w-[24px] h-[24px]" src={dropdown} alt="" />
					</div>
				</div>

				<div className="profileNotification">
					<img className="notificationBell" src={notificatinBing} alt="" />
					<div className="profile">
						<Avatar
							name={`${businessName} `}
							size="50" // Set the size as needed
							round // Optional: rounded corners
						/>
					</div>
					<div className="relative top-0 left-0 flex items-center">
						{/* Dropdown icon */}
						<FontAwesomeIcon
							icon={faCaretDown}
							className="text-white text-xl cursor-pointer"
							onClick={toggleDropdown}
						/>
						{isDropdownOpen && ( // Render dropdown menu if isDropdownOpen is true
							<div className="absolute top-10 right-0 mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-lg">
								<div className="flex items-center mb-3 p-3">
									<Avatar
										name={`${businessName} `}
										size="50" // Set the size as needed
										round // Optional: rounded corners
									/>
									<div className="ml-2">
										{/* <div className="flex gap-2"> */}
										<div className="font-semibold text-xs">{businessName}</div>
									</div>
								</div>
								<ul className="p-2">
									{[
										{ icon: faGlobe, name: 'Domains' },
										{ icon: faQuestionCircle, name: 'Help Center' },

										{ icon: faLanguage, name: 'English' },
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
										<div
											className="ml-1 cursor-pointer"
											onClick={() => toogleShowModelAre()}
										>
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
			<AreYouSure
				deleteDiscount={() => handleLogout()}
				showModelAre={toogleShowModelAre}
				toogleshowModelAre={showModelAre}
				message="Are you sure you want to logout?"
				btnAction="Logout"
			/>
		</>
	);
};

export default ManagerNavBar;
