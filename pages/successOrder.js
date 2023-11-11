import React, { useEffect, useState } from "react";
import { FaCircleCheck, FaTruck, FaMoneyCheck } from "react-icons/fa6";
import { useRouter } from "next/router";

export default function SuccessOrder({ cart }) {
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/postTransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session_id, cart }),
        }
      );
      let res = await response.json();
      setOrder(res.order._id);
      setTransaction(res.order.TransactionID);
      setAddress(res.order.address);
      setAmount(res.order.amount);
      const timestamp = res.order.updatedAt;
      const dateOnly = new Date(timestamp).toISOString().split("T")[0];
      setDate(dateOnly);
    }
    Transaction();
  }, [router.isReady]);

  return (
    <div className="bg-slate-200 ">
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
          <div className="flex items-center space-x-3 bg-slate-400 p-2 rounded-t-lg">
            <FaTruck className="text-3xl text-red-600" />
            <p className="font-semibold">Shipping Address</p>
          </div>
          <div className="p-2">
            <p>{address}</p>
          </div>
        </div>

        <div className="w-96 bg-white rounded-lg">
          <div className="flex items-center space-x-3 bg-slate-400 p-2 rounded-t-lg">
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
          <div className="flex items-center space-x-3 bg-slate-400 p-2 rounded-t-lg">
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
    </div>
  );
}
