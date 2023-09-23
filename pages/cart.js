import React from "react";
import { FaPlus, FaMinus, FaTrashCan, FaCircleCheck } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

function Cart() {
  return (
    <>
      <div className="md:flex md:m-2">
        <div className="md:w-[900px]">
          <div className="flex m-2 bg-gray-200 rounded-md p-2 space-x-7">
            <div className="flex flex-col justify-center">
              <Image
                src="https://images.bewakoof.com/t1080/men-s-green-more-cheese-graphic-printed-oversized-t-shirt-591331-1685599676-1.jpg"
                width={200}
                height={50}
                alt="Banner"
                className="rounded-md"
              ></Image>
              <div className="flex space-x-3 mt-3 justify-center items-center">
                <button className="bg-red-500 hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 p-2 rounded-md text-white">
                  <FaPlus />
                </button>
                <p>4</p>
                <button className="bg-red-500 hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 p-2 rounded-md text-white">
                  <FaMinus />
                </button>
              </div>
            </div>
            <div className="text-sm md:text-lg">
              <p>Mens Green More Cheese Graphic Printed Oversized T-shirt</p>
              <p className="font-extrabold">₹899</p>
              <p>Color : Green</p>
              <p>Size : 2XL</p>
              <p className="text-green-600">In Stock</p>
              <div>
                <button className="relative top-2 right-1 bg-red-500 hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 p-2 rounded-md text-xs text-white z-0 md:text-base">
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div className="flex m-2 bg-gray-200 rounded-md p-2 space-x-7">
            <div className="flex flex-col justify-center">
              <Image
                src="https://images.bewakoof.com/t1080/men-s-green-more-cheese-graphic-printed-oversized-t-shirt-591331-1685599676-1.jpg"
                width={200}
                height={50}
                alt="Banner"
                className="rounded-md"
              ></Image>
              <div className="flex space-x-3 mt-3 justify-center items-center">
                <button className="bg-red-500 hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 p-2 rounded-md text-white">
                  <FaPlus />
                </button>
                <p>4</p>
                <button className="bg-red-500 hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 p-2 rounded-md text-white">
                  <FaMinus />
                </button>
              </div>
            </div>
            <div className="text-sm md:text-lg">
              <p>Mens Green More Cheese Graphic Printed Oversized T-shirt</p>
              <p className="font-extrabold">₹899</p>
              <p>Color : Green</p>
              <p>Size : 2XL</p>
              <p className="text-green-600">In Stock</p>
              <div>
                <button className="relative top-2 right-1 bg-red-500 hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 p-2 rounded-md text-xs text-white z-0 md:text-base">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="m-2 bg-gray-200 rounded-md p-2 space-y-6 md:w-[350px] md:h-[150px]">
          <div>
          <p className="font-extrabold text-lg">Subtotal ₹899</p>
          <span className="text-green-600 flex items-center space-x-2">
            <FaCircleCheck />
            <p>Your order is eligible for free Delivery</p>
          </span>
          </div>
          <div>
          <Link href="/orders">
          <button className="bg-red-500 hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 p-2 rounded-md text-base text-white z-0 w-full md:text-lg">
            Proceed to Buy (2 items)
          </button>
          </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
