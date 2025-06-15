import { IoRocketOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { CiUmbrella } from "react-icons/ci";
import { FaHeadphonesAlt } from "react-icons/fa";

export default function Objectives(){
    return(
        <div className='w-full flex gap-5 flex-wrap flex-col md:flex-row justify-between !py-6 container rounded-lg mt-10'>
                <div className='flex gap-5 items-center flex-1 px-4 py-4 md:border-b-0 border-b md:border-r md:w-[250px]'>
                    <IoRocketOutline color="2563EB" size={50}/>
                    <div>
                        <h1 className='font-bold'>Fast & Free Shipping</h1>
                        <p className='text-gray-500 text-sm mt-5'>on all orders $99</p>
                    </div>
                </div>
                <div className='flex gap-5 items-center flex-1 px-4 py-4 md:border-b-0 border-b md:border-r md:w-[250px]'>
                    <FaRegMoneyBillAlt color="2563EB" size={50}/>
                    <div>
                        <h1 className='font-bold'>100% Money Guarantee</h1>
                        <p className='text-gray-500 text-sm mt-5'>30 days money back</p>
                    </div>
                </div>
                <div className='flex gap-5 items-center flex-1 px-4 py-4 md:border-b-0 border-b md:border-r md:w-[250px]'>
                    <CiUmbrella color="2563EB" size={50}/>
                    <div>
                        <h1 className='font-bold'>Safe Shopping</h1>
                        <p className='text-gray-500 text-sm mt-5'>Safe Shopping Guarantee</p>
                    </div>
                </div>
                <div className='flex gap-5 items-center flex-1 px-4 py-4 md:border-b-0 border-b md:w-[250px]'>
                    <FaHeadphonesAlt color="2563EB" size={50}/>
                    <div>
                        <h1 className='font-bold'>Online Support</h1>
                        <p className='text-gray-500 text-sm mt-5'>24/24 on day</p>
                    </div>
                </div>
            </div>
    )
}