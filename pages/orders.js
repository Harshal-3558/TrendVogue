import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Orders({ cart, total }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [disabled, setDisabled] = useState(true);
  const handleChange = async (e) => {
    console.log(cart);
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinJSON = await pins.json();
        if (Object.keys(pinJSON).includes(e.target.value)) {
          const array = pinJSON[e.target.value];
          setCity(array[0]);
          setState(array[1]);
        } else {
          toast.error("Please Enter a valid pincode", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setCity("");
          setState("");
        }
      }
    } else if (e.target.name == "address") {
      setPassword(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "city") {
      setCity(e.target.value);
    }

    if (
      name.length > 3 &&
      email.length > 3 &&
      phone.length > 3 &&
      address.length > 3 &&
      pincode.length > 3
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  async function initializePayments() {
    const data = { cart, email, address };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/preTransaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const res = await response.json();
    if (res.success === "true") {
      router.push(res.url);
    } else {
      toast.error(res.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
  return (
    <div className="p-4 space-y-4">
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
      {/* DELIVERY ADDRESS */}
      <div className="h-90 w-full bg-slate-200 rounded-lg">
        <div className="bg-red-500 h-8 text-white flex items-center pl-2 rounded-t-lg">
          <p>Delivery Address</p>
        </div>
        <div className="p-5 md:space-y-3">
          <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
            <input
              onChange={handleChange}
              value={name}
              type="text"
              name="name"
              className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-1 rounded-lg w-full"
              placeholder="Name"
            ></input>
            <input
              onChange={handleChange}
              value={email}
              className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-1 rounded-lg w-full"
              placeholder="Email"
              name="email"
              type="email"
            ></input>
          </div>
          <div className="mt-4 md:my-0">
            <textarea
              onChange={handleChange}
              value={address}
              className="w-full p-1 border-2 border-slate-300 focus:outline-none focus:border-red-400 rounded-lg"
              rows="5"
              cols="33"
              placeholder="Address (Area and Street)"
              name="address"
              type="text"
            ></textarea>
          </div>
          <div className="md:flex md:space-x-4 space-y-4 md:space-y-0 mt-3 md:mt-0">
            <input
              onChange={handleChange}
              value={pincode}
              className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-1 rounded-lg w-full"
              placeholder="Pincode"
              name="pincode"
              type="text"
            ></input>
            <input
              onChange={handleChange}
              value={phone}
              className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-1 rounded-lg w-full"
              placeholder="Phone"
              name="phone"
              type="text"
            ></input>
          </div>
          <div className="md:flex md:space-x-4 space-y-4 md:space-y-0 mt-3 md:mt-0">
            <input
              onChange={handleChange}
              value={city}
              className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-1 rounded-lg  w-full"
              placeholder="City/District/Town"
              name="city"
              type="text"
              readOnly={true}
            ></input>
            <input
              onChange={handleChange}
              value={state}
              className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-1 rounded-lg  w-full"
              placeholder="State"
              name="state"
              type="text"
              readOnly={true}
            ></input>
          </div>
        </div>
      </div>

      {/* ORDER SUMMARY */}
      <div className=" w-full bg-slate-200 rounded-lg">
        <div className="bg-red-500 h-8 text-white flex items-center pl-2 rounded-t-lg">
          <p>Order Summary</p>
        </div>
        <div className="p-5 space-y-2">
          {Object.keys(cart).map((k) => {
            return (
              <div
                key={cart[k].desc}
                className="md:w-96 flex space-x-5 justify-between"
              >
                <p>{cart[k].desc}</p>
                <p>₹{cart[k].price}</p>
              </div>
            );
          })}
          <div className="md:w-96 flex justify-between border-y-2 border-slate-600 py-2">
            <p className="font-bold">Total</p>
            <p className="font-bold">₹{total}</p>
          </div>
          <div className="pt-5">
            <button
              onClick={initializePayments}
              className="disabled:bg-red-400 bg-red-500 px-5 py-2 text-white text-base rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300"
            >
              Proceed for Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
