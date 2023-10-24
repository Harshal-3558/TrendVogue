import React from "react";
import Head from "next/head";
import Script from "next/script";

export default function orders({
  user,
  cart,
  total,
  addCart,
  clearCart,
  removeFromCart,
}) {
  const initiatePayment = async() => {
    // Get a transaction token
    const data = {cart,total}
   
  const response = await fetch(`${NEXT_PUBLIC_HOST}/api/preTransaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), 
  });
  let a = await response.json();
  console.log(a)

    let amount;
    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: Math.random() /* update order id */,
        token: "" /* update token value */,
        tokenType: txnToken,
        amount: amount /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    // initialze configuration using init method
    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
  };
  return (
    <div className="p-4 space-y-4">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        src={`${process.env.PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.PAYTM_MID}.js`}
        onload="onScriptLoad();"
        crossorigin="anonymous"
      />
      {/* DELIVERY ADDRESS */}
      <div className="h-90 w-full bg-slate-200 rounded-lg">
        <div className="bg-red-500 h-8 text-white flex items-center pl-2 rounded-t-lg">
          <p>DELIVERY ADDRESS</p>
        </div>
        <div className="p-5 md:space-y-3">
          <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
            <input
              className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-1 rounded-lg w-full"
              placeholder="Pincode"
            ></input>
            <input
              className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-1 rounded-lg w-full"
              placeholder="Locality"
            ></input>
          </div>
          <div className="mt-4 md:my-0">
            <textarea
              className="w-full p-1 border-2 border-slate-300 focus:outline-none focus:border-red-400 rounded-lg"
              rows="5"
              cols="33"
              placeholder="Address (Area and Street)"
            ></textarea>
          </div>
          <div className="md:flex md:space-x-4 space-y-4 md:space-y-0 mt-3 md:mt-0">
            <input
              className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-1 rounded-lg  w-full"
              placeholder="City/District/Town"
            ></input>
            <select className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-1 rounded-lg w-full">
              <option value="">--Select State--</option>
              <option value="dog">Maharashtra</option>
              <option value="cat">Gujrat</option>
              <option value="hamster">Kerla</option>
              <option value="parrot">Karnataka</option>
              <option value="spider">Uttar Pradesh</option>
              <option value="goldfish">Tamil Nadu</option>
            </select>
          </div>
          <div className="md:flex md:space-x-4 space-y-4 md:space-y-0 mt-3 md:mt-0">
            <input
              className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-1 rounded-lg w-full"
              placeholder="Landmark (Optional)"
            ></input>
            <input
              className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-1 rounded-lg w-full"
              placeholder="Alternate Phone (Optional)"
            ></input>
          </div>
          <button className="bg-red-500 mt-6 md:mt-0 px-5 py-2 text-white text-sm rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300">
            SAVE AND DELIVER HERE
          </button>
        </div>
      </div>

      {/* ORDER SUMMARY */}
      <div className=" w-full bg-slate-200 rounded-lg">
        <div className="bg-red-500 h-8 text-white flex items-center pl-2 rounded-t-lg">
          <p>ORDER SUMMARY</p>
        </div>
        <div className="p-5 space-y-2">
          {Object.keys(cart).map((k) => {
            return (
              <div
                key={cart[k].desc}
                className="md:w-96 flex space-x-5 justify-between"
              >
                <p>{cart[k].desc}</p>
                <p>₹{cart[k].price}</p>
              </div>
            );
          })}
          <div className="md:w-96 flex justify-between border-y-2 border-slate-600 py-2">
            <p className="font-bold">Total</p>
            <p className="font-bold">₹{total}</p>
          </div>
          <div className="pt-5">
            <button
              onClick={initiatePayment}
              className="bg-red-500 px-5 py-2 text-white text-sm rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300"
            >
              PAYMENT TRANSACTION
            </button>
          </div>
        </div>
      </div>

      {/* PAYMENT OPTION */}
      {/* <div className=" w-full bg-slate-200 rounded-lg">
        <div className="bg-red-500 h-8 text-white flex items-center pl-2 rounded-t-lg">
          <p>PAYMENT OPTION</p>
        </div>
      </div> */}
    </div>
  );
}
