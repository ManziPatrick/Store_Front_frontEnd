import './sidebar.css';

// inactive icons
import homeIconInac from './../../assets/products/customer/home3Inac.svg';

import reviewsIconInac from './../../assets/products/Navbar/rankingInac.svg';
import favouriteInac from './../../assets/products/customer/shopaddInac.svg';
import discountIconInac from './../../assets/products/customer/discountshapeInac.svg';
import ordersIconInac from './../../assets/products/customer/shoppingcartInac.svg';

// active icons
import discountIconActive from './../../assets/products/Navbar/discountshapeInac.svg';
import favouriteActive from './../../assets/products/customer/shopaddActive.svg';
import homeIconActive from './../../assets/products/customer/home3Active.svg';
import reviewsIconActive from './../../assets/products/customer/rankingActive.svg';
import ordersIconActive from './../../assets/products/Navbar/shoppingcartActive.svg';

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
			itemName: 'Shop',
			//imgUrl: homeIcon,
			activeImgUrl: homeIconActive,
			inactiveImgUrl: homeIconInac,
			urlTo: '/dashboard',
		},
		{
			itemName: 'Favourite Product',
			//imgUrl: cartIcon,
			activeImgUrl: favouriteActive,
			inactiveImgUrl: favouriteInac,
			urlTo: '/dashboard/favorite',
		},
		{
			itemName: 'History',
			//imgUrl: discountIcon,
			activeImgUrl: discountIconActive,
			inactiveImgUrl: discountIconInac,
			urlTo: '/dashboard/history',
		},
		{
			itemName: 'Payment Option',
			//imgUrl: reviewsIcon,
			activeImgUrl: reviewsIconActive,
			inactiveImgUrl: reviewsIconInac,
			urlTo: '/dashboard/payment',
		},
		{
			itemName: 'Orders',
			//imgUrl: ordersIcon,
			activeImgUrl: ordersIconActive,
			inactiveImgUrl: ordersIconInac,
			urlTo: '/dashboard/orders',
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
