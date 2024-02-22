import React from 'react';
import CustomButton from '../Custombutton/CustomButton';

interface IAreYouSure {
	showModelAre: () => void;
	toogleshowModelAre: boolean;
	deleteDiscount: () => void;
	message: string;
	btnAction: string;
}
const AreYouSure: React.FC<IAreYouSure> = ({
	showModelAre,
	toogleshowModelAre,
	deleteDiscount,
	btnAction,
	message,
}) => {
	return (
		<div
			className={`z-10 absolute w-[100vw] h-[100vh] bg-[#fdfdfd80] justify-center items-center ${toogleshowModelAre ? 'flex' : 'hidden'}`}
		>
			<div className=" bg-white p-5 rounded-[10px] shadow-lg flex flex-col gap-5">
				<p>{message}</p>
				<div className=" flex gap-[5px]">
					<CustomButton
						bgColor="#fff"
						borderProps={['solid', '#D0D5DD', '1px']}
						buttonText="Cancel"
						buttonType="button"
						paddingProps={['10px', '20px']}
						handleClick={showModelAre}
						rounded="8px"
						className="w-1/2"
						txtColor="black"
					/>
					<CustomButton
						bgColor="red"
						borderProps={['solid', 'black', '0px']}
						buttonText={btnAction}
						buttonType="button"
						paddingProps={['10px', '20px']}
						handleClick={deleteDiscount}
						rounded="8px"
						className="w-1/2"
						txtColor="white"
					/>
				</div>
			</div>
		</div>
	);
};

export default AreYouSure;
