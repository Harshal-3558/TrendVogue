import Link from "next/link";
import { React, useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  function handleChange(e) {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const data = { email, password };
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await response.json();
    console.log(res);
    if (res.success == "true") {
      localStorage.setItem("token", res.token);
      toast.success("Your are successfully logged in", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        router.push("/");
      }, 2002);
    } else if (res.error === "User not exist") {
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
    } else {
      toast.error("Please enter valid details", {
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
        <div className="m-3 p-2 py-4 border my-16 bg-white rounded-lg shadow-lg w-full md:w-1/2 md:p-5">
          <div className="space-y-1 mb-3">
            <h1 className="text-2xl text-center font-bold md:text-3xl">
              Log In
            </h1>
            <p className="text-center font-semibold">
              New on TrendVogue ?{" "}
              <Link className="text-red-600" href={"/signUp"}>
                Sign up here
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
                id="name"
                placeholder="john@example.com"
                className="border-2 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
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
                id="name"
                placeholder="Password"
                className="border-2 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <Link
                className="text-red-600 text-base font-bold"
                href={"/forgetPassword"}
              >
                Forgot your password ?
              </Link>
            </div>

            <button
              type="submit"
              className=" w-full p-2 text-base bg-red-500 text-white rounded-lg md:text-lg"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
