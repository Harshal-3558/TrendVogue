import Link from "next/link";
import React from "react";
import Image from "next/image";
const mongoose = require("mongoose");
import product from "@/models/product";

function MenTshirt({ products }) {
  console.log(Object.keys(products));
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-14 mx-auto">
        <div className="flex flex-wrap -m-4">
          {Object.keys(products).map((items) => {
            return (
              <div key={items._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <Link
                  href={`/product/${products[items].slug}`}
                  className="block relative h-96 rounded-lg overflow-hidden"
                >
                  <Image
                    width={200}
                    height={50}
                    alt="ecommerce"
                    className="object-cover object-top w-full h-full block"
                    src={products[items].img}
                  ></Image>
                </Link>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {products[items].brand}
                  </h3>
                  <h2 className="text-gray-900 title-font text-sm font-medium">
                    {products[items].description}
                  </h2>
                  <p className="mt-1">₹{products[items].price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export async function getStaticProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await product.find();
  let tshirt = {};
  for (let items of products) {
    if (items.description in tshirt) {
      if (
        !tshirt[items.description].color.includes(items.color) &&
        items.available > 0
      ) {
        tshirt[items.description].color.push(items.color);
      }
      if (
        !tshirt[items.description].size.includes(items.size) &&
        items.available > 0
      ) {
        tshirt[items.description].size.push(items.size);
      }
    } else {
      tshirt[items.description] = JSON.parse(JSON.stringify(items)); // making a key = making whole as value
      if (items.available > 0) {
        tshirt[items.description].color = [items.color];
        tshirt[items.description].size = [items.size];
      }
    }
  }
  return { props: { products: JSON.parse(JSON.stringify(tshirt)) } };
}

export default MenTshirt;
