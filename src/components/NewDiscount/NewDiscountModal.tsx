import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { viewCategories } from '../../redux/actions/viewCategory';
import CustomButton from '../Custombutton/CustomButton';
import closebtn from './../../assets/close.png';
import './newdiscount.css';
import { addDiscount } from '../../redux/actions/addDiscount';
import { toast } from 'react-toastify';
import { getAllDiscounts } from '../../redux/actions/discounts';

interface NewDiscountModalProps {
	showModel: () => void;
	toogleshowModel: boolean;
}

interface IFormData {
	discountName: string;
	appliesTo: {
		categoryId: string;
	};
	percentage: number;
	startDate: string;
	endDate: string;
}

interface ICategory {
	id: string;
	description: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}

interface IFormErrors {
	discountName: string;
	percentage: string;
	date: string;
}

const NewDiscountModal: React.FC<NewDiscountModalProps> = ({
	showModel,
	toogleshowModel,
}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		dispatch(viewCategories() as any);
	}, [dispatch]);

	const { categories } = useSelector((state: RootState) => state.category);

	const categoriesIn: ICategory[] = categories;

	const [formData, setFormData] = useState<IFormData>({
		discountName: '',
		appliesTo: {
			categoryId: '',
		},
		percentage: 0,
		startDate: '',
		endDate: '',
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const categoryId = e.target.value;
		setFormData((prevData) => ({
			...prevData,
			appliesTo: {
				categoryId,
			},
		}));
	};

	const [errors, setErrors] = useState<Partial<IFormErrors>>({});

	const validateForm = () => {
		// Perform validation checks
		const validationErrors: Partial<IFormErrors> = {};

		if (!formData.discountName) {
			validationErrors.discountName = 'Discount Name is required';
		} else {
			delete validationErrors.discountName;
		}

		if (formData.percentage < 0 || formData.percentage > 100) {
			validationErrors.percentage = 'Percentage must be between 0 and 100';
		} else {
			delete validationErrors.percentage;
		}

		const startDate = new Date(formData.startDate);
		const endDate = new Date(formData.endDate);
		const currentDate = new Date();

		if (
			!formData.startDate ||
			!formData.endDate ||
			startDate < currentDate ||
			startDate >= endDate
		) {
			validationErrors.date = 'Invalid dates';
		} else {
			delete validationErrors.date;
		}
		setErrors(validationErrors);
		// No need to setErrors here
	};
	useEffect(() => {
		validateForm;
		// eslint-disable-next-line
	}, [formData]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		validateForm();

		// Use a state variable to track if there are errors
		const hasErrors = Object.keys(errors).length !== 0;
		if (!hasErrors) {
			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response = await dispatch(addDiscount(formData) as any);

				//debugger;
				if (response && response.payload && response.payload.status === 200) {
					toast.success(response.payload.message, {
						theme: 'colored',
						type: 'success',
					});
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					dispatch(getAllDiscounts({ itemsPerPage: 6, page: 1 }) as any);
					showModel();
				} else if (response.type === 'discount/create/rejected') {
					toast.error('failed to create discount', {
						theme: 'colored',
						type: 'error',
					});
				}
			} catch (error) {
				// Handle dispatch error, if necessary
				console.error('Error dispatching addDiscount:', error);
			}
		}
	};

	return (
		<div className={`backgroundthing ${toogleshowModel ? '' : 'show'}`}>
			<div className="newModalContainer">
				<form className="innerContainer" action="" onSubmit={handleSubmit}>
					<div className="headingClose">
						<h2>Discount</h2>
						<img
							className="cursor-pointer"
							onClick={showModel}
							src={closebtn}
							alt=""
						/>
					</div>
					<div className="discountName">
						<label htmlFor="discountname">Discount Name</label>
						<input
							type="text"
							name="discountName"
							id="discountname"
							placeholder="e.g Black friday"
							value={formData.discountName}
							onChange={handleInputChange}
						/>
						{errors.discountName && (
							<div className="text-[15px] text-red-600">
								{errors.discountName}
							</div>
						)}
					</div>
					<div className="anothercolumn">
						<div className="discountApplies">
							<label htmlFor="discountapplies">Applies to</label>
							<select
								name="categoryId"
								id="discountapplies"
								value={formData.appliesTo.categoryId}
								onChange={handleCategoryChange}
							>
								{categoriesIn.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>
						</div>
						<input
							className="quantityInput"
							type="text"
							name="percentage"
							placeholder="Percentage"
							value={formData.percentage}
							onChange={handleInputChange}
						/>
					</div>
					{errors.percentage && (
						<div className="text-[15px] text-red-600">{errors.percentage}</div>
					)}
					<div className="anothercolumn1">
						<h2>Validity</h2>
						<div className="inputFeilds">
							<input
								type="date"
								name="startDate"
								id="startDate"
								value={formData.startDate}
								onChange={handleInputChange}
							/>
							<input
								type="date"
								name="endDate"
								id="endDate"
								value={formData.endDate}
								onChange={handleInputChange}
							/>
						</div>
						{errors.date && (
							<div className="text-[15px] text-red-600">{errors.date}</div>
						)}
					</div>
					<div className="buttonsContainer flex gap-[5px]">
						<CustomButton
							bgColor="#fff"
							borderProps={['solid', '#D0D5DD', '1px']}
							buttonText="Cancel"
							buttonType="button"
							paddingProps={['10px', '20px']}
							handleClick={showModel}
							rounded="8px"
							className="w-1/2"
							txtColor="black"
						/>
						<CustomButton
							bgColor="#0408E7"
							borderProps={['solid', 'black', '0px']}
							buttonText="Send"
							buttonType="submit"
							paddingProps={['10px', '20px']}
							handleClick={() => {}}
							rounded="8px"
							className="w-1/2"
							txtColor="white"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewDiscountModal;
