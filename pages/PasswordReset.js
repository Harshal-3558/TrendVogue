import { useRouter } from "next/router";
import { React, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PasswordReset() {
  const router = useRouter();
  const token = router.query.token;
  const [password, setPassword] = useState("");
  function handleChange(e) {
    if (e.target.name == "cpassword") {
      setPassword(e.target.value);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const data = { token, password };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/forgotPassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    let res = await response.json();
    if (res.success == true) {
      toast.success("Password reseted successfully", {
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
      toast.error("User does not exist", {
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
    setPassword("");
  }
  return (
    <div className="flex justify-center">
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
      <div className="p-2 border my-16 bg-white rounded-lg shadow-lg space-y-3 md:space-y-0 w-80 md:w-1/2 md:p-5">
        <div className="space-y-3">
          <h1 className="text-2xl text-center font-bold md:text-3xl">
            Reset your password
          </h1>
        </div>
        <form method="POST" className="px-2 space-y-5 text-base md:text-lg">
          <div>
            <label className="block" htmlFor="name">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block" htmlFor="name">
              Confirm password
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="cpassword"
              id="cpassword"
              placeholder="Confirm your password"
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className=" w-full p-2 text-base bg-red-500 text-white rounded-lg md:text-lg"
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
}
