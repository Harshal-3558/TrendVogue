import Image from "next/image";
import { useRouter } from "next/router";
import { React, useState } from "react";
import { FaStar, FaLocationDot } from "react-icons/fa6";

export default function Page() {
  const router = useRouter();
  const slug = router.query.slug;
  // console.log(slug);
  const [pin, setPin] = useState("");
  const [service, setService] = useState(null);
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
            src="https://images.bewakoof.com/t1080/men-s-green-more-cheese-graphic-printed-oversized-t-shirt-591331-1685599676-1.jpg"
          ></Image>
        </div>

        {/* Section #2 */}
        <div className="space-y-4">
          <div>
            <p className="text-xl font-semibold text-slate-600">Bewakoof</p>
            <p className="text-lg text-slate-500">Mens Black Hope T-shirt</p>
          </div>
          <div className="flex items-center justify-center space-x-1 border-2 w-14 bg-slate-200 rounded-lg">
            <FaStar className="text-yellow-400" />
            <span>4.6</span>
          </div>
          <div>
            <p className="text-2xl font-bold">₹599</p>
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
              <div className=" h-12 w-12 bg-green-500 rounded-full border-4"></div>
              <div className=" h-12 w-12 bg-red-500 rounded-full border-4"></div>
            </div>
          </div>
          <div>
            <p className="font-semibold">SELECT SIZE :</p>
            <div className="flex space-x-3">
              <div className=" h-12 w-12 border-slate-200 rounded-lg border-4 text-xl flex justify-center items-center">
                <p>S</p>
              </div>
              <div className=" h-12 w-12 border-slate-200 rounded-lg border-4 text-xl flex justify-center items-center">
                <p>M</p>
              </div>
              <div className=" h-12 w-12 border-slate-200 rounded-lg border-4 text-xl flex justify-center items-center">
                <p>L</p>
              </div>
              <div className=" h-12 w-12 border-slate-200 rounded-lg border-4 text-xl flex justify-center items-center">
                <p>XL</p>
              </div>
              <div className=" h-12 w-12 border-slate-200 rounded-lg border-4 text-xl flex justify-center items-center">
                <p>2XL</p>
              </div>
              <div className=" h-12 w-12 border-slate-200 rounded-lg border-4 text-xl flex justify-center items-center">
                <p>3XL</p>
              </div>
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

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/getProduct");
  const products = await res.json();
  return { props: products };
}
