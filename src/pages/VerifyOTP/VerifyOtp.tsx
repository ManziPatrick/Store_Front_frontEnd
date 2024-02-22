import React, { useState, useRef, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyOTP } from '../../redux/actions/resetPasswordAction';
import { setInputOTP } from '../../redux/reducer/OtpSlice';
import { RootState } from '../../redux/store/store';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const VerifyOtp: React.FC = () => {
	const { inputOTP, loading } = useSelector((state: RootState) => state.otp);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [pinArray, setPinArray] = useState<string[]>(Array(6).fill(''));
	const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));

	const handleOtpChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		e.preventDefault;
		const newPinArray = [...pinArray];
		newPinArray[index] = e.target.value;
		setPinArray(newPinArray);

		const nextIndex = index + 1;
		const isLastInput = nextIndex === pinArray.length;

		if (!isLastInput && e.target.value !== '') {
			inputRefs.current[nextIndex]?.focus();
		}

		const newOtp = parseInt(newPinArray.join(''), 10);

		dispatch(setInputOTP(newOtp));
		// setOtp(e.target.value);
	};
	const handleVerifyClick = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputOTP) {
			try {
				// Dispatch the verifyOTP action to send the OTP to the backend for verification

				const response = await dispatch(verifyOTP(Number(inputOTP)));

				if (response.payload.status === 201) {
					toast.success('OTP verified successfully', {
						theme: 'colored',
						type: 'success',
					});
					setTimeout(() => {
						navigate(`/reset-password/${inputOTP}`);
					}, 3000);
				}
			} catch (error) {
				toast.error('invalid OTP', { theme: 'colored', type: 'error' });
			}
		} else {
			toast.error('Please enter an OTP.', { theme: 'colored', type: 'error' });
		}
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center text-center gap-4">
				<h2 className="text-4xl font-bold mt-14">Authentication</h2>
				<p className="font-normal text-base">
					Please kindly enter the code sent to your email
				</p>
				<form className="mt-4" onSubmit={handleVerifyClick}>
					<div className="p-2">
						{' '}
						{pinArray.map((value, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type="text"
								value={value}
								onChange={(e) => handleOtpChange(e, index)}
								//   onKeyDown={(e) => handleOtpChange(e, index)}
								className="m-2 w-10 h-10 bg-gray-100 border focus:outline-none border-blue-200 rounded text-center"
								maxLength={1}
							/>
						))}
					</div>
					<div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500 mb-4">
						<p>Didn't get?</p>{' '}
						<Link
							to="/forgot-password"
							className="text-blue-500 flex flex-row items-center cursor-pointer"
						>
							Resend
						</Link>
					</div>
					<button
						type="submit"
						className="w-full bg-[#0F3CD9] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
					>
						{loading ? 'Verifying...' : 'Continue'}
					</button>
				</form>
			</div>
		</>
	);
};

export default VerifyOtp;
