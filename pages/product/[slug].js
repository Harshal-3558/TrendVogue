import Image from "next/image";
import { useRouter } from "next/router";
import { React, useState } from "react";
import { FaStar, FaLocationDot } from "react-icons/fa6";
const mongoose = require("mongoose");
import product from "@/models/product";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

export default function Page({
  product,
  variant,
  stock,
  addCart,
  buyNow,
  user,
  setItemDB,
}) {
  const router = useRouter();
  const slug = router.query.slug;
  const [pin, setPin] = useState("");
  const [service, setService] = useState(null);
  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);

  const addToCart = async (itemCode, desc, qty, color, size, price, img) => {
    if (!user) {
      addCart(itemCode, desc, qty, color, size, price, img);
      return;
    }
    const item = localStorage.getItem("token");
    const decoded = jwtDecode(item);
    const email = decoded.email;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/addCart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          itemCode,
          desc,
          qty,
          color,
          size,
          price,
          img,
        }),
      },
    );
    const res = await response.json();
    setItemDB(res.cartItem);
  };

  const BuyNow = async (itemCode, desc, qty, color, size, price, img) => {
    if (!user) {
      buyNow(itemCode, desc, qty, color, size, price, img);
      return;
    }
    const item = localStorage.getItem("token");
    const decoded = jwtDecode(item);
    const email = decoded.email;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/addCart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          itemCode,
          desc,
          qty,
          color,
          size,
          price,
          img,
        }),
      },
    );
    const res = await response.json();
    setItemDB(res.cartItem);
    router.push("/orders");
  };

  const handleService = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJSON = await pins.json();
    if (Object.keys(pinJSON).includes(pin)) {
      setService(true);
    } else {
      setService(false);
    }
  };

  const changePin = (e) => {
    setPin(e.target.value);
  };
  const refreshVariant = (newColor, newSize) => {
    router.push(
      `${process.env.NEXT_PUBLIC_HOST}/product/${variant[newColor][newSize]["slug"]}`,
    );
    setColor(newColor);
    setSize(newSize);
  };

  return (
    <div className="py-12">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <div className="mx-6 md:flex justify-center md:space-x-12">
        {/* Section #1 */}
        <div className="md:h-[600px] md:w-[400px]">
          <Image
            className="rounded-xl"
            width={1200}
            height={800}
            alt="product"
            src={product.img}
          ></Image>
        </div>

        {/* Section #2 */}
        <div className="mt-4 space-y-3 md:space-y-4">
          <div>
            <p className="text-sm md:text-xl text-slate-500">{product.brand}</p>
            <p className="text-lg md:text-lg font-extrabold text-slate-700">
              {product.description}
            </p>
          </div>
          <div className="flex items-center justify-center space-x-1 border-2 w-14 bg-slate-200 rounded-lg">
            <FaStar className="text-yellow-400" />
            <span>{product.rating}</span>
          </div>
          <div>
            <p className="text-2xl font-bold">₹{product.price}</p>
            <p className="text-xs text-slate-400">inclusive of all taxes</p>
          </div>
          <div className=" border-y-4 py-4">
            <p className="text-sm">
              TriBe members get an extra discount of ₹20 and FREE shipping.Learn
              more
            </p>
          </div>
          <div>
            <p className="font-semibold">COLOR OPTIONS :</p>
            <div className="flex space-x-3">
              {Object.keys(variant).includes("white") &&
                Object.keys(variant["white"]).includes(size) && (
                  <button
                    onClick={() => {
                      refreshVariant("white", size);
                    }}
                    className={` h-12 w-12 bg-white rounded-full border-4 ${
                      color === "white" ? "border-gray-400" : "border-slate-100"
                    }`}
                  ></button>
                )}
              {Object.keys(variant).includes("black") &&
                Object.keys(variant["black"]).includes(size) && (
                  <button
                    onClick={() => {
                      refreshVariant("black", size);
                    }}
                    className={` h-12 w-12 bg-black rounded-full border-4 ${
                      color === "black" ? "border-gray-400" : "border-slate-100"
                    }`}
                  ></button>
                )}
              {Object.keys(variant).includes("yellow") &&
                Object.keys(variant["yellow"]).includes(size) && (
                  <button
                    onClick={() => {
                      refreshVariant("yellow", size);
                    }}
                    className={` h-12 w-12 bg-yellow-500 rounded-full border-4 ${
                      color === "yellow"
                        ? "border-gray-400"
                        : "border-slate-100"
                    }`}
                  ></button>
                )}
              {Object.keys(variant).includes("green") &&
                Object.keys(variant["green"]).includes(size) && (
                  <button
                    onClick={() => {
                      refreshVariant("green", size);
                    }}
                    className={` h-12 w-12 bg-green-600 rounded-full border-4 ${
                      color === "green" ? "border-gray-400" : "border-slate-100"
                    }`}
                  ></button>
                )}
              {Object.keys(variant).includes("pink") &&
                Object.keys(variant["pink"]).includes(size) && (
                  <button
                    onClick={() => {
                      refreshVariant("pink", size);
                    }}
                    className={` h-12 w-12 bg-pink-600 rounded-full border-4 ${
                      color === "pink" ? "border-gray-400" : "border-slate-100"
                    }`}
                  ></button>
                )}
              {Object.keys(variant).includes("purple") &&
                Object.keys(variant["purple"]).includes(size) && (
                  <button
                    onClick={() => {
                      refreshVariant("purple", size);
                    }}
                    className={` h-12 w-12 bg-purple-600 rounded-full border-4 ${
                      color === "purple"
                        ? "border-gray-400"
                        : "border-slate-100"
                    }`}
                  ></button>
                )}
              {Object.keys(variant).includes("red") &&
                Object.keys(variant["red"]).includes(size) && (
                  <button
                    onClick={() => {
                      refreshVariant("red", size);
                    }}
                    className={` h-12 w-12 bg-red-500 rounded-full border-4 ${
                      color === "red" ? "border-gray-400" : "border-slate-100"
                    }`}
                  ></button>
                )}
              {Object.keys(variant).includes("blue") &&
                Object.keys(variant["blue"]).includes(size) && (
                  <button
                    onClick={() => {
                      refreshVariant("blue", size);
                    }}
                    className={` h-12 w-12 bg-blue-500 rounded-full border-4 ${
                      color === "blue" ? "border-gray-400" : "border-slate-100"
                    }`}
                  ></button>
                )}
            </div>
          </div>
          <div>
            <p className="font-semibold">SELECT SIZE :</p>
            <div className="flex space-x-3">
              {variant[color] && Object.keys(variant[color]).includes("S") && (
                <button
                  onClick={() => {
                    refreshVariant(color, "S");
                  }}
                  className={` h-12 w-12 ${
                    size === "S" ? "border-gray-400" : "border-slate-100"
                  } rounded-lg border-4 text-xl flex justify-center items-center`}
                >
                  <p>S</p>
                </button>
              )}
              {variant[color] && Object.keys(variant[color]).includes("M") && (
                <button
                  onClick={() => {
                    refreshVariant(color, "M");
                  }}
                  className={` h-12 w-12 ${
                    size === "M" ? "border-gray-400" : "border-slate-100"
                  } rounded-lg border-4 text-xl flex justify-center items-center`}
                >
                  <p>M</p>
                </button>
              )}
              {variant[color] && Object.keys(variant[color]).includes("L") && (
                <button
                  onClick={() => {
                    refreshVariant(color, "L");
                  }}
                  className={` h-12 w-12 ${
                    size === "L" ? "border-gray-400" : "border-slate-100"
                  } rounded-lg border-4 text-xl flex justify-center items-center`}
                >
                  <p>L</p>
                </button>
              )}
              {variant[color] && Object.keys(variant[color]).includes("XL") && (
                <button
                  onClick={() => {
                    refreshVariant(color, "XL");
                  }}
                  className={` h-12 w-12 ${
                    size === "XL" ? "border-gray-400" : "border-slate-100"
                  } rounded-lg border-4 text-xl flex justify-center items-center`}
                >
                  <p>XL</p>
                </button>
              )}
              {variant[color] &&
                Object.keys(variant[color]).includes("2XL") && (
                  <button
                    onClick={() => {
                      refreshVariant(color, "2XL");
                    }}
                    className={` h-12 w-12 ${
                      size === "2XL" ? "border-gray-400" : "border-slate-100"
                    } rounded-lg border-4 text-xl flex justify-center items-center`}
                  >
                    <p>2XL</p>
                  </button>
                )}
            </div>
          </div>
          <div className="md:space-y-3 space-x-3 md:space-x-0 border-b-4 py-4">
            {stock < 1 ? (
              <h1 className="text-red-500 font-bold text-lg">
                Currently Out of Stock !
              </h1>
            ) : (
              ""
            )}
            <button
              disabled={stock < 1 ? true : false}
              onClick={() => {
                addToCart(
                  slug,
                  product.description,
                  1,
                  color,
                  size,
                  product.price,
                  product.img,
                );
                toast.success("Item added to cart", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              }}
              className="bg-red-500 disabled:bg-red-400 px-7 md:px-5 md:me-7 py-2 text-white rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300"
            >
              ADD TO CART
            </button>
            <button
              disabled={stock < 1 ? true : false}
              onClick={() => {
                BuyNow(
                  slug,
                  product.description,
                  1,
                  color,
                  size,
                  product.price,
                  product.img,
                );
              }}
              className="bg-red-500 disabled:bg-red-400 px-8 md:px-5 py-2 text-white rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300"
            >
              BUY NOW
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FaLocationDot className="text-lg" />
              <p>CHECK FOR DELIVERY DETAILS</p>
            </div>
            <div>
              <div className="border-2 border-slate-200 px-2 py-2 md:py-1 md:w-fit space-x-2 rounded-lg">
                <input
                  className="focus:outline-none md:text-sm w-60 md:w-56"
                  placeholder="Enter Pincode"
                  onChange={changePin}
                ></input>
                <button
                  className="text-red-500 font-bold text-sm"
                  onClick={handleService}
                >
                  CHECK
                </button>
              </div>
              {service == true && service != null ? (
                <p className="text-green-500">Deliver is available</p>
              ) : (
                ""
              )}
              {service == false && service != null ? (
                <p className="text-red-500">Deliver is not available</p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await product.findOne({ slug: context.query.slug });

  let variants = await product.find({ description: products.description });

  let colorSizeSlug = {};

  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug, img: item.img };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug, img: item.img };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(products)),
      variant: JSON.parse(JSON.stringify(colorSizeSlug)),
      stock: JSON.stringify(products.available),
    },
  };
}
