import instagram from './../../assets/icons/socials/ant-design_instagram-outlined.png';
import facebook from './../../assets/icons/socials/ant-design_facebook-filled.png';
import twitter from './../../assets/icons/socials/ant-design_twitter-outlined.png';
import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className="pagefooter">
			<div className="footerRow">
				<div className="column1">
					<h3>Get In Touch</h3>
					<div className="socials">
						<img src={instagram} alt="" />
						<img src={facebook} alt="" />
						<img src={twitter} alt="" />
					</div>
				</div>
				<div className="column2">
					<h3>Company info</h3>
					<div className="footerlinks">
						<Link className="footerlink" to={''}>
							About us
						</Link>
						<Link className="footerlink" to={''}>
							Carrier
						</Link>
						<Link className="footerlink" to={''}>
							We are hiring
						</Link>
						<Link className="footerlink" to={''}>
							Blog
						</Link>
					</div>
				</div>
				<div className="column2">
					<h3>Features</h3>
					<div className="footerlinks">
						<Link className="footerlink" to={''}>
							Business Marketing
						</Link>
						<Link className="footerlink" to={''}>
							User Analytic
						</Link>
						<Link className="footerlink" to={''}>
							Live chat
						</Link>
						<Link className="footerlink" to={''}>
							Unlimited support
						</Link>
					</div>
				</div>
				<div className="column2">
					<h3>Resources</h3>
					<div className="footerlinks">
						<Link className="footerlink" to={''}>
							IOS & Android
						</Link>
						<Link className="footerlink" to={''}>
							Watch a Demo
						</Link>
						<Link className="footerlink" to={''}>
							Customers
						</Link>
						<Link className="footerlink" to={''}>
							API
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
