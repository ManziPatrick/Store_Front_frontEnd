import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../components/fistcustomerlogin/searchField';
import { Img } from '../../components/fistcustomerlogin/lmage';
import Logo from '../Logo/logo';
import backimage from '../../assets/icons/backicon.svg';

interface HeaderComponentProps {
	backLink: string;
	skipLink: string;
	Width?: string;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
	backLink,
	skipLink,
	Width,
}) => {
	return (
		<>
			<div className={`bg-[#1B4DFF] h-2 w-${Width}`}></div>
			<div className="bg-white-A700 flex flex-col font-poppins sm:gap-10 md:gap-10 items-center justify-start mx-auto w-full">
				<div className="flex flex-col gap-[25px] items-start justify-start w-full">
					<div className="flex flex-col items-start justify-start w-full">
						<div className="flex flex-row gap-[9px] items-center justify-start pb-[3px] md:px-5 px-[3px] w-1/2 md:w-full">
							<Text
								className="ml-7 text-2xl md:text-[22px] text-center mt-6 text-light_blue-A700 sm:text-xl"
								size="txtPoppinsBlack24"
							>
								<Logo />
							</Text>
							<div className="flex flex-row font-inter mt-6 items-center ml-3 justify-center md:pr-10 sm:pr-5 pr-[43px] w-[15%]">
								{backLink ? (
									<>
										<Link className="firstpagelogin flex " to={backLink}>
											<Img
												className="h-5  w-5"
												src={backimage}
												alt="arrowleft"
											/>
											<Text
												className="text-base text-blue_gray-800 tracking-[-0.30px]"
												size="txtInterRegular16"
											>
												Back
											</Text>
										</Link>
									</>
								) : null}
								<Link className="w-full" to={skipLink}>
									<button className="absolute right-1 top-1 inline-flex items-center justify-center p-0.5 mt-5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-[#B4C4FF] group-hover:from-teal-300">
										<span className="relative md:px-0.5 md:text-[12px] px-5 py-2 transition-all ease-in duration-75 bg-white rounded-md text-[#94ABFF] group-hover:bg-opacity-0 ">
											Skip this step
										</span>
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HeaderComponent;
