import Image from "next/image";
import { useRouter } from "next/router";
import { React, useContext, useState } from "react";
import { FaStar, FaLocationDot } from "react-icons/fa6";
const mongoose = require("mongoose");
import product from "@/models/product";

export default function Page({ product, variant }) {
  console.log(product, variant);
  const router = useRouter();
  const slug = router.query.slug;
  const [pin, setPin] = useState("");
  const [service, setService] = useState(null);
  const [color, setColor] = useState(product.color);
  console.log(product.color);
  const [size, setSize] = useState(product.size);
  const handleService = async () => {
    let pins = await fetch("http://localhost:3000/api/pincode");
    let pinJSON = await pins.json();
    if (pinJSON.includes(parseInt(pin))) {
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
      `http://localhost:3000/product/${variant[newColor][newSize]["slug"]}`
    );
    setColor(newColor);
    setSize(newSize);
    // router.reload()
  };
  return (
    <div className="py-12">
      <div className="flex justify-center space-x-12">
        {/* Section #1 */}
        <div className="h-[600px] w-[400px]">
          <Image
            className="rounded-xl"
            width={1200}
            height={800}
            alt="product"
            src={product.img}
          ></Image>
        </div>

        {/* Section #2 */}
        <div className="space-y-4">
          <div>
            <p className="text-xl font-semibold text-slate-600">{product.brand}</p>
            <p className="text-lg text-slate-500">{product.description}</p>
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
              {Object.keys(variant[color]).includes("S") && (
                <button  onClick={() => {
                      refreshVariant(color, "S");
                    }}
                  className={` h-12 w-12 ${
                    size === "S" ? "border-gray-400" : "border-slate-100"
                  } rounded-lg border-4 text-xl flex justify-center items-center`}
                >
                  <p>S</p>
                </button>
              )}
              {Object.keys(variant[color]).includes("M") && (
                <button  onClick={() => {
                      refreshVariant(color, "M");
                    }}
                  className={` h-12 w-12 ${
                    size === "M" ? "border-gray-400" : "border-slate-100"
                  } rounded-lg border-4 text-xl flex justify-center items-center`}
                >
                  <p>M</p>
                </button>
              )}
              {Object.keys(variant[color]).includes("L") && (
                <button  onClick={() => {
                      refreshVariant(color, "L");
                    }}
                  className={` h-12 w-12 ${
                    size === "L" ? "border-gray-400" : "border-slate-100"
                  } rounded-lg border-4 text-xl flex justify-center items-center`}
                >
                  <p>L</p>
                </button>
              )}
              {Object.keys(variant[color]).includes("XL") && (
                <button  onClick={() => {
                      refreshVariant(color, "XL");
                    }}
                  className={` h-12 w-12 ${
                    size === "XL" ? "border-gray-400" : "border-slate-100"
                  } rounded-lg border-4 text-xl flex justify-center items-center`}
                >
                  <p>XL</p>
                </button>
              )}
              {Object.keys(variant[color]).includes("2XL") && (
                <button  onClick={() => {
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
          <div className="space-x-3 border-b-4 py-4">
            <button className="bg-red-500 px-5 py-2 text-white rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300">
              ADD TO CART
            </button>
            <button className="bg-red-500 px-5 py-2 text-white rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300">
              BUY NOW
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FaLocationDot className="text-lg" />
              <p>CHECK FOR DELIVERY DETAILS</p>
            </div>
            <div>
              <div className="border-2 border-slate-200 px-2 py-1 w-fit space-x-2 rounded-lg">
                <input
                  className="focus:outline-none text-sm w-56"
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
  let colorSizeSlug = {}; //{red:{xl:{slug:'wear-the-code-xl'}}}
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
    },
  };
}
