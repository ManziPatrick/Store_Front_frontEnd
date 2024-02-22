import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../redux/hooks/hooks';
import { viewCategories } from '../../../redux/actions/viewCategory';
import {
	editProduct,
	getProductDetails,
} from '../../../redux/actions/editProduct';
import { toast } from 'react-toastify';
import Plus from './../../../assets/icons/plus.svg';
import 'react-toastify/dist/ReactToastify.css';
import './../../../index.css';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux/store/store';

interface Category {
	id: string;
	name: string;
}

interface ProductData {
	name: string;
	price: number;
	description: string;
	status: string;
	category: string;
	stock: number;
	images: string[];
	// Add other properties as needed
}

const EditProduct: React.FC = () => {
	const [data, setData] = useState<ProductData>({
		name: '',
		price: 0,
		description: '',
		status: '',
		category: '',
		stock: 0,
		images: [],
	});
	const [name, setName] = useState('');
	const [prevName, setPrevName] = useState('');
	const [price, setPrice] = useState(0);
	const [prevPrice, setPrevPrice] = useState(0);
	const [stock, setStock] = useState(0);
	const [prevStock, setPrevStock] = useState(0);
	// const [expiredAt] = useState('');
	const [description, setDescription] = useState('');
	const [prevDescription, setPrevDescription] = useState('');
	const [status, setStatus] = useState('');
	const [prevStatus, setPrevStatus] = useState('');
	const [category, setCategory] = useState<Category[]>([]);
	const [prevCategory, setPrevCategory] = useState('');
	const [size, setSize] = useState<string[]>([]);
	const [colors, setColors] = useState<Array<{ id: number; hex: string }>>([]);
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [images, setImages] = useState<File[]>([]);
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [prevImage, setPrevImage] = useState<File[]>([]);
	// const [loadingImages, setLoadingImages] = useState(false);
	const [errors, setErrors] = useState({
		name: '',
		price: '',
		stock: '',
		description: '',
		category: '',
		status: '',
		// colors: '',
		// size: '',
		// images: '',
	});

	const params = useParams();

	const { productId } = params;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const loading = useSelector((state: RootState) => state.addproduct.loading);
	// Fetch categories when the component mounts
	useEffect(() => {
		const viewCategory = async () => {
			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response = await dispatch(viewCategories() as any);

				// Assuming the categories are stored in response.payload
				const categoriesData = response.payload;

				// Check if categoriesData is an array and not empty
				if (Array.isArray(categoriesData) && categoriesData.length > 0) {
					// Update the categories state with the fetched data
					setCategory(categoriesData);
				} else {
					console.error(
						'Categories data is not in the expected format:',
						categoriesData
					);
				}
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};
		viewCategory();
	}, [dispatch]);

	const handleRemoveImage = (indexToRemove: number) => {
		setData((prevData) => {
			const updatedImages = [...prevData.images];
			updatedImages.splice(indexToRemove, 1);
			return {
				...prevData,
				images: updatedImages,
			};
		});
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const uploadedImages = e.target.files ? Array.from(e.target.files) : [];

		if (uploadedImages.length > 0) {
			// Update the images state
			setImages((prevImages) => [...prevImages, ...uploadedImages]);

			// Create an array of promises for each image data URL
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

			// Wait for all image data URLs to be resolved
			Promise.all(imagePromises).then((imageDataUrls) => {
				// Update the data state
				setData((prevData) => {
					const newData = {
						...prevData,
						images: Array.isArray(prevData.images)
							? [...prevData.images, ...imageDataUrls]
							: [...imageDataUrls],
					};
					return newData;
				});
			});
		}
	};

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				const response = await dispatch(getProductDetails(productId));

				setData(response.payload.details);

				const formattedExpiryDate =
					response.payload.details.expiryDate.substring(0, 10);

				setPrevName(response.payload.details.name);
				setName(response.payload.details.name);
				setPrevPrice(response.payload.details.name);
				setPrice(response.payload.details.price);
				setPrevStatus(response.payload.details.status);
				setStatus(response.payload.details.status);
				setPrevStock(response.payload.details.stock);
				setStock(response.payload.details.status);
				setPrevCategory(response.payload.category);
				setImages(response.payload.details.images);
				setPrevImage(response.payload.details.images);

				// setColors(response.payload.details.colors);
				// setPrevColors(response.payload.details.colors);
				// setPrevSize(response.payload.details.size);
				// setSize(response.payload.details.size)
				setDescription(formattedExpiryDate);

				setPrevDescription(response.payload.details.description);
			} catch (error) {
				return error;
			}
		};
		fetchProductDetails();
	}, [dispatch, productId]);
	const handleEditProduct = async () => {
		const newErrors = {
			name: '',
			price: '',
			stock: '',
			description: '',
			category: '',
			status: '',
		};

		let hasError = false;

		// Validation checks
		if (name === '' && name !== prevName) {
			newErrors.name = 'Product name is required';
			hasError = true;
		}
		if (price <= 0 && price !== prevPrice) {
			newErrors.price = 'Price must be a positive number';
			hasError = true;
		}
		if (stock <= 0 && stock !== prevStock) {
			newErrors.stock = 'Stock must be a positive number';
			hasError = true;
		}
		if (description.length > 255 && description !== prevDescription) {
			newErrors.description = 'Description cannot exceed 255 characters';
			hasError = true;
		}
		if (!category && category !== prevCategory) {
			newErrors.category = 'Please select a category';
			hasError = true;
		}
		if (!status && status !== prevStatus) {
			newErrors.status = 'Product status is required';
			hasError = true;
		}

		setErrors(newErrors);
		if (!hasError) {
			const productDetails: Partial<ProductData> = {};
			if (name !== prevName) {
				productDetails.name = name;
			}
			if (price !== prevPrice) {
				productDetails.price = price;
			}
			if (stock !== prevStock) {
				productDetails.stock = stock;
			}
			if (description !== prevDescription) {
				productDetails.description = description;
			}

			if (status !== prevStatus) {
				productDetails.status = status;
			}
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (category !== prevCategory) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				productDetails.category = category;
			}

			try {
				const response = await dispatch(
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					editProduct({ data: productDetails, productId: productId })
				);
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				if (response.payload.status === 201) {
					toast.success('Product added successfully', {
						theme: 'colored',
						type: 'success',
					});
					setName('');
					setPrice(0);
					setStock(0);
					setDescription('');
					setCategory([]);
					setErrors(newErrors);
					setStatus('');
					navigate('/managerdashboard/products');
					// Clear form fields and reset state...
				} else {
					toast.error('Error updating product. Please try again.', {
						theme: 'colored',
						type: 'error',
					});
				}
			} catch (error) {
				toast.error('Error updating product. Please try again.', {
					theme: 'colored',
					type: 'error',
				});
			}
		}
	};

	const handleSizeChange = (sizeOption: string) => {
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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleEditProduct();
	};

	const handleCancel = () => {
		navigate('/managerdashboard/products');
	};

	return (
		<>
			<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
				<div className="flex justify-between w-full items-center">
					<h2 className="text-[22px] text-[#455468] font-[600]">Product</h2>
					<div className="p-4">
						<button
							type="submit"
							className="px-3 py-2 bg-white text-[#c4c4c4] rounded-md border-gray-400 border"
							onClick={handleCancel}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-600 text-white rounded-md ml-2"
							disabled={loading}
							// onClick={handleEditProduct}
						>
							{loading ? (
								<div className="flex items-center">
									{/* <span className="mr-2">Saving...</span> */}
									<div className="inline-block h-6 w-6  animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
								</div>
							) : (
								'Update'
							)}
						</button>
					</div>
				</div>
				<div className="flex gap-4 flex-col md:flex-row">
					{/* Left Side - Product Details */}
					<div className="w-full">
						<div>
							<h2 className="text-lg font-bold mb-2 text-[#666771]">
								Product Details
							</h2>
						</div>
						<p className="text-sm text-[#666771] mb-1">
							Add information for the product you are creating
						</p>

						<div className="mb-2">
							<label className="block font-semibold text-[#666771]">
								Product Name
							</label>
							<input
								defaultValue={data.name}
								onChange={(e) => setName(e.target.value)}
								className="w-full p-2 border text-[#666771] border-gray-300 rounded focus:outline-none"
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
									defaultValue={data.price || ''}
									onChange={handlePriceChange}
									type="number"
									placeholder="GS"
									className="w-full p-2 border text-[#666771] border-gray-300 rounded focus:outline-none"
								/>
							</div>

							<div className="mb-4">
								<label className="block font-semibold text-[#666771]">
									Stock
								</label>
								<input
									defaultValue={data.stock || ''}
									onChange={handleStockChange}
									type="number"
									placeholder="1"
									className="w-full p-2 border text-[#666771] border-gray-300 rounded focus:outline-none"
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
								defaultValue={data.description}
								onChange={handleDescriptionChange}
								placeholder="enter description"
								className="w-full p-2 border font-medium text-[#666771] border-gray-300 rounded focus:outline-none"
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
								defaultValue={data.category}
								onChange={(e) => setPrevCategory(e.target.value)}
								className="w-full p-2 border border-gray-300 rounded"
							>
								<option className="text-[#666771] focus:outline-none" value="">
									Select Category
								</option>
								{category.map((cat) => (
									<option
										key={cat.id}
										value={cat.id}
										className="focus:outline-none"
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
									checked={status === 'ACTIVE'}
									onChange={(e) =>
										setStatus(e.target.checked ? 'ACTIVE' : 'INACTIVE')
									}
									className="  h-5 w-5 text-blue-600 border border-gray-300 rounded focus:ring-0"
								/>
								<span className="text-[#666771] font-bold">Active</span>
							</div>
						</div>
						{errors.status && (
							<div className="text-red-500 text-sm ">{errors.status}</div>
						)}
					</div>

					{/* Right Side - Add Media */}
					<div className="w-full">
						<div>
							<h2 className="text-lg font-bold mb-4 text-[#666771]">
								Add Media
							</h2>
							<p className="text-sm text-[#666771] mb-2">
								Add up to 4 images to your product images, videos, or 3D models
							</p>

							{data.images && data.images.length === 0 ? (
								<div className="h-64 border border-dashed border-gray-400 p-4 text-center relative">
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
									/>
								</div>
							) : (
								<div className="grid grid-cols-2 gap-4 object-cover">
									{data.images &&
										data.images.map((image, index) => (
											<div
												key={index}
												className="border border-gray-300 p-4 relative"
											>
												<img
													src={image}
													alt={`Image ${index}`}
													className="w-full h-24 object-cover"
												/>
												<button
													type="button"
													className="absolute top-2 right-2 px-2 py-1 rounded-full bg-red-400 text-white text-xs cursor-pointer"
													onClick={() => handleRemoveImage(index)}
												>
													X
												</button>
											</div>
										))}
									{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
									{/*@ts-ignore  */}
									{data.images && data.images.length < 4 && (
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
												className="hidden"
											/>
										</div>
									)}
								</div>
							)}

							{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
							{/*@ts-ignore  */}
							{/* {errors.images && (

                        <div className="text-red-500 text-sm">{errors.images}</div>
                    )} */}

							<div className="mt-4 mb-2">
								<h3 className="font-semibold">Size</h3>
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

							<div className="mb-4">
								<h3 className="font-semibold">Color</h3>

								<div className="flex space-x-2 gap-4">
									{colors.map((color, index) => (
										<input
											className=" h-8 w-8  mt-2"
											key={index}
											type="color"
											value={color.hex}
											// defaultValue={data.color}
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
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default EditProduct;
