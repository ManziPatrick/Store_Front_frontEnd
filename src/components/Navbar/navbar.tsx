import { Link } from 'react-router-dom';
import Logo from './../Logo/logo';
import burger from './../../assets/burger.svg';
import './navbar.css';
import closing from './../../assets/close.png';
import { useState } from 'react';

const Navbar = () => {
	const [showNavbar, setShowNavbar] = useState(false);

	const toogleNavBar = () => {
		setShowNavbar(!showNavbar);
	};

	return (
		<div className="navbar" style={{ fontFamily: 'Inter' }}>
			<div
				onClick={() => {
					toogleNavBar();
				}}
				className="burger cursor-pointer"
			>
				<img src={burger} alt="" width="25px" />
			</div>

			<div className={`logoandmenu ${showNavbar ? 'show' : ''}`}>
				<Logo />
				<div className="separateLine"></div>
				<div className="menuitems">
					<Link to="/">Home</Link>
					<Link to="/about">About</Link>
					<Link to="/testimonials">Testimonials</Link>
					<Link to="/teams">Teams</Link>
				</div>
				<img
					className="cursor-pointer"
					onClick={() => toogleNavBar()}
					src={closing}
					alt=""
				/>
			</div>
			<div className="loginandsignup">
				<Link to="/login">
					<div className="loginredirect">Log In</div>
				</Link>
				<Link to="/signupcustomer">
					<div
						className="buttonlink"
						style={{ backgroundColor: '#1b4cff1c', color: '#1B4DFF' }}
					>
						Get Started
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
