import React from "react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaCheck, FaXmark } from "react-icons/fa6";

function MyOrders({}) {
  const [products, setProducts] = useState("");
  useEffect(() => {
    const getOrder = async () => {
      const item = localStorage.getItem("token");
      const decoded = await jwtDecode(item);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/getOrders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(decoded),
        },
      );
      const res = await response.json();

      setProducts(res.order);
    };

    getOrder();
  }, []);

  return (
    <div className="my-8">
      <div className="ml-20 text-3xl font-bold text-red-500">Your Orders</div>
      <section className="container px-4 mx-auto">
        <div className="flex flex-col">
          <div className="mx-4 my-2 sm:mx-6 lg:mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Order ID</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right "
                      >
                        Date
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right "
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right "
                      >
                        Products Purchased
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right "
                      >
                        Total Amount
                      </th>

                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {Object.keys(products).map((items) => {
                      const timestamp = products[items].updatedAt;
                      const dateOnly = new Date(timestamp)
                        .toISOString()
                        .split("T")[0];
                      const item = products[items].products;

                      return (
                        <tr key={items.orderID}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700  whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <span>{products[items]._id}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {dateOnly}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {products[items].status == "paid" ? (
                              <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                                <FaCheck />
                                <h2 className="text-sm font-bold">
                                  {products[items].status}
                                </h2>
                              </div>
                            ) : (
                              <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60">
                                <FaXmark />
                                <h2 className="text-sm font-bold">
                                  {products[items].status}
                                </h2>
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            <div className="flex items-center gap-x-2">
                              <div className="space-y-2">
                                {Object.keys(item).map((i) => {
                                  return (
                                    <div
                                      key={item[i].price}
                                      className="flex items-center space-x-6"
                                    >
                                      <Image
                                        className="rounded-lg"
                                        src={item[i].img}
                                        width={40}
                                        height={0}
                                        alt=""
                                      />
                                      <h2 className="text-sm font-medium text-gray-800 ">
                                        {item[i].desc}
                                      </h2>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            ₹ {products[items].amount}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyOrders;
