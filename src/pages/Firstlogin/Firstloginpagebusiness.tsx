import React from 'react';
import './firstlogin.css';

import { Radio } from '../../components/fistcustomerlogin/radio';
import { Text } from '../../components/fistcustomerlogin/searchField';
import { Link } from 'react-router-dom';
import HeaderComponent from '../../components/fistcustomerlogin/header';
import Bluebutton from '../../components/Bluebutton/Bluebutton';

const HomebusinessPage: React.FC = () => {
	return (
		<>
			<HeaderComponent
				backLink=""
				skipLink="/secondloginpagebussiness"
				Width="1/2"
			/>
			<div className="center-container md:w-full sm:h-[90vh] overflow-hidden">
				<div className="wide-container md:w-full">
					<div className="flex flex-col gap-4 items-start md:items-center justify-start md:w-[796px] sm:w-4/5 w-full">
						<Text
							className="head text-center md:text-center "
							size="txtInterSemiBold48"
						>
							Which type of business establishment do you have
						</Text>
						<Text
							className="paragraph text-center md:text-center"
							size="txtInterRegular16"
						>
							Let us know your ecommerce journey so that we can tailor your
							storefront experience for you
						</Text>
					</div>

					<div className="radiocontainer justify-center grid  md:grid-cols-2 grid-cols-1 ">
						<Radio
							value="Imjuststartingmybusiness"
							className="radiobox"
							inputClassName="radiotext"
							checked={true}
							name="imjuststarting"
							label="Im just starting my business"
							id="Imjuststartingmybusiness"
						/>

						<Radio
							value="Imjuststartingmybusiness"
							inputClassName="radiotext"
							checked={true}
							name="imjuststarting"
							label="Im just starting my business"
							id="Imjuststartingmybusiness"
						/>

						<Radio
							value="Imjuststartingmybusiness"
							className=" "
							checked={true}
							name="imjuststarting"
							label="Im just starting my business"
							id="Imjuststartingmybusiness"
						/>
					</div>

					<Link
						className="firstlogincustomer mb-6 w-1/3"
						to="/secondloginpagebussiness"
					>
						<Bluebutton buttonText={'continue'} isLoading={false} />
					</Link>
				</div>
			</div>
		</>
	);
};

export default HomebusinessPage;
