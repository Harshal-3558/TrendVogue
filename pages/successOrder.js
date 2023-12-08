import React, { useEffect, useState } from "react";
import { FaCircleCheck, FaTruck, FaMoneyCheck } from "react-icons/fa6";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

export default function SuccessOrder({ user, clearCart }) {
  const router = useRouter();
  const { session_id } = router.query;
  const [order, setOrder] = useState("");
  const [Transaction, setTransaction] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    async function Transaction() {
      let data;
      if (user) {
        const item = localStorage.getItem("token");
        const decoded = await jwtDecode(item);
        data = { session_id, decoded, user: true };
      } else {
        data = { session_id, user: false };
      }
      const response2 = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/postTransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      let res2 = await response2.json();
      setOrder(res2.order._id);
      setTransaction(res2.order.TransactionID);
      setAddress(res2.order.address);
      setAmount(res2.order.amount);
      const timestamp = res2.order.updatedAt;
      const dateOnly = new Date(timestamp).toISOString().split("T")[0];
      setDate(dateOnly);
      clearCart();
    }
    Transaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <div className="bg-gray-200 py-4">
      <div className="py-4 flex justify-center">
        <div className="space-y-5">
          <div className="flex justify-center">
            <FaCircleCheck className="text-9xl text-green-500" />
          </div>
          <h1 className="text-4xl font-extrabold">
            Your Order Placed Successfully
          </h1>
        </div>
      </div>
      <div className="flex justify-center space-x-8 py-7">
        <div className="w-96 bg-white rounded-lg">
          <div className="flex items-center space-x-3 bg-gray-400 p-2 rounded-t-lg">
            <FaTruck className="text-3xl text-red-600" />
            <p className="font-semibold">Shipping Address</p>
          </div>
          <div className="p-2">
            <p>{address}</p>
          </div>
        </div>

        <div className="w-96 bg-white rounded-lg">
          <div className="flex items-center space-x-3 bg-gray-400 p-2 rounded-t-lg">
            <FaMoneyCheck className="text-3xl text-red-600" />
            <p className="font-semibold">Order Details</p>
          </div>
          <div className="p-2 space-y-2">
            <div className="flex justify-between">
              <p>Order ID</p>
              <p>{order}</p>
            </div>
            <div className="flex justify-between">
              <p>Order Date</p>
              <p>{date}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Order Status</p>
              <p className="bg-green-500 px-3 py-1 rounded-2xl">Delivered</p>
            </div>
          </div>
        </div>

        <div className="w-96 bg-white rounded-lg">
          <div className="flex items-center space-x-3 bg-gray-400 p-2 rounded-t-lg">
            <FaMoneyCheck className="text-3xl text-red-600" />
            <p className="font-semibold">Payment Details</p>
          </div>
          <div className="p-2 space-y-2">
            <div className="flex justify-between">
              <p>Payment Mode</p>
              <p>Card</p>
            </div>
            <div className="flex justify-between">
              <p>Transaction ID</p>
              <p className="w-44 overflow-clip">{Transaction}....</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Total Amount</p>
              <p>₹ {amount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="m-2 flex justify-center">
        <Link href={"/"}>
          <button className="bg-red-500 py-2 px-4 text-xl rounded-lg text-white hover:bg-red-400">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
