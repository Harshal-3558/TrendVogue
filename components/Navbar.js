import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo1.png";
import {
  FaMagnifyingGlass,
  FaCircleUser,
  FaCartShopping,
  FaBars,
  FaXmark,
  FaHouse,
  FaUser,
  FaHeart,
  FaBoxOpen,
  FaTicket,
  FaGear,
  FaArrowRightFromBracket,
  FaBagShopping,
} from "react-icons/fa6";
import { useRef, useState } from "react";

export default function Navbar({ user, logout }) {
  const [drop, setDrop] = useState(false);
  function toggleDropdown() {
    if (!drop) {
      setDrop(true);
    } else {
      setDrop(false);
    }
  }
  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains("-translate-x-full")) {
      ref.current.classList.remove("-translate-x-full");
    } else {
      ref.current.classList.add("-translate-x-full");
    }
  };
  return (
    <>
      {/* Navbar */}
      <div className="p-3 bg-white sticky top-0 shadow-2xl text-2xl md:p-4 z-30">
        <div className="pb-2 flex justify-between items-center md:justify-between md:pb-0">
          <div className="flex justify-center space-x-3 items-center md:hidden">
            <div>
              <FaBars onClick={toggleCart} />
            </div>
            <div>
              <Image className="h-8 w-full" src={logo} alt="logo" />
            </div>
          </div>
          <div className="flex space-x-16 items-center">
            <div className="hidden md:block">
              <Image className="h-8 w-full" src={logo} alt="logo" />
            </div>
            <div className="hidden md:block md:space-x-4 md:text-lg md:font-semibold md:pt-1">
              <Link
                className="hover:text-red-600 hover:underline underline-offset-8 decoration-2"
                href="/"
              >
                Home
              </Link>
              <Link
                className="hover:text-red-600 hover:underline underline-offset-8 decoration-2"
                href="/MenTshirt"
              >
                About Us
              </Link>
              <Link
                className="hover:text-red-600 hover:underline underline-offset-8 decoration-2"
                href="/WomenTshirt"
              >
                Customer Service
              </Link>
              <Link
                className="hover:text-red-600 hover:underline underline-offset-8 decoration-2"
                href="/contact"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="flex space-x-5 items-center">
            <div className="hidden md:flex">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="search for products..."
                className="border-2 border-red-600 rounded-l-md text-lg focus:outline-none p-1 w-80"
              />
              <button className="bg-red-600 py-1 px-2 rounded-r-md focus:outline-none focus:ring focus:ring-red-300">
                <FaMagnifyingGlass />
              </button>
            </div>

            {/* Login & Logout */}
            {user.value ? (
              <FaCircleUser
                className="text-3xl hover:text-red-500 cursor-pointer"
                onClick={toggleDropdown}
              />
            ) : (
              <Link href="/login">
                <button className="bg-red-500 px-6 py-1 text-lg text-white rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300">
                  Login
                </button>
              </Link>
            )}

            {/* Dropdown Menu */}
            {drop && (
              <div className="absolute top-16 right-5 rounded-lg shadow-2xl shadow-gray-400 h-44 w-44 text-lg p-4 space-y-2 bg-slate-200">
                <Link
                  href={"/account"}
                  className="flex space-x-3 items-center hover:text-red-500 cursor-pointer"
                >
                  <FaUser />
                  <p>My Account</p>
                </Link>
                <Link
                  href={"/myOrders"}
                  className="flex space-x-3 items-center hover:text-red-500 cursor-pointer"
                >
                  <FaBagShopping />
                  <p>My Orders</p>
                </Link>
                <div className="flex space-x-3 items-center hover:text-red-500 cursor-pointer">
                  <FaGear />
                  <p>Settings</p>
                </div>
                <div
                  className="flex space-x-3 items-center hover:text-red-500 cursor-pointer"
                  onClick={() => {
                    toggleDropdown();
                    logout();
                  }}
                >
                  <FaArrowRightFromBracket />
                  <p>Log Out</p>
                </div>
              </div>
            )}
            <Link href={"/cart"}>
              <FaCartShopping className="text-3xl hover:text-red-500 cursor-pointer" />
            </Link>
          </div>
        </div>
        <div className="flex justify-center md:hidden">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search for products..."
            className="border-2 border-red-600 rounded-l-md text-lg focus:outline-none p-1 w-full"
          />
          <button className="bg-red-600 py-1 px-2 rounded-r-md focus:outline-none focus:ring focus:ring-red-300">
            <FaMagnifyingGlass />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        ref={ref}
        className="sidebar flex flex-col space-y-6 h-screen w-72 bg-white border-e-4 fixed top-0 left-0 z-40 py-6 text-xl font-bold transform transition-transform duration-300 -translate-x-full"
      >
        <div className="flex flex-col items-center justify-center space-y-3 mt-4">
          <Image
            className="object-cover w-24 h-24 rounded-full ring ring-gray-300"
            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            width={1200}
            height={500}
            alt=""
          />
          <p>Tom Cruise</p>
          <FaXmark
            onClick={toggleCart}
            className="fa-solid fa-xmark absolute top-0 right-3 text-3xl"
          />
        </div>
        <div className="px-5">
          <Link href={"/"} onClick={toggleCart}>
            <div className="flex space-x-3 items-center p-3 hover:bg-gray-200 rounded-lg">
              <FaHouse />
              <span>Home</span>
            </div>
          </Link>
          <div className="flex space-x-3 items-center p-3 hover:bg-gray-200 rounded-lg">
            <FaUser />
            <span>My Account</span>
          </div>
          <div className="flex space-x-3 items-center p-3 hover:bg-gray-200 rounded-lg">
            <FaBoxOpen />
            <span>My Orders</span>
          </div>
          <div className="flex space-x-3 items-center p-3 hover:bg-gray-200 rounded-lg">
            <FaGear />
            <span>Settings</span>
          </div>
          <div className="flex space-x-3 items-center p-3 hover:bg-gray-200 rounded-lg">
            <FaArrowRightFromBracket />
            <span>Log Out</span>
          </div>
        </div>
      </aside>
    </>
  );
}
