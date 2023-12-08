import Link from "next/link";
import { React } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function forgetPassword() {
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
              Forgot Password
            </h1>
            <p className="text-center font-semibold">
              Or{" "}
              <Link className="text-red-600" href={"/signUp"}>
                Login
              </Link>
            </p>
          </div>
          <form method="POST" className="px-2 space-y-5 text-base md:text-lg">
            <div>
              <label className="block" for="name">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="name"
                placeholder="john@example.com"
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <button
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

export default forgetPassword;
