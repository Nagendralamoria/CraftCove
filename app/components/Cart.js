"use client"
import Image from 'next/image';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import useCartStore from "../cartStore"
import Link from 'next/link';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { createOrder } from '@/sanity/sanity-utils';
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { GoArrowLeft } from "react-icons/go";
function Cart() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalItems = useCartStore((state) => state.totalItems);
  const cartTotal = useCartStore((state) => state.cartTotal);
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  }

  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async () => {
    
    const cardElement = elements?.getElement("card");
    

    try {
      if (!stripe || !cardElement) return null;
      const  data  = await axios.post("/api/stripe", {
        data: { amount: cartTotal.toFixed(0) },
      });

      console.log(data);
      const res = await stripe?.confirmCardPayment(data?.data?.intent, {
        payment_method: { card: cardElement },
      });
    
      const status = res?.paymentIntent?.status;
      if (status === 'succeeded') {
        toast.success('Payment Successful');
        const email = user?.emailAddresses[0]?.emailAddress;

        if(email){
          const res = await createOrder(email,cart);
          if(res) {
          router.push("/order");
          }
        }
        
      }
    } catch (error) {
      console.log(error);
      toast.error('Payment Failed');
    }
  };


  
  return (
    <div className='max-w-6xl mx-auto mt-20'>
      <div className='flex justify-between items-center mb-12 border-b'>
        <h1 className="text-xl text-center font-semibold pb-4 ">Shopping Cart</h1>
      <h1 className="text-xl text-center font-semibold pb-4  ">{totalItems} items</h1>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-gray-500  border-gray-200">
            <th className="py-2 px-4">Product</th>
            <th className="py-2 px-4">Quantity</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((product) => (
            <tr key={product?._id} className="hover:bg-gray-50 text-center border-b border-gray-300 ">
              <td className="py-2 px-4 flex items-center">
                <Image className='mr-2' src={product?.image} width={50} height={30} alt="art" />
                {product?.name}
              </td>
              <td className="py-2 px-4">{product?.quantity}</td>
              <td className="py-2 px-4">${product?.price}</td>
              <td className="py-2 px-4">
                <FaTrash onClick={()=>{handleRemoveFromCart(product?._id)}} className=" mx-auto cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Section */}
      <div className="mt-4 text-[#5B20B6] ml-auto">
        <p className="text-lg font-semibold text-right mr-4">Total: ${cartTotal}</p>
      </div>

          <div className='mt-10 p-10 bg-gray-100'>
          <CardElement />
          </div>
       
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-[#5B20B6]  mx-auto space-y-4">
          <Link className='' href="/">
           <p className='text-lg flex items-center'>
           <GoArrowLeft className='text-2xl' /> Back to Shopping
            </p>
            </Link> 
         
           <button disabled={cartTotal === 0} onClick={onSubmit} className="max-w-xs text-lg w-full font-semibold text-center mr-4 bg-[#5B20B6]  text-white py-2 px-4 rounded-lg hover:text-[#5B20B6] hover:bg-white border border-[#5B20B6]">
            Checkout
          </button>  
            
         
           
        
     </div>
    </div>
  );
}

export default Cart;
