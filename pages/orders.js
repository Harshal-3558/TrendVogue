import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

export default function Orders({ cart, total, saveDataCart, user, buy }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [items, setItems] = useState("");
  const [userExist, setUserExist] = useState(false);
  const [executionCount, setExecutionCount] = useState(0);
  const handleChange = async (e) => {
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
      phone.length > 9 &&
      address.length > 10 &&
      pincode.length > 5 &&
      city.length > 3 &&
      state.length > 3
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  async function initializePayments() {
    if (!items) {
      toast.error("Cart is empty !", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const data = { items, email, address, userExist };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/preTransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
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
  }

  useEffect(() => {
    const getCartItems = async () => {
      if (!user) {
        setItems(cart);
        return;
      } else {
        setUserExist(true);
        const item = localStorage.getItem("token");
        const decoded = jwtDecode(item);
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
        const getUserDetails = async () => {
          const item = localStorage.getItem("token");
          const decoded = jwtDecode(item);
          setEmail(decoded.email);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/getUserDetails`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email }),
            },
          );
          const res = await response.json();
          const value = await res.Users[0];
          if (value) {
            setAddress(value.address);
            setPhone(value.phone);
            setName(value.name);
          }
        };
        if (user && executionCount < 5) {
          getUserDetails();
          setExecutionCount(executionCount + 1);
        }
      }
    };
    getCartItems();
    // eslint-disable-next-line
  }, [!items]);

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
      <div className="h-90 w-full bg-gray-200 rounded-lg">
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
              className="border-2 border-gray-300 focus:outline-none focus:border-red-400 p-1 rounded-lg w-full"
              placeholder="Name"
            ></input>
            <input
              onChange={handleChange}
              value={email}
              className="border-2 border-gray-300 focus:outline-none focus:border-red-400 p-1 rounded-lg w-full"
              placeholder="Email"
              name="email"
              type="email"
            ></input>
          </div>
          <div className="mt-4 md:my-0">
            <textarea
              onChange={handleChange}
              value={address}
              className="w-full p-1 border-2 border-gray-300 focus:outline-none focus:border-red-400 rounded-lg"
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
              className="border-2 border-gray-300 focus:outline-none focus:border-red-400 p-1 rounded-lg w-full"
              placeholder="Pincode"
              name="pincode"
              type="text"
            ></input>
            <input
              onChange={handleChange}
              value={phone}
              className="border-2 border-gray-300 focus:outline-none focus:border-red-400 p-1 rounded-lg w-full"
              placeholder="Phone"
              name="phone"
              type="text"
            ></input>
          </div>
          <div className="md:flex md:space-x-4 space-y-4 md:space-y-0 mt-3 md:mt-0">
            <input
              onChange={handleChange}
              value={city}
              className="border-2 border-gray-300 focus:outline-none focus:border-red-400 p-1 rounded-lg  w-full"
              placeholder="City/District/Town"
              name="city"
              type="text"
              readOnly={true}
            ></input>
            <input
              onChange={handleChange}
              value={state}
              className="border-2 border-gray-300 focus:outline-none focus:border-red-400 p-1 rounded-lg  w-full"
              placeholder="State"
              name="state"
              type="text"
              readOnly={true}
            ></input>
          </div>
        </div>
      </div>

      {/* ORDER SUMMARY */}
      <div className=" w-full bg-gray-200 rounded-lg">
        <div className="bg-red-500 h-8 text-white flex items-center pl-2 rounded-t-lg">
          <p>Order Summary</p>
        </div>
        <div className="p-5 space-y-2">
          {Object.keys(items).map((k) => {
            return (
              <div
                key={items[k].desc}
                className="md:w-96 flex space-x-5 justify-between"
              >
                <p>{items[k].desc}</p>
                <p>₹{items[k].price}</p>
              </div>
            );
          })}
          <div className="md:w-96 flex justify-between border-y-2 border-gray-600 py-2">
            <p className="font-bold">Total</p>
            <p className="font-bold">₹{total}</p>
          </div>
          <div className="pt-5">
            <button
              onClick={initializePayments}
              disabled={disabled}
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
