import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";

const schema = yup
  .object({
    Name: yup.string().required(),
    Email: yup.string().email().required(),
    Address: yup.string().required(),
    Phone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number should be of 10 digits")
      .required(),
    Pincode: yup
      .number()
      .min(100000, "Pincode should be of 6 digits")
      .max(999999, "Pincode should be of 6 digits")
      .required(),
  })
  .required();

export default function Orders({ cart, total, saveDataCart, user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [items, setItems] = useState("");
  const [userExist, setUserExist] = useState(false);
  const router = useRouter();
  const value = useRef(null);

  const handleChange = async (e) => {
    setValue("Pincode", e);
    if (e.length == 6) {
      let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
      let pinJSON = await pins.json();
      if (Object.keys(pinJSON).includes(e)) {
        const array = pinJSON[e];
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
  };

  const onSubmit = async (data) => {
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
      const { Email, Address } = data;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/preTransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items,
            email: Email,
            address: Address,
            userExist,
          }),
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
  };

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
          value.current = await res.Users[0];
        };
        getUserDetails();
      }
    };
    getCartItems();
  }, [items, email, cart, user, saveDataCart, setValue]);

  useEffect(() => {
    if (value.current) {
      setValue("Name", value.current.name);
      setValue("Email", value.current.email);
      setValue("Phone", value.current.phone);
      setValue("Address", value.current.address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.current, setValue]);

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
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* DELIVERY ADDRESS */}
        <div className="h-90 w-full bg-gray-200 rounded-lg">
          <div className="bg-red-500 h-8 text-white flex items-center pl-2 rounded-t-lg">
            <p>Delivery Address</p>
          </div>
          <div className="p-5 md:space-y-3">
            <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
              <div className="w-full">
                <input
                  {...register("Name")}
                  className="border-2 border-gray-300 focus:outline-none focus:border-red-400 p-1 rounded-lg w-full"
                  placeholder="Name"
                />
                <span className="text-sm text-red-500">
                  {errors.Name?.message}
                </span>
              </div>
              <div className="w-full">
                <input
                  {...register("Email")}
                  className="border-2 border-gray-300 focus:outline-none focus:border-red-400 p-1 rounded-lg w-full"
                  placeholder="Email"
                />
                <span className="text-sm text-red-500">
                  {errors.Email?.message}
                </span>
              </div>
            </div>
            <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
              <div className="w-full my-4 md:my-0">
                <textarea
                  {...register("Address")}
                  className="w-full p-1 border-2 border-gray-300 focus:outline-none focus:border-red-400 rounded-lg"
                  rows="5"
                  cols="33"
                  placeholder="Address (Area and Street)"
                />
                <span className="text-sm text-red-500">
                  {errors.Address?.message}
                </span>
              </div>
            </div>
            <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
              <div className="w-full">
                <input
                  {...register("Pincode", {
                    onChange: (e) => {
                      handleChange(e.target.value);
                    },
                  })}
                  className="border-2 border-gray-300 focus:outline-none focus:border-red-400 p-1 rounded-lg w-full"
                  placeholder="Pincode"
                />
                <span className="text-sm text-red-500">
                  {errors.Pincode?.message}
                </span>
              </div>
              <div className="w-full">
                <input
                  {...register("Phone")}
                  className="border-2 border-gray-300 focus:outline-none focus:border-red-400 p-1 rounded-lg w-full"
                  placeholder="Phone"
                />
                <span className="text-sm text-red-500">
                  {errors.Phone?.message}
                </span>
              </div>
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
              />
              <input
                onChange={handleChange}
                value={state}
                className="border-2 border-gray-300 focus:outline-none focus:border-red-400 p-1 rounded-lg  w-full"
                placeholder="State"
                name="state"
                type="text"
                readOnly={true}
              />
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
          </div>
        </div>

        {/*Submit Button*/}
        <button
          type="submit"
          className="disabled:bg-red-400 bg-red-500 px-5 py-2 text-white text-base rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300"
        >
          Proceed for Payment
        </button>
      </form>
    </div>
  );
}
