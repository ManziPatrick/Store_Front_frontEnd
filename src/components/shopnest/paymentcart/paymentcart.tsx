// import React, { useState } from 'react';
// import Bluebutton from '../../Bluebutton/Bluebutton';
// import fluent_card from '../../../assets/icons/payment/fluent_card-ui-20-filled.png';
// import PayPal from '../../../assets/icons/payment/PayPal_logo logo.png';

// interface PaymentInfo {
//   nameOnCard: string;
//   cardNumber: string;
//   expMonth: string;
//   expYear: string;
//   cvc: string;
// }

// interface PaymentFormProps {
//   onCheckout: (paymentInfo: PaymentInfo) => void;
//   onClose: () => void;
//   isLoading: boolean;
//   totalPrice: number;
// }

// const PaymentForm: React.FC<PaymentFormProps> = ({
//   onCheckout,
//   onClose,
//   isLoading,
//   totalPrice,
// }) => {
//   const [paymentInfo, setPaymentInfo] = useState({
//     nameOnCard: '',
//     cardNumber: '',
//     expMonth: '',
//     expYear: '',
//     cvc: '',
//   });
//   const [showForm, setShowForm] = useState(false)

//   const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setPaymentInfo((prevInfo) => ({
//       ...prevInfo,
//       [name]: value,
//     }));
//   };


//   const handleCheckout = () => {
//     // Additional validation can be added here
//     onCheckout(paymentInfo);
//   };

//   const closeForm = () => {
//     setShowForm(false);
//   };
//   return (
   
//     <div
//     className={`${
//       showForm
//         ? 'fixed md:relative top-0 left-0 w-full h-full flex items-center justify-center bg-white'
//         : 'hidden'
//     } sm:hidden md:block md:flex-col justify-center items-center w-[100%] lg:w-1/2 border-2 p-4 rounded-md`}
//   >
//                                         <div className="  flex flex-col gap-3">
//                                             <div className="flex justify-between ">
//                                                 <h1 className="font-bold text-xl">payment Details</h1>
//                                                 <button onClick={closeForm} className="">
//                                                     <img src="/reviews/x-close.svg" alt="" />
//                                                 </button>
//                                             </div>
//                                             {/* <div className=''> */}
//                                             <h1 className="  ">Choose your mode of payment</h1>
//                                             <div className="flex gap-3  justify-around items-center">
//                                                 <button className="bg-white rounded-md flex flex-col justify-center items-center px-0.5 py-2.5 text-black w-full border-2">
//                                                     <div className="flex gap-3">
//                                                         <img src={fluent_card} />
//                                                         <label className=" text-xl">card</label>
//                                                     </div>
//                                                 </button>
//                                                 <button onClick={handlePalpal} className="bg-white flex justify-center items-center rounded-md align-middle text-center px-0.5 py-2.5 text-black w-full border-2">
//                                                     <img src={PayPal} />
//                                                 </button>
//                                             </div>

//                                             <label>Name on Card</label>
//                                             <input
//                                                 defaultValue={''}
//                                                 value={paymentInfo.nameOnCard}
//                                                 onChange={handlePaymentInfoChange}
//                                                 type="text"
//                                                 name="nameOnCard"
//                                                 placeholder="Bill Gates"
//                                                 className="w-full p-2 border text-[#666771] border-gray-300 rounded focus:outline-none"
//                                             />
//                                             <label>Card Number</label>
//                                             <input
//                                                 defaultValue={''}
//                                                 name="cardNumber"
//                                                 type="text"
//                                                 value={paymentInfo.cardNumber}
//                                                 onChange={handlePaymentInfoChange}
//                                                 placeholder="XXX-XXXX-XXXX-XXXXXX-X"
//                                                 className="w-full p-2 border text-[#666771] border-gray-300 rounded focus:outline-none"
//                                             />

//                                             <div className="flex w-full gap-6 ">
//                                                 <div>
//                                                     <label> Expiration </label>
//                                                     <div className="flex">
//                                                         <input
//                                                             type="text"
//                                                             name="expMonth"
//                                                             value={`${paymentInfo.expMonth}`}
//                                                             placeholder="MM"
//                                                             maxLength={2}
//                                                             className="w-full p-2 border text-[#666771] border-gray-300 rounded focus:outline-none border-r-0"
//                                                             onChange={handlePaymentInfoChange}
//                                                         />
//                                                         <input
//                                                             type="text"
//                                                             name="expYear"
//                                                             value={paymentInfo.expYear}
//                                                             placeholder="YYYY"
//                                                             maxLength={4}
//                                                             className="p-2 border text-[#666771] border-gray-300 rounded focus:outline-none w-full"
//                                                             onChange={handlePaymentInfoChange}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="w-full">
//                                                     <label className="block font-semibold text-[#666771]">
//                                                         CVC
//                                                     </label>
//                                                     <input
//                                                         defaultValue={''}
//                                                         type="text"
//                                                         name="cvc"
//                                                         placeholder="XXX-XXXX"
//                                                         value={paymentInfo.cvc}
//                                                         onChange={handlePaymentInfoChange}
//                                                         className="p-2 border text-[#666771] border-gray-300 rounded focus:outline-none w-full"
//                                                     />
//                                                 </div>
//                                             </div>

//                                             <div className="flex flex-col ">
//                                                 <input
//                                                     defaultValue={''}
//                                                     type="text"
//                                                     name="coupcode"
//                                                     placeholder="coupcode"
//                                                     value="coupcode"
//                                                     className="p-2 border text-[#666771] border-gray-300 rounded focus:outline-none w-full"
//                                                 />
//                                             </div>

//                                             <div className="flex gap-6">
//                                                 <div>
//                                                     <p>Sub-total</p>

//                                                     <p>Total</p>
//                                                 </div>
//                                                 <div>
//                                                     <p>
//                                                         ${(totalPrice - totalPrice * 0.05).toFixed(0)}
//                                                     </p>

//                                                     <p>${totalPrice}</p>
//                                                 </div>
//                                             </div>

//                                             <Bluebutton
//                                                 buttonText={'Checkout'}
//                                                 isLoading={isLoading}
//                                                 onClick={handleCheckout}
//                                                 style={{ background: 'black' }}
//                                             />
//                                         </div>
//                                     </div>
                                    
//   );
// };

// export default PaymentForm;
