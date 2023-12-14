import Link from "next/link";
import { React, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  function handleChange(e) {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
  }
  async function handleSubmit(e) {
    console.log(email);
    e.preventDefault();
    const data = { email };
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await response.json();
    if (res.success == true) {
      toast.success("Check your mail for reset link", {
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
    setEmail("");
  }
  return (
    <>
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
        <div className="p-2 border my-16 bg-white rounded-lg shadow-lg w-80 md:w-1/2 md:p-5">
          <div className="md:space-y-3">
            <h1 className="text-2xl text-center font-bold md:text-3xl">
              Forgot Password
            </h1>
            <p className="text-center font-semibold">
              Or{" "}
              <Link className="text-red-600" href={"/login"}>
                Login
              </Link>
            </p>
          </div>
          <form method="POST" className="px-2 space-y-5 text-base md:text-lg">
            <div>
              <label className="block" htmlFor="name">
                Email address
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="name"
                placeholder="john@example.com"
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className=" w-full p-2 text-base bg-red-500 text-white rounded-lg md:text-lg"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
