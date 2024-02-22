import { useState, useEffect } from 'react';

interface ValueProps {
	value: number;
}

const NumberDisplay = (valueProps: ValueProps) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		let intervalDuration = 10; // Initial interval duration in milliseconds
		const remainingNumbersThreshold = 20;

		const intervalId = setInterval(() => {
			if (count < valueProps.value) {
				setCount((prevCount) => prevCount + 1);

				// Adjust the interval duration when only 20 numbers are remaining
				if (valueProps.value - count <= remainingNumbersThreshold) {
					intervalDuration = 500;
				}
			} else {
				clearInterval(intervalId);
			}
		}, intervalDuration);

		return () => clearInterval(intervalId); // Cleanup the interval on component unmount
	}, [count, valueProps.value]);

	return <div>{count}</div>;
};

export default NumberDisplay;
