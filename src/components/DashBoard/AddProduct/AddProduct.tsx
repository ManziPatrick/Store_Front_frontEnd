import React, { useEffect, useState } from 'react';

import { useAppDispatch } from '../../../redux/hooks/hooks';
import { viewCategories } from '../../../redux/actions/viewCategory';
import { addProduct } from '../../../redux/actions/addProduct';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Plus from './../../../assets/icons/plus.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import './../../../index.css';
const AddProduct: React.FC = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);
	const [expiredAt] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState('ACTIVE');
	const [size, setSize] = useState<string[]>([]);

	const [colors, setColors] = useState<Array<{ id: number; hex: string }>>([]);

	const [images, setImages] = useState<File[]>([]);
	const [uImages, setPreviewImages] = useState<string[]>([]);
	const [category, setCategory] = useState('');
	const { categories } = useSelector((state: RootState) => state.category);
	const loading = useSelector((state: RootState) => state.addproduct.loading);
	const navigate = useNavigate();
	const [errors, setErrors] = useState({
		name: '',
		price: '',
		stock: '',
		description: '',
		category: '',
		// status: '',
		images: '',
		colors: '',
		size: '',
	});
	const dispatch = useAppDispatch();

	// Fetch categories when the component mounts
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		dispatch(viewCategories() as any);
	}, [dispatch]);

	const handleRemoveImage = (indexToRemove: number) => {
		setImages((prevImages) =>
			prevImages.filter((_, index) => index !== indexToRemove)
		);
		setPreviewImages((prevImages) =>
			prevImages.filter((_, index) => index !== indexToRemove)
		);
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const uploadedImages = e.target.files ? Array.from(e.target.files) : [];
		let hasOversizedImage = false;
		let hasInvalidFileType = false;
		// let hasInvalidDimensions = false;

		uploadedImages.forEach((imageFile) => {
			if (imageFile.size > 2 * 1024 * 1024) {
				// Image size is larger than 2MB
				hasOversizedImage = true;
				toast.error('Image size should be less than 2MB.', {
					theme: 'colored',
					type: 'error',
				});
			}

			// Check for allowed file types (PNG, JPG, JPEG)
			const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
			if (!allowedFileTypes.includes(imageFile.type)) {
				hasInvalidFileType = true;
				toast.error(
					'Invalid file type. Please upload PNG, JPG, or JPEG images only.',
					{ theme: 'colored', type: 'error' }
				);
			}
		});

		if (!hasOversizedImage && !hasInvalidFileType) {
			if (uploadedImages.length > 0) {
				setImages((prevImages) => [...prevImages, ...uploadedImages]);

				const imagePromises = uploadedImages.map((imageFile) => {
					return new Promise<string>((resolve) => {
						const reader = new FileReader();
						reader.onload = (event) => {
							if (event.target && event.target.result) {
								resolve(event.target.result as string);
							}
						};
						reader.readAsDataURL(imageFile);
					});
				});

				Promise.all(imagePromises).then((imageDataUrls) => {
					setPreviewImages((prevImagesDataUrls) => [
						...prevImagesDataUrls,
						...imageDataUrls,
					]);
				});
			}
		}

		// Clear the file input to allow selecting the same file again (if needed)
		e.target.value = '';
	};

	const handleSaveProduct = async () => {
		const newErrors = {
			name: '',
			price: '',
			stock: '',
			description: '',
			category: '',
			status: '',
			images: '',
			colors: '',
			size: '',
		};

		let hasError = false;

		// Validation checks
		if (name.trim() === '') {
			newErrors.name = 'Product name is required';
			hasError = true;
		}
		if (price <= 0) {
			newErrors.price = 'Price must be a positive number';
			hasError = true;
		}
		if (stock <= 0) {
			newErrors.stock = 'Stock must be a positive number';
			hasError = true;
		}
		if (description.length > 255) {
			newErrors.description = 'Description cannot exceed 255 characters';
			hasError = true;
		}
		if (!category) {
			newErrors.category = 'Please select a category';
			hasError = true;
		}

		if (images.length < 4) {
			newErrors.images = 'You need to upload at most 4 images';
			hasError = true;
		}

		if (colors.length === 0) {
			newErrors.colors = 'Please select at least one color';
			hasError = true;
		}

		// Check if at least one size is selected
		if (size.length === 0) {
			newErrors.size = 'Please select at least one size';
			hasError = true;
		}

		setErrors(newErrors);
		if (!hasError) {
			const newProduct = {
				name,
				description,
				images: images,
				category_id: category,
				price,
				stock,
				expiredAt,
				size,
				colors: colors.map((color) => color.hex),
				status,
			};

			try {
				const response = await dispatch(addProduct(newProduct));

				if (response.payload.status === 200) {
					toast.success('Product added successfully', {
						theme: 'colored',
						type: 'success',
					});
					setName('');
					setPrice(0);
					setStock(0);
					setDescription('');
					setCategory('');
					setErrors(newErrors);
					setImages([]);
					setPreviewImages([]);
					setSize([]);
					setColors([]);
					setStatus('');

					navigate('/managerdashboard/products');
					// Clear form fields and reset state...
				} else if (response.payload.status === 413) {
					toast.error(
						'Error adding product. Images are too large. Please upload smaller images.',
						{ theme: 'colored', type: 'error' }
					);
				} else {
					toast.error('Error adding product. Please try again.', {
						theme: 'colored',
						type: 'error',
					});
				}
			} catch (error) {
				console.error('Error adding product:', error);
				toast.error('Error adding product. Please try again.', {
					theme: 'colored',
					type: 'error',
				});
			}
		}
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPrice = Number(e.target.value);
		if (newPrice >= 0) {
			setPrice(newPrice);
		}
	};
	const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newStock = Number(e.target.value);
		if (newStock >= 0) {
			setStock(newStock);
		}
	};

	const handleDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setDescription(e.target.value);
	};

	const handleSizeChange = (sizeOption: string) => {
		// const newSize = e.target.value;
		if (size.includes(sizeOption)) {
			setSize((prevSize) => prevSize.filter((s) => s !== sizeOption));
		} else {
			setSize((prevSize) => [...prevSize, sizeOption]);
		}
	};

	const handleColorChange = (colorOption: { id: number; hex: string }) => {
		const { id, hex } = colorOption;
		setColors((prevColors) => {
			const updatedColors = [...prevColors];
			updatedColors[id] = { id, hex };
			return updatedColors;
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleSaveProduct();
	};
	const handleCancel = () => {
		navigate('/managerdashboard/products');
	};

	return (
		<>
			<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
				<div className="flex justify-between items-center gap-2">
					<h1 className="text-[22px] text-[#455468] font-[600]">Product</h1>
					<div className="">
						<button
							type="submit"
							className="px-3 py-2 bg-white text-[#c4c4c4] rounded-md border-gray-400 border"
							onClick={handleCancel}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-3 py-2 bg-blue-600 text-white rounded-md ml-2"
							disabled={loading}
						>
							{loading ? (
								<div className="flex items-center px-3">
									{/* <span className="mr-2">Saving...</span> */}
									<div className=" inline-block h-6 w-6  animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
								</div>
							) : (
								'Save'
							)}
						</button>
					</div>
				</div>
				<div className="flex gap-4 flex-col md:flex-row">
					{/* right side */}
					<div className="w-full">
						<h2 className="text-lg font-bold mb-2 text-[#666771]">
							Product Details
						</h2>
						<p className="text-sm text-[#666771] mb-1">
							Add information for the product you are creating
						</p>

						<div className="mb-2">
							<label className="block font-semibold text-[#666771]">
								Product Name
							</label>
							<input
								value={name}
								onChange={handleNameChange}
								placeholder="Enter product name..."
								className="w-full p-1 border border-gray-300 rounded focus:outline-none text-sm text-[#666771]"
							/>
						</div>
						{errors.name && (
							<div className="text-red-500 text-sm">{errors.name}</div>
						)}
						<div className="grid grid-cols-2 gap-2 mt-1">
							<div className="mb-4">
								<label className="block font-semibold text-[#666771]">
									Price
								</label>
								<input
									value={price || ''}
									onChange={handlePriceChange}
									type="number"
									placeholder="GS"
									className="w-full p-1 border border-gray-300 rounded focus:outline-none appearance-none text-sm text-[#666771]"
								/>
							</div>

							<div className="mb-4">
								<label className="block font-semibold text-[#666771]">
									Stock
								</label>
								<input
									value={stock || ''}
									onChange={handleStockChange}
									type="number"
									placeholder="1"
									className="w-full p-1 border border-gray-300 rounded focus:outline-none appearance-none text-sm text-[#666771]"
								/>
							</div>
							{errors.price && (
								<div className="text-red-500 text-sm ">{errors.price}</div>
							)}
							{errors.stock && (
								<div className="text-red-500 text-sm ">{errors.stock}</div>
							)}
						</div>
						<div className="mb-4 mt-1">
							<label className="block font-semibold text-[#666771]">
								Description
							</label>
							<textarea
								value={description}
								onChange={handleDescriptionChange}
								placeholder="enter description"
								className="w-full p-1 border border-gray-300 rounded focus:outline-none text-sm text-[#666771]"
								rows={4}
							></textarea>
						</div>
						{errors.description && (
							<div className="text-red-500 text-sm ">{errors.description}</div>
						)}

						<div className="mb-4 mt-1">
							<label className="block font-semibold text-[#666771]">
								Categories
							</label>
							<select
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								className="w-full p-1 border border-gray-300 rounded"
							>
								<option
									className="text-[#666771] focus:outline-none text-sm "
									value=""
								>
									Select a category
								</option>
								{categories.map((cat, index) => (
									<option
										key={index}
										value={cat.id}
										className="text-[#666771] focus:outline-none text-sm"
									>
										{cat.name}
									</option>
								))}
							</select>
						</div>
						{errors.category && (
							<div className="text-red-500 text-sm ">{errors.category}</div>
						)}
						<div className="mb-4 mt-1">
							<label className="block font-semibold text-[#666771]">
								Product Status
							</label>
							<div className="flex items-center space-x-2 mt-4">
								<input
									type="checkbox"
									checked={status === 'INACTIVE'} //
									onChange={(e) =>
										setStatus(e.target.checked ? 'INACTIVE' : 'ACTIVE')
									}
									className="  h-5 w-5 text-blue-600 border border-gray-300 rounded focus:ring-0 "
								/>
								<span className="text-[#666771] font-bold">Active</span>
							</div>
						</div>
						{/* {errors.status && (
						<div className="text-red-500 text-sm ">{errors.status}</div>
					)} */}
					</div>

					{/* Right Side - Add Media */}
					<div className="w-full">
						<h2 className="text-lg font-bold mb-4 text-[#666771]">Add Media</h2>
						<p className="text-sm text-[#666771] mb-2">
							Add up to 4 images to your product images, videos, or 3D models
						</p>
						<div className=" h-64 border border-dashed border-gray-400 p-2">
							{images.length === 0 ? (
								<div className="h-60 border border-dashed border-gray-400 p-4 text-center relative">
									<label
										className="block cursor-pointer text-gray-500"
										htmlFor="myfile"
									>
										<div className="flex flex-col items-center">
											<span className="text-xs">Drag and drop image or</span>
											<img
												className="w-6 h-6 text-blue-600 mb-2"
												src={Plus}
												alt="plus"
											/>
											<span className="text-xs text-blue-600">Add a file</span>
										</div>
									</label>
									<input
										type="file"
										id="myfile"
										name="images"
										onChange={handleImageUpload}
										className="hidden"
										accept=".png, .jpg, .jpeg"
									/>
								</div>
							) : (
								<div className="grid grid-cols-2 gap-4 object-cover">
									{uImages.map((image, index) => (
										<div
											key={index}
											className="border border-gray-300 p-4 relative"
										>
											<img
												src={image}
												alt={`Image ${index}`}
												className="w-full h-20 object-cover"
											/>
											<button
												type="button"
												className="absolute top-2 right-2 px-2 py-1 rounded-full bg-red-400 text-white text-xs cursor-pointer"
												onClick={() => handleRemoveImage(index)}
											>
												X {/* You can use an X icon or any other cross icon */}
											</button>
										</div>
									))}
									{images.length < 4 && (
										<div className="border border-dashed border-gray-400 p-4 text-center relative">
											<label
												className="block cursor-pointer text-gray-500"
												htmlFor="myfile"
											>
												<div className="flex flex-col items-center">
													<span className="text-xs">
														Drag and drop image or
													</span>
													<img
														className="w-6 h-6 text-blue-600 mb-2"
														src={Plus}
														alt="plus"
													/>
													<span className="text-xs text-blue-600">
														Add a file
													</span>
												</div>
											</label>
											<input
												type="file"
												id="myfile"
												name="myfile"
												onChange={handleImageUpload}
												accept=".png, .jpg, .jpeg"
												className="hidden"
											/>
										</div>
									)}
								</div>
							)}
						</div>
						{errors.images && (
							<div className="text-red-500 text-sm">{errors.images}</div>
						)}

						<div className="mt-4 mb-2">
							<h3 className="font-semibold text-gray-500">Size</h3>
							<div className="flex space-x-2 gap-4 text-sm">
								{['S', 'M', 'L', 'XL', 'XXL'].map((sizeOption) => (
									<div
										key={sizeOption}
										className={`cursor-pointer p-2 border border-gray-300 rounded ${
											size.includes(sizeOption) ? 'bg-blue-200' : ''
										}`}
										onClick={() => handleSizeChange(sizeOption)}
									>
										{sizeOption}
									</div>
								))}
							</div>
						</div>
						{errors.size && (
							<div className="text-red-500 text-sm ">{errors.size}</div>
						)}

						<div className="mb-4">
							<h3 className="font-semibold text-gray-500">Color</h3>

							<div className="flex space-x-2 gap-4">
								{colors.map((color, index) => (
									<input
										className=" h-8 w-8  mt-2"
										key={index}
										type="color"
										value={color.hex}
										onChange={(e) =>
											handleColorChange({ id: index, hex: e.target.value })
										}
									/>
								))}

								<button
									type="button"
									onClick={() =>
										setColors((prevColors) => [
											...prevColors,
											{ id: prevColors.length, hex: '#000000' }, // Initial color: black
										])
									}
									className=" py-2 px-2  text-blue-600  mt-2 "
								>
									Add Colors
								</button>
							</div>
						</div>
						{errors.colors && (
							<div className="text-red-500 text-sm ">{errors.colors}</div>
						)}
					</div>
				</div>
			</form>
		</>
	);
};

export default AddProduct;
