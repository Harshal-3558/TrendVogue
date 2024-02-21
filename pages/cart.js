import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCircleCheck, FaMinus, FaPlus } from "react-icons/fa6";

function Cart({
  user,
  cart,
  total,
  addCart,
  removeFromCart,
  deleteFromCart,
  saveDataCart,
  setItemDB,
}) {
  const [items, setItems] = useState("");
  useEffect(() => {
    const getCartItems = async () => {
      if (!user) {
        setItems(cart);
        return;
      } else {
        const item = localStorage.getItem("token");
        const decoded = await jwtDecode(item);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/getCart`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ decoded }),
          },
        );
        const res = await response.json();
        setItems(res.cartItem);
        saveDataCart(res.cartItem);
        setItemDB(res.cartItem);
      }
    };
    getCartItems();
    // eslint-disable-next-line
  }, [items]);

  const removeCartItems = async (k) => {
    if (!user) {
      removeFromCart(
        k,
        items[k].desc,
        items[k].qty,
        items[k].color,
        items[k].size,
        items[k].price,
      );
      return;
    } else {
      const ID = items[k]._id;
      const email = items[k].email;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/removeCart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ID, email }),
        },
      );
      const res = await response.json();
      refreshVariant(res.cartItem);
    }
  };

  const addCartItems = async (k) => {
    if (!user) {
      addCart(
        k,
        items[k].desc,
        items[k].qty,
        items[k].color,
        items[k].size,
        items[k].price,
      );
      return;
    } else {
      const email = items[k].email;
      const itemCode = items[k].itemCode;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/addCart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, itemCode }),
        },
      );
      const res = await response.json();
      refreshVariant(res.cartItem);
    }
  };

  const deleteCartItems = async (k) => {
    if (!user) {
      deleteFromCart(k);
    } else {
      const email = items[k].email;
      const ID = items[k]._id;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/deleteCart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, ID }),
        },
      );
      const res = await response.json();
      refreshVariant(res.cartItem);
    }
  };

  const refreshVariant = (newItem) => {
    setItems(newItem);
    saveDataCart(newItem);
  };

  return (
    <>
      <div className="md:flex md:m-2">
        <div className="md:w-[900px]">
          {Object.keys(items).length === 0 && (
            <div className={" m-2 bg-gray-200 rounded-md p-2 space-x-7"}>
              Your cart is empty !
            </div>
          )}
          {Object.keys(items).map((k) => {
            return (
              <div
                key={items[k].desc}
                className="flex m-2 bg-gray-200 rounded-md p-2 space-x-7"
              >
                <div className="flex flex-col justify-center">
                  <Image
                    src={items[k].img}
                    width={200}
                    height={50}
                    alt="Banner"
                    className="rounded-md"
                  ></Image>
                  <div className="flex space-x-3 mt-3 justify-center items-center">
                    <button
                      onClick={() => {
                        addCartItems(k);
                      }}
                      className="bg-red-500 hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 p-2 rounded-md text-white"
                    >
                      <FaPlus />
                    </button>
                    <p>{items[k].qty}</p>
                    <button
                      onClick={() => {
                        removeCartItems(k);
                      }}
                      className="bg-red-500 hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 p-2 rounded-md text-white"
                    >
                      <FaMinus />
                    </button>
                  </div>
                </div>
                <div className="text-sm md:text-lg">
                  <p>{items[k].desc}</p>
                  <p className="font-extrabold">₹{items[k].price}</p>
                  <p>Color : {items[k].color}</p>
                  <p>Size : {items[k].size}</p>
                  <p className="text-green-600">In Stock</p>
                  <div>
                    <button
                      onClick={() => {
                        deleteCartItems(k);
                      }}
                      className="relative top-2 right-1 bg-red-500 hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 p-2 rounded-md text-sm text-white z-0 md:text-base"
                    >
                      Delete
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
              <button
                disabled={Object.keys(items).length === 0 ? true : false}
                className="disabled:bg-red-300 bg-red-500 hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 p-2 rounded-md text-base text-white z-0 w-full md:text-lg"
              >
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
