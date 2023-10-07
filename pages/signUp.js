import Link from "next/link";
import { React, useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  function handleChange(e) {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const data = { email, name, password };
    const response = await fetch("http://localhost:3000/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await response.json();
    console.log(res);
    if (res.success === "Success") {
      toast.success("Your account is created", {
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
    setName("");
    setPassword("");
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
        <div className="p-2 border my-16 bg-white rounded-lg shadow-lg md:w-1/2 md:p-5">
          <div className="space-y-3">
            <h1 className="text-2xl text-center font-bold md:text-3xl">
              Sign Up
            </h1>
            <p className="text-center font-semibold">
              Already have an account?{" "}
              <Link className="text-red-600" href={"/login"}>
                Login here
              </Link>
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="px-2 space-y-5 text-base md:text-lg"
          >
            <div>
              <label className="block" for="name">
                Email address
              </label>
              <input
                onChange={handleChange}
                value={email}
                type="email"
                name="email"
                id="email"
                placeholder="john@example.com"
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block" for="name">
                Name
              </label>
              <input
                onChange={handleChange}
                value={name}
                type="text"
                name="name"
                id="name"
                placeholder="Enter name"
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block" for="name">
                Password
              </label>
              <input
                onChange={handleChange}
                value={password}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="flex space-x-2 items-center">
              <input type="checkbox" className="w-4 h-4 accent-red-500 " />
              <p className="">
                I accept the{" "}
                <a className="text-red-600" href="www.google.com">
                  Terms and Conditions
                </a>
              </p>
            </div>
            <button
              type="submit"
              className=" w-full p-2 text-base bg-red-500 text-white rounded-lg md:text-lg"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
