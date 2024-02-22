import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo1.png";
import React, { useEffect } from "react";
import {
  FaMagnifyingGlass,
  FaCircleUser,
  FaCartShopping,
  FaBars,
  FaXmark,
  FaHouse,
  FaUser,
  FaBoxOpen,
  FaGear,
  FaArrowRightFromBracket,
  FaBagShopping,
} from "react-icons/fa6";
import { useRef, useState } from "react";
import SearchBar from "./SearchBar";

export default function Navbar({ user, logout, cart, itemDB, name }) {
  const [drop, setDrop] = useState(false);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    if (user) {
      setProduct(itemDB);
    } else {
      setProduct(cart);
    }
  }, [cart, itemDB, user]);

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
              <Image className="w-full" src={logo} alt="logo" />
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
                href="/aboutUs"
              >
                About Us
              </Link>
              <Link
                className="hover:text-red-600 hover:underline underline-offset-8 decoration-2"
                href="/aboutUs"
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
          <div className="hidden md:flex justify-center w-96">
            <SearchBar/>
          </div>

            {/* Login & Logout */}
            {user ? (
              <div>
                <FaCircleUser
                  className="hidden md:block text-3xl hover:text-red-500 cursor-pointer"
                  onClick={toggleDropdown}
                />
                <FaCircleUser className="md:hidden text-3xl ms-12 hover:text-red-500 cursor-pointer" />
              </div>
            ) : (
              <Link href="/login">
                <button className="bg-red-500 px-6 py-1 text-lg text-white rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300">
                  Login
                </button>
              </Link>
            )}

            {/* Dropdown Menu */}
            {drop && (
              <div className="bg-red-100 absolute top-16 right-5 rounded-lg shadow-2xl shadow-gray-400 h-36 w-44 text-lg p-4 space-y-2">
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
            {Object.keys(product).length !== 0 ? (
              <span className="absolute top-3 right-2 md:top-4 md:right-3 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            ) : (
              ""
            )}
            <Link href={"/cart"}>
              <FaCartShopping className="text-3xl hover:text-red-500 cursor-pointer" />
            </Link>
          </div>
        </div>
        <div className="flex justify-center md:hidden">
          <SearchBar/>
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
            src="https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0"
            width={1200}
            height={500}
            alt=""
          />
          <p>{user ? name : "Log In"}</p>
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
          <Link href={user ? "/account" : "/login"} onClick={toggleCart}>
            <div className="flex space-x-3 items-center p-3 hover:bg-gray-200 rounded-lg">
              <FaUser />
              <span>My Account</span>
            </div>
          </Link>

          <Link href={user ? "/myOrders" : "/login"} onClick={toggleCart}>
            <div className="flex space-x-3 items-center p-3 hover:bg-gray-200 rounded-lg">
              <FaBoxOpen />
              <span>My Orders</span>
            </div>
          </Link>
          <Link
            href={user ? "/" : "/login"}
            onClick={() => {
              logout();
            }}
          >
            <div className="flex space-x-3 items-center p-3 hover:bg-gray-200 rounded-lg">
              <FaArrowRightFromBracket />
              <span>{user ? "Log Out" : "Log In"}</span>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
