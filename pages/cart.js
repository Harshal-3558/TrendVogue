import React from "react";
import { FaPlus, FaMinus, FaTrashCan, FaCircleCheck } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

function Cart({ user, cart, total, addCart, clearCart, removeFromCart }) {
  return (
    <>
      <div className="md:flex md:m-2">
        <div className="md:w-[900px]">
          {Object.keys(cart).length === 0 && (
            <div className={" m-2 bg-gray-200 rounded-md p-2 space-x-7"}>
              Your cart is empty !
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <div
                key={cart[k].desc}
                className="flex m-2 bg-gray-200 rounded-md p-2 space-x-7"
              >
                <div className="flex flex-col justify-center">
                  <Image
                    src={cart[k].img}
                    width={200}
                    height={50}
                    alt="Banner"
                    className="rounded-md"
                  ></Image>
                  <div className="flex space-x-3 mt-3 justify-center items-center">
                    <button
                      onClick={() => {
                        addCart(
                          k,
                          cart[k].description,
                          cart[k].qty,
                          cart[k].color,
                          cart[k].size,
                          cart[k].price
                        );
                      }}
                      className="bg-red-500 hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 p-2 rounded-md text-white"
                    >
                      <FaPlus />
                    </button>
                    <p>{cart[k].qty}</p>
                    <button
                      onClick={() => {
                        removeFromCart(
                          k,
                          cart[k].description,
                          cart[k].qty,
                          cart[k].color,
                          cart[k].size,
                          cart[k].price
                        );
                      }}
                      className="bg-red-500 hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 p-2 rounded-md text-white"
                    >
                      <FaMinus />
                    </button>
                  </div>
                </div>
                <div className="text-sm md:text-lg">
                  <p>{cart[k].desc}</p>
                  <p className="font-extrabold">₹{cart[k].price}</p>
                  <p>Color : {cart[k].color}</p>
                  <p>Size : {cart[k].size}</p>
                  <p className="text-green-600">In Stock</p>
                  <div>
                    <button
                      onClick={() => {
                        removeFromCart(
                          k,
                          cart[k].description,
                          cart[k].qty,
                          cart[k].color,
                          cart[k].size,
                          cart[k].price
                        );
                      }}
                      className="relative top-2 right-1 bg-red-500 hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 p-2 rounded-md text-sm text-white z-0 md:text-base"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="m-2 bg-gray-200 rounded-md p-2 space-y-6 md:w-[350px] md:h-[150px]">
          <div>
            <p className="font-extrabold text-xl md:text-lg">
              Subtotal ₹ {total}
            </p>
            <span className="text-green-600 flex items-center space-x-2">
              <FaCircleCheck />
              <p>Your order is eligible for free Delivery</p>
            </span>
          </div>
          <div>
            <Link href="/orders">
              <button className="bg-red-500 hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 p-2 rounded-md text-base text-white z-0 w-full md:text-lg">
                Proceed to Buy
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
