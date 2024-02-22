import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { viewCategories } from '../../redux/actions/viewCategory';
import CustomButton from '../Custombutton/CustomButton';
import closebtn from './../../assets/close.png';
import './editdiscount.css';
import { toast } from 'react-toastify';
import { editDiscount, getAllDiscounts } from '../../redux/actions/discounts';
import { Offer } from '../../pages/ProductDiscounts/ProductDiscounts';
import moment from 'moment';

interface EditDiscountModalProps {
	showModelEdit: () => void;
	toogleshowModelEdit: boolean;
	discountToEdit: Offer;
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

const EditDiscount: React.FC<EditDiscountModalProps> = ({
	showModelEdit,
	toogleshowModelEdit,
	discountToEdit,
}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		dispatch(viewCategories() as any);
	}, [dispatch]);

	const { categories } = useSelector((state: RootState) => state.category);

	const categoriesIn: ICategory[] = categories;

	// State to track original and modified data
	const [originalData, setOriginalData] = useState<IFormData>({
		discountName: '',
		appliesTo: { categoryId: '' },
		percentage: 0,
		startDate: '',
		endDate: '',
	});

	const [formData, setFormData] = useState<IFormData>({
		discountName: '',
		appliesTo: { categoryId: '' },
		percentage: 0,
		startDate: '',
		endDate: '',
	});

	useEffect(() => {
		const editData: IFormData = {
			discountName: discountToEdit.discountName,
			appliesTo: { categoryId: discountToEdit.appliesTo.categoryId },
			percentage: discountToEdit.percentage,
			startDate: moment(discountToEdit.startDate).format('YYYY-MM-DD'),
			endDate: moment(discountToEdit.endDate).format('YYYY-MM-DD'),
		};

		setOriginalData(editData);
		setFormData(editData);
	}, [discountToEdit]);

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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const editedFields: Partial<IFormData> = {};
		if (formData.discountName !== originalData.discountName) {
			editedFields.discountName = formData.discountName;
		}
		if (formData.percentage !== originalData.percentage) {
			editedFields.percentage = formData.percentage;
		}
		if (formData.appliesTo.categoryId !== originalData.appliesTo.categoryId) {
			editedFields.appliesTo = formData.appliesTo;
		}
		if (formData.percentage !== originalData.percentage) {
			editedFields.percentage = formData.percentage;
		}
		if (formData.startDate !== originalData.startDate) {
			editedFields.startDate = formData.startDate;
		}
		if (formData.endDate !== originalData.endDate) {
			editedFields.endDate = formData.endDate;
		}

		if (Object.keys(editedFields).length > 0) {
			dispatch(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				editDiscount({ data: editedFields, promoId: discountToEdit.id }) as any
			).then((response: { payload: { status: number; message: string } }) => {
				if (response.payload.status === 200) {
					toast.success(response.payload.message, {
						theme: 'colored',
						type: 'success',
					});
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					dispatch(getAllDiscounts({ itemsPerPage: 6, page: 1 }) as any);
					showModelEdit();
				}
			});
		} else {
			toast.error('Edit something in form before sending', {
				theme: 'colored',
				type: 'error',
			});
		}
	};

	return (
		<div className={`backgroundthing ${toogleshowModelEdit ? '' : 'show'}`}>
			<div className="newModalContainer">
				<form className="innerContainer" action="" onSubmit={handleSubmit}>
					<div className="headingClose">
						<h2> Edit Discount</h2>
						<img
							className="cursor-pointer"
							onClick={showModelEdit}
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
							// placeholder="e.g Black friday"
							value={formData.discountName}
							onChange={handleInputChange}
						/>
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
							// placeholder="Quantity"
							value={formData.percentage}
							onChange={handleInputChange}
						/>
					</div>
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
					</div>
					<div className="buttonsContainer flex gap-[5px]">
						<CustomButton
							bgColor="#fff"
							borderProps={['solid', '#D0D5DD', '1px']}
							buttonText="Cancel"
							buttonType="button"
							paddingProps={['10px', '20px']}
							handleClick={showModelEdit}
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

export default EditDiscount;
