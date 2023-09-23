import Link from "next/link";
import React from "react";

function signUp() {
  return (
    <>
      <div className="flex justify-center">
        <div className="p-2 border my-16 bg-white rounded-lg shadow-lg md:w-1/2 md:p-5">
          <div className="space-y-3">
            <h1 className="text-2xl text-center font-bold md:text-3xl">
              Sign Up
            </h1>
            <p className="text-center font-semibold">
              Already have an account?{" "}
              <Link className="text-red-600" href={"/login"}>
                Sign in here
              </Link>
            </p>
          </div>
          <div className="flex items-center py-3 text-xs uppercase text-gray-400 before:mr-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ml-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 ">
            Or
          </div>
          <form action="" className="px-2 space-y-5 text-base md:text-lg">
            <div>
              <label className="block" for="name">
                Email address
              </label>
              <input
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

export default signUp;
