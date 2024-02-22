import ShopNestNavbar from '../../../components/shopnest/ShopNestNavbar';
import './aboutus.css';
import checkcircle from './../../../assets/shopnest/CheckCircle.svg';

import TeamMember1 from '../../../assets/shopnest/team-3-user-1.jpg';
import TeamMember2 from '../../../assets/shopnest/team-3-user-2-1.jpg';
import TeamMember3 from '../../../assets/shopnest/team-3-user-2.jpg';
import TeamMember4 from '../../../assets/shopnest/team-3-user-3-1.jpg';
import TeamMember5 from '../../../assets/shopnest/team-3-user-3.jpg';
import TeamMember6 from '../../../assets/shopnest/team-3-user-4.jpg';
import reviewer from '../../../assets/shopnest/user.1.jpg';
import Rating from '../../../components/Rating/Rating';
import Footer from '../../../components/shopnest/Footer';

interface Whyshop {
	title: string;
	details: string;
}

interface TeamMember {
	teamMemberName: string;
	teamMemberPosition: string;
	imgUrl: string;
}

const AboutUs = () => {
	const whysshop: Whyshop[] = [
		{
			title: 'Convenience and Ease',
			details:
				"Shopping should be a breeze, and we've designed our platform with your convenience in mind. Browse, compare, and order products effortlessly, all with just a few clicks.",
		},
		{
			title: 'Affordable, reliable shipping',
			details:
				'Our shipping services offer reliability, convenience, and cost-effectiveness. We guarantee on-time delivery, secure tracking, and efficient customer service.',
		},
		{
			title: 'Reliable shipping.',
			details:
				"Shopping should be a breeze, and we've designed our platform with your convenience in mind. Browse, compare, and order products effortlessly, all with just a few clicks.",
		},
	];
	const teamMembers: TeamMember[] = [
		{
			teamMemberName: 'Abigail Bell',
			teamMemberPosition: 'IBM',
			imgUrl: TeamMember1,
		},
		{
			teamMemberName: 'Alex King',
			teamMemberPosition: 'ebay',
			imgUrl: TeamMember2,
		},
		{
			teamMemberName: 'Adams King Ebay',
			teamMemberPosition: 'ebay',
			imgUrl: TeamMember3,
		},
		{
			teamMemberName: 'Mercy Richards',
			teamMemberPosition: 'Starbucks',
			imgUrl: TeamMember4,
		},
		{
			teamMemberName: 'Raymond Moses',
			teamMemberPosition: 'Starbucks',
			imgUrl: TeamMember5,
		},
		{
			teamMemberName: 'Jane Miles',
			teamMemberPosition: 'Facebook',
			imgUrl: TeamMember6,
		},
	];

	return (
		<>
			<ShopNestNavbar initialNavBar="About Us" />
			<div className="aboutContainer">
				<div className="landingpicture">
					<div className="textsection">
						<h1>level up your style with our summer collections</h1>
						<p>
							Keep It SimpleOne of the most essential website design principles
							to follow is to keep everything simple. It must be easy to scroll
							through the page, and the content must be easy to read.Learn more
						</p>
					</div>
				</div>
				<div className="ourStory">
					<h2>OUR STORY</h2>
					<p>
						ShopNest was born from a vision to redefine the way you shop online.
						With years of experience in the eCommerce industry, we set out to
						create a one-stop destination where you can discover high-quality
						products, connect with trusted sellers, and enjoy seamless shopping
						from the comfort of your own nest.
					</p>
				</div>
				<div className="shopwithus">
					<h2>WHY SHOP WITH US</h2>
					<div className="whysshop">
						{whysshop.map((reason) => (
							<div className="oneshop">
								<img src={checkcircle} alt="" />
								<div className="textdetails">
									<h3>{reason.title}</h3>
									<p>{reason.details}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="teamSection">
					<h2>MEET OUR TEAM</h2>
					<div className="teamMembers">
						{teamMembers.map((teammember) => (
							<div className="teamMember">
								<img src={teammember.imgUrl} alt="" />
								<h3>{teammember.teamMemberName}</h3>
								<h4>{teammember.teamMemberPosition}</h4>
							</div>
						))}
					</div>
				</div>
				<div className="reviewsection">
					<h2>CUSTOMER REVIEWS</h2>
					<div className="reviewdetails">
						<img src={reviewer} alt="" />
						<Rating rating={4}></Rating>
						<p>
							Slate helps you see how many more days you need to work to reach
							your financial goal.
						</p>
					</div>
					<div className="reviewerInitials">
						<p>Regina miles</p>
						<p>Designer</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default AboutUs;
