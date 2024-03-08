"use client"
import { GrAppleAppStore } from "react-icons/gr";
import { LuShoppingCart } from "react-icons/lu";
import { UserButton } from "@clerk/nextjs";
import useCartStore from "../cartStore";
import { TbTruckDelivery } from "react-icons/tb";
import Link from 'next/link';

function Header() {
  const totalItems = useCartStore((state) => state.totalItems);
  return (
    <div className="p-3 border-b-2 border-[#F5F3FF]">
        <div className="max-w-7xl mx-auto flex justify-between">
         
        <Link href="/">
        <div className="flex items-center cursor-pointer">
        <GrAppleAppStore className="text-6xl text-[#5B20B6]" />
        <h1 className="ml-2 text-2xl lg:text-3xl font-bold">CraftCove</h1>
        </div>
        </Link>

        <div className="flex items-center relative">
            <div className="flex">
            <Link href="/cart">
            <LuShoppingCart className="text-3xl cursor-pointer hover:scale-125 transition-transform duration-300" />
            </Link>
             {
                  totalItems > 0 && (
                      <div className="absolute ml-2 bg-white rounded-full w-4 h-4 flex items-center justify-center  text-xs font-semibold">
                          {totalItems}
                      </div>
                  )
             }
            </div>

             <Link className="ml-4" href="/order">
             <TbTruckDelivery className="text-3xl cursor-pointer hover:scale-125 transition-transform duration-300" />
              </Link>

            <div className="ml-4">
            <UserButton  afterSignOutUrl="/"/>
            </div>
        </div>

        </div>
    </div>
  )
}

export default Header