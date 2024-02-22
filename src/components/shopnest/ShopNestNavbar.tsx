import ShopnestLogo from './ShopnestLogo';
import './styling/shopnestnavbar.css';
import emptycart from './../../assets/shopnest/Empty Cart.svg';
import outline from './../../assets/shopnest/Outline.svg';
import useraccount from './../../assets/shopnest/Account.svg';
import burger from './../../assets/shopnest/shopnestburger.svg';
import closing from './../../assets/shopnest/icons8_delete_32px.png';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { RootState } from '../../redux/store/store';
import {   useSelector } from 'react-redux';
import { fetchCartProducts } from '../../redux/actions/payment/Cartpayment';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { RootState } from '../../redux/store/store';

interface NavbarInitial {
	initialNavBar: string;
}

const ShopNestNavbar: React.FC<NavbarInitial> = ({ initialNavBar }) => {
	const [showNavbar, setShowNavbar] = useState(false);
	
	
	const cartProduct = useSelector((state: RootState) => state.Cartpayment);
	
	const dispatch = useAppDispatch();
	

	useEffect(() => {
	dispatch(fetchCartProducts({ page: 1 }));
	
	}, [dispatch, ]);
	const toogleNavBar = () => {
		setShowNavbar(!showNavbar);
	};

	const [activeLink, setActiveLink] = useState(initialNavBar); // Set the default active link

	const handleLinkClick = (link: string) => {
		setActiveLink(link);
	};
	const cartItemCount = cartProduct.totalCount;
	const menuItems = [
		{ text: 'Home', to: '/shopnest' },
		{ text: 'About Us', to: '/shopnest/about' },
		{ text: 'Contact Us', to: '/shopnest/contact' },
		{ text: 'Shop', to: '/shopnest/shop' },
	];
	return (
		<>
			<div className="navigationbar">
				<div className="logo">
					<Link to={'/shopnest'}>
						<ShopnestLogo />
					</Link>
				</div>
				<img className="burger" onClick={toogleNavBar} src={burger} alt="" />
				<div className="searchAndMenu">
					<div className={`menuitems ${showNavbar ? 'show' : ''}`}>
						<div className="slidinglogo">
							<ShopnestLogo />
						</div>
						{menuItems.map((menuItem) => (
							<div className="menuitem" key={menuItem.text}>
								<Link
									to={menuItem.to}
									onClick={() => handleLinkClick(menuItem.text)}
								>
									{menuItem.text}
								</Link>
								{activeLink === menuItem.text && <hr />}
							</div>
						))}
						<img
							className="closingbutton"
							src={closing}
							alt=""
							onClick={toogleNavBar}
						/>
					</div>
				</div>

				<div className="cartitems">
					<Link to="/shopnest/cart" className='relative'>
					<div className='text-white absolute bottom-2 -right-3 bg-amber-900 w-[24px] rounded-full text-center'>
						{cartItemCount}
						</div>
						<img src={emptycart} alt="" />
						
					</Link>

					<img src={useraccount} alt="" />
					<Link to="/dashboard/favorite" target="_blank">
						<img src={outline} alt="" />
					</Link>
				</div>
			</div>
		</>
	);
};

export default ShopNestNavbar;
