import React, { useEffect, useState } from "react";
import { FaCircleCheck, FaTruck, FaMoneyCheck,FaReceipt,FaCube,FaTruckFast,FaCheck  } from "react-icons/fa6";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
// import { Stepper, Step, Button, Typography } from "@material-tailwind/react";

export default function SuccessOrder({ itemDB }) {
  const router = useRouter();
  const { session_id } = router.query;
  const [order, setOrder] = useState("");
  const [Transaction, setTransaction] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  // const [activeStep, setActiveStep] = React.useState(0);
  // const [isLastStep, setIsLastStep] = React.useState(false);
  // const [isFirstStep, setIsFirstStep] = React.useState(false);

  // const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 2);
  // const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    async function Transaction() {
      const item = localStorage.getItem("token");
      const decoded = await jwtDecode(item);
      const response2 = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/postTransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session_id, decoded }),
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
    }
    Transaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <div className="bg-gray-200 ">
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

      {/*<div className="w-full px-24 py-4">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step onClick={() => setActiveStep(0)}>
            <FaReceipt  className="h-5 w-5" />
            <div className="absolute -bottom-[3rem] w-max text-center">
              <Typography
                variant="h5"
                color={activeStep === 0 ? "blue-gray" : "gray"}
              >
                Order Received
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(1)}>
            <FaCube  className="h-5 w-5" />
            <div className="absolute -bottom-[3rem] w-max text-center">
              <Typography
                variant="h5"
                color={activeStep === 0 ? "blue-gray" : "gray"}
              >
                Processed
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(2)}>
            <FaTruckFast  className="h-5 w-5" />
            <div className="absolute -bottom-[3rem] w-max text-center">
              <Typography
                variant="h5"
                color={activeStep === 0 ? "blue-gray" : "gray"}
              >
                Shipped
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(3)}>
            <FaCheck className="h-5 w-5" />
            <div className="absolute -bottom-[3rem] w-max text-center">
              <Typography
                variant="h5"
                color={activeStep === 0 ? "blue-gray" : "gray"}
              >
                Package Delivered
              </Typography>
            </div>
          </Step>
        </Stepper>
        <div className="mt-32 flex justify-between">
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
          <Button onClick={handleNext} disabled={isLastStep}>
            Next
          </Button>
        </div>
      </div>*/}
    </div>
  );
}
