import Link from "next/link";
import React from "react";
import Image from "next/image";

function MenTshirt() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-14 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Link
                href={"/"}
                className="block relative h-96 rounded-lg overflow-hidden"
              >
                <Image
                  width={200}
                  height={50}
                  alt="ecommerce"
                  className="object-cover object-top w-full h-full block"
                  src="https://images.bewakoof.com/t1080/women-s-black-dope-shit-typography-boyfriend-t-shirt-486586-1655749653-1.jpg"
                ></Image>
              </Link>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Bewakoof
                </h3>
                <h2 className="text-gray-900 title-font text-sm font-medium">
                  Mens Blue Gotham City Guardian Graphic ...
                </h2>
                <p className="mt-1">₹600.00</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MenTshirt;
