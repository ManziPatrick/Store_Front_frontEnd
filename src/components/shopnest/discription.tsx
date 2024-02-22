import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { fetchSingleproduct } from '../../redux/actions/shopnest/singlePage';

const Descrition: React.FC<{ productId: string }> = ({ productId }) => {
	const dispatch = useAppDispatch();

	const { data } = useSelector((state: RootState) => state.singleProduct);

	useEffect(() => {
		dispatch(fetchSingleproduct({ productId }));
	}, [dispatch, productId]);

	return (
		<div className="bg-white p-4  flex md:flex-col  justify-between flex-row font-sans">
			<div>
				<h3 className="font-bold mt-6">Product Description</h3>
				<p className="mb-4 font-inter text-[14px] font-normal leading-6 tracking-wide w-4/5">
					{data && data.description
						? data.description
						: 'Loading description...'}
				</p>
			</div>
		</div>
	);
};

export default Descrition;
