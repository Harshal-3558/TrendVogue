import Image from "next/image";
import React from "react";

function account() {
  return (
    <div className="bg-slate-100 py-12 flex justify-center">
      <div className="border rounded-lg p-5 shadow-xl bg-white space-y-8 w-[1000px]">
        <div>
          <p className="text-2xl font-extrabold">Profile</p>
          <p>Manage your name, password and account settings.</p>
        </div>
        <form className="space-y-6">
          <div className="flex space-x-6 items-center">
            <p className="font-bold w-36">Profile Photo</p>
            <div className="flex items-center space-x-4">
              <Image
                className="object-cover w-20 h-20 rounded-full"
                width={1200}
                height={500}
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100"
                alt=""
              />
              <input
                type="file"
                className=" h-12  px-3 py-2 mt-2 text-sm text-gray-600 bg-white border-2 border-slate-300 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full  placeholder-gray-400/70  focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40"
              />
            </div>
          </div>

          <div className="flex space-x-6 items-center">
            <p className="font-bold w-36">Full Name</p>
            <input
              className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-2 rounded-lg w-1/2"
              placeholder="Full Name"
            ></input>
          </div>

          <div className="flex space-x-6 items-center">
            <p className="font-bold w-36">Email</p>
            <input
              className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-2 rounded-lg w-1/2"
              placeholder="Email"
            ></input>
          </div>

          <div className="flex space-x-6 items-center">
            <p className="font-bold w-36">Password</p>
            <input
              className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-2 rounded-lg w-1/2"
              placeholder="Password"
            ></input>
          </div>

          <div className="flex space-x-6 items-center">
            <p className="font-bold w-36">New Password</p>
            <input
              className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-2 rounded-lg w-1/2"
              placeholder="New Password"
            ></input>
          </div>
          <div className="flex justify-end space-x-4">
            <button className="bg-red-500 mt-6 md:mt-0 px-5 py-2 text-white text-sm rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300">
              Save Changes
            </button>

            <button className="bg-white mt-6 md:mt-0 px-5 py-2 text-black border-2 text-sm rounded-lg hover:bg-slate-100 focus:outline-none focus:ring focus:ring-slate-300">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default account;
