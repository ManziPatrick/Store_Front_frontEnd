import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import frame from '../../assets/images/Frame 1000004869.svg';
import peopleImg from '../../assets/images/technology 1.png';
import picture1 from '../../assets/images/frontImages/Picture-1.png';
import picture2 from '../../assets/images/frontImages/Picture-2.png';
import picture from '../../assets/images/frontImages/Picture.png';
import decoration from '../../assets/images/frontImages/decoration.svg';
import ellipse1 from '../../assets/images/index/Ellipse 15.png';
import ellipse2 from '../../assets/images/index/Ellipse 26.png';
import ellipse3 from '../../assets/images/index/Ellipse 27.png';
import ellipse4 from '../../assets/images/index/Ellipse 28.png';
import ellipse5 from '../../assets/images/index/Ellipse 29.png';
import ellipse6 from '../../assets/images/index/Ellipse 30.png';
import decoration1 from '../../assets/images/index/Group 5.svg';
import decoration2 from '../../assets/images/index/Group 6.svg';
import decoration3 from '../../assets/images/index/Ellipse 39.svg';
import commas from '../../assets/images/index/commas.png';
import './detailsComponent.css';
import './landingDisplay.css';
import './empowerSection.css';
import './reviewslider.css';
import './team.css';
import teamMember from './../../assets/images/team/img-team-madeline-04-1.png';
import teamMember2 from './../../assets/images/team/img-team-madeline-04-2.png';
import teamMember3 from './../../assets/images/team/img-team-madeline-04-3.png';
import teamMember4 from './../../assets/images/team/img-team-madeline-04-4.png';
import elipse1 from './../../assets/images/team/Ellipse 39.svg';
import oval1 from './../../assets/images/team//Oval.svg';
import Footer from '../../components/Footer/Footer';
import TeamMember from '../../components/TeamMember/TeamMember';
import avatar from '../../assets/Avator.png';
import rigtharrow from '../../assets/CaretRight.svg';
import slideLeft from '../../assets/leftarrow.png';
import slideRight from '../../assets/rightarrow.png';
import Review from '../../components/Reviews/Review';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'typeface-oswald';

//import React from 'react';

interface IReview {
	id: number;
	customerName: string;
	customerPosition: string;
	rating: number;
	reviewDetails: string;
	imgUrl: string;
	current: boolean;
}

interface ITeamMember {
	id: number;
	imgUrl: string;
	memberName: string;
	memberPostion: string;
}
const Index = () => {
	const reviews: IReview[] = [
		{
			id: 1,
			customerName: 'Evelyn',
			customerPosition: 'CEO Spotify',
			imgUrl: avatar,
			rating: 3.5,
			reviewDetails:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500's",
			current: false,
		},
		{
			id: 2,
			customerName: 'Evelyn',
			customerPosition: 'CEO Spotify',
			imgUrl: avatar,
			rating: 4,
			reviewDetails:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500's",
			current: true,
		},
		{
			id: 3,
			customerName: 'Evelyn',
			customerPosition: 'CEO Spotify',
			imgUrl: avatar,
			rating: 4,
			reviewDetails:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500's",
			current: false,
		},
		{
			id: 4,
			customerName: 'Evelyn',
			customerPosition: 'CEO Spotify',
			imgUrl: avatar,
			rating: 4,
			reviewDetails:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500's",
			current: false,
		},
	];

	const team: ITeamMember[] = [
		{
			id: 1,
			imgUrl: teamMember,
			memberName: 'Steve Evans',
			memberPostion: 'CEO',
		},
		{
			id: 2,
			imgUrl: teamMember2,
			memberName: 'Padma Patil',
			memberPostion: 'Head of HR ',
		},
		{
			id: 3,
			imgUrl: teamMember3,
			memberName: 'Alisia Spinnet',
			memberPostion: 'PR Manager',
		},
		{
			id: 4,
			imgUrl: teamMember4,
			memberName: 'Dean Thomas',
			memberPostion: 'Java Developer',
		},
	];

	return (
		<>
			<div className="landingDisplay">
				<div className="landingDescription">
					<div className="textDescription">
						<h1>Create Your Website Simply and Stylishly</h1>
						<p>
							Storefront is the website builder that simplifies your online
							presence. With our easy-to-use templates, you can create a
							stunning website and take control of your finances, all form one
							place
						</p>
						<div className="buttons">
							<div className="buttonlink1">
								<Link to="/signupcustomer">Start your new store</Link>
							</div>
							<div className="buttonlink2">
								<Link to="/signupcustomer">
									<div className="buttondesign">
										<div>Customize and extend</div>{' '}
										<img src={rigtharrow} alt="" />
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="imagePart">
					<img className="frameImg" src={frame} alt="" />
					<img className="peopleImg" src={peopleImg} alt="" />
				</div>
			</div>
			<div className="empowering">
				<div className="gridImages">
					<img className="decoration" src={decoration} alt="" />
					<img className="img1" src={picture} alt="" />
					<img className="img2" src={picture1} alt="" />
					<img className="img3" src={picture2} alt="" />
				</div>

				<div className="empowerDesc">
					<div className="textDesc">
						<h1>Empowering small business with powerful website solutions</h1>
						<p>
							Storefront is the website builder that simplifies your online
							presence. With our easy-to-use templates, you can create a
							stunning website and take control of your finances, all form one
							place
						</p>
					</div>
				</div>
			</div>
			<div className="details-container">
				<div className="grid-container">
					<h1>Trusted by Agencies & Store Owners</h1>
					<img className="group-green" src={decoration1} alt="" />
					<img className="group-red" src={decoration2} alt="" />
					<img className="decoration" src={decoration3} alt="" />
					<img className="img1" src={ellipse1} alt="" />
					<img className="img2" src={ellipse2} alt="" />
					<img className="img3" src={ellipse3} alt="" />
					<img className="img4" src={ellipse4} alt="" />
					<img className="img5" src={ellipse5} alt="" />
					<img className="img6" src={ellipse6} alt="" />
					<div className="details">
						<div className="backbox1"></div>
						<div className="backbox"></div>
						<div className="textbox">
							<img src={commas} alt="" />
							<p>
								There’s no other platform like this to start your store for free
								and grow your business. More importantly, Storefront doesnt
								charge you a portion of your profits as your business grows.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="reviewSlider">
				<h1>What Clients Are Saying About Us</h1>
				<div className="reviewsContainer">
					<img className="slideleft" src={slideLeft} alt="" />
					<div className="slide">
						<OwlCarousel
							className="owl-theme"
							loop
							margin={10}
							nav
							dots={false}
							responsive={{ 0: { items: 1 }, 770: { items: 3 } }}
						>
							{reviews.map((review, index) => (
								<Review
									key={index}
									customerName={review.customerName}
									customerPosition={review.customerPosition}
									rating={review.rating}
									reviewDetails={review.reviewDetails}
									imgUrl={review.imgUrl}
								/>
							))}
						</OwlCarousel>
					</div>
					<img className="slideright" src={slideRight} alt="" />
				</div>
			</div>
			<div className="team">
				<img className="elipse" src={elipse1} alt="" />
				<img className="oval" src={oval1} alt="" />
				<h1>Meet Our Talented Team</h1>
				<div className="teamMembers">
					{team.map((teammember) => (
						<TeamMember
							key={teammember.id}
							imgUrl={teammember.imgUrl}
							memberName={teammember.memberName}
							memberPostion={teammember.memberPostion}
							id={0}
						/>
					))}
				</div>
			</div>
			<Footer />
			<Navbar />
		</>
	);
};

export default Index;
