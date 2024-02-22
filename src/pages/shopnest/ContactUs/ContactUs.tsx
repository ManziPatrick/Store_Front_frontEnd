import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPhone,
	faEnvelope,
	faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import { toast } from 'react-toastify';
import { contactUs } from '../../../redux/actions/contactUs';
import Footer from '../../../components/shopnest/Footer';
import ShopNestNavbar from '../../../components/shopnest/ShopNestNavbar';
import contactImg from './../../../assets/images/contact.png';

const ContactUs: React.FC = () => {
	const [contactMessage, setContactMessage] = useState({
		fullName: '',
		email: '',
		phone: 0,
		message: '',
	});

	const [isFormValid, setIsFormValid] = useState(false);

	const dispatch = useAppDispatch();

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setContactMessage({
			...contactMessage,
			[name]: value,
		});
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await dispatch(contactUs(contactMessage));
			if (response.payload.status === 200) {
				toast.success('Your message has been sent successfully!', {
					theme: 'colored',
					type: 'success',
				});
				setContactMessage({
					fullName: '',
					email: '',
					phone: 0,
					message: '',
				});
				setIsFormValid(false);
			}
		} catch (error) {
			toast.error('Failed to send the message. Please try again later.', {
				theme: 'colored',
				type: 'error',
			});
		}
	};

	React.useEffect(() => {
		const { fullName, email, phone, message } = contactMessage;
		if (fullName && email && phone && message) {
			setIsFormValid(true);
		} else {
			setIsFormValid(false);
		}
	}, [contactMessage]);

	return (
		<>
			<ShopNestNavbar initialNavBar="Contact Us" />
			<div className=" flex items-center justify-center">
				<div
					style={{
						backgroundImage: `url(${contactImg})`,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundPositionY: 'top',
					}}
					className="container w-[95%] flex flex-col gap-9"
				>
					<h1
						style={{
							fontSize: '60px',
							fontWeight: '700',
							lineHeight: '90px',
							letterSpacing: '-2.299999952316284px',
							textAlign: 'center',
						}}
						className="my-10"
					>
						CONTACT US
					</h1>

					<div className="flex flex-col lg:flex-row  w-full justify-around">
						<div className="p-4 pt-6 bg-[#FDFDFD] bg-opacity-80 w-full lg:w-[40%] rounded-[6px]">
							<p className="text-xl font-semibold mt-8 font-sans">
								GET IN TOUCH
							</p>
							<h3 className="text-xl mb-4  mt-8 font-sans">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
								officiis eveniet,{' '}
							</h3>

							<div className="flex items-center mb-5 font-sans ">
								<FontAwesomeIcon icon={faPhone} className="mr-4 " />{' '}
								+123-456-7890
							</div>
							<div className="flex items-center mb-5 font-sans">
								<FontAwesomeIcon icon={faEnvelope} className="mr-4" />{' '}
								info@example.com
							</div>
							<div className="flex items-center font-sans">
								<FontAwesomeIcon icon={faMapMarkerAlt} className="mr-4" /> 123
								Street, City
							</div>
						</div>
						<div className="p-4 pt-6 bg-[#FDFDFD] bg-opacity-80 w-full lg:w-[40%] rounded-[6px]">
							<h3 className="text-xl font-semibold mb-2 font-sans">
								ENTER DETAILS
							</h3>
							<form onSubmit={handleFormSubmit}>
								<div className="grid grid-cols-2 gap-4 font-sans">
									<div className="mb-4">
										<label
											className="block text-sm font-medium mb-1 font-sans"
											htmlFor="fullName"
										>
											Full Name:
										</label>
										<input
											type="text"
											id="fullName"
											name="fullName"
											className="w-full p-2 font-sans focus:outline-none bg-white rounded border-2 border-slate-200 text-black"
											required
											value={contactMessage.fullName}
											onChange={handleInputChange}
										/>
									</div>
									<div className="mb-4">
										<label
											className="block font-sans text-sm font-medium mb-1"
											htmlFor="email"
										>
											Email:
										</label>
										<input
											type="email"
											id="email"
											name="email"
											className="w-full p-2 font-sans focus:outline-none bg-white rounded border-2 border-slate-200 text-black"
											required
											value={contactMessage.email}
											onChange={handleInputChange}
										/>
									</div>
								</div>

								<div className="mb-4">
									<label
										className="block  text-sm font-medium mb-1 font-sans"
										htmlFor="phone"
									>
										Phone:
									</label>
									<input
										type="tel"
										id="phone"
										name="phone"
										className="w-full p-2 font-sans focus:outline-none bg-white rounded border-2 border-slate-200 text-black"
										value={contactMessage.phone}
										onChange={handleInputChange}
									/>
								</div>
								<div className="mb-4">
									<label
										className="block  text-sm font-medium mb-1 font-sans"
										htmlFor="message"
									>
										Message:
									</label>
									<textarea
										id="message"
										name="message"
										className="w-full p-2 font-sans focus:outline-none bg-white rounded border-2 border-slate-200 text-black"
										required
										value={contactMessage.message}
										onChange={handleInputChange}
									/>
								</div>

								<button
									type="submit"
									className={`w-56 py-2 bg-black font-sans text-white hover:bg-black ${
										isFormValid ? '' : 'opacity-50 cursor-not-allowed'
									}`}
									disabled={!isFormValid}
								>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ContactUs;
