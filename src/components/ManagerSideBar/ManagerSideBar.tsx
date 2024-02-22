import './sidebar.css';
//active icons
import homeIconInac from './../../assets/products/Navbar/home3Inac.svg';
import analyticsInac from './../../assets/products/Navbar/chartInac.svg';
import userActive from './../../assets/products/Navbar/profile2userInac.svg';
import reviewsActive from './../../assets/products/Navbar/rankingInac.svg';
import cartInac from './../../assets/products/Navbar/shopaddInac.svg';
import ordersActive from './../../assets/products/Navbar/shoppingcartInac.svg';
import discountActive from './../../assets/products/Navbar/discountshapeInac.svg';
//Inactive icons
import homeActive from './../../assets/products/Navbar/home3Active.svg';
import analyticsActive from './../../assets/products/Navbar/chartActive.svg';
import userInac from './../../assets/products/Navbar/profile2userActive.svg';
import reviewsInac from './../../assets/products/Navbar/rankingActive.svg';
import cartActive from './../../assets/products/Navbar/shopaddActive.svg';
import ordersInac from './../../assets/products/Navbar/shoppingcartActive.svg';
import discountInac from './../../assets/products/Navbar/discountshape.svg';

import { Link } from 'react-router-dom';
import closeIcon from './../../assets/closeblue.png';

interface IActive {
	activeTab: string;
	openSideBar: boolean;
	toogleNavbar: () => void;
}
interface IMenuItem {
	itemName: string;
	activeImgUrl: string;
	inactiveImgUrl: string;
	urlTo: string;
}

const ManagerSideBar: React.FC<IActive> = ({
	activeTab,
	openSideBar,
	toogleNavbar,
}) => {
	const menuItems: IMenuItem[] = [
		{
			itemName: 'Home',
			activeImgUrl: homeActive,
			inactiveImgUrl: homeIconInac,
			urlTo: '/managerdashboard',
		},
		{
			itemName: 'Products',
			activeImgUrl: cartActive,
			inactiveImgUrl: cartInac,
			urlTo: '/managerdashboard/products',
		},
		{
			itemName: 'Discount',
			activeImgUrl: discountActive,
			inactiveImgUrl: discountInac,
			urlTo: '/managerdashboard/discount',
		},
		{
			itemName: 'Reviews',
			activeImgUrl: reviewsInac,
			inactiveImgUrl: reviewsActive,
			urlTo: '/managerdashboard/reviews',
		},
		{
			itemName: 'Orders',
			activeImgUrl: ordersInac,
			inactiveImgUrl: ordersActive,
			urlTo: '/managerdashboard/orders',
		},
		{
			itemName: 'Customers',
			activeImgUrl: userInac,
			inactiveImgUrl: userActive,
			urlTo: '/managerdashboard/customers',
		},
		{
			itemName: 'Analytics',
			activeImgUrl: analyticsActive,
			inactiveImgUrl: analyticsInac,
			urlTo: '/managerdashboard/analytics',
		},
	];

	return (
		<div className={`managerSidebar  ${openSideBar ? 'show' : ''}`}>
			<div className="menuitems">
				{menuItems.map((menuitem, index) => (
					<Link
						key={index}
						className={`menuitem ${
							activeTab === menuitem.itemName ? 'activeTab' : ''
						}`}
						to={menuitem.urlTo}
					>
						{activeTab === menuitem.itemName && (
							<img src={menuitem.activeImgUrl} alt="" />
						)}
						{activeTab != menuitem.itemName && (
							<img src={menuitem.inactiveImgUrl} alt="" />
						)}
						<p>{menuitem.itemName}</p>
					</Link>
				))}
			</div>
			<img onClick={toogleNavbar} className="closeBtn" src={closeIcon} alt="" />
		</div>
	);
};

export default ManagerSideBar;
