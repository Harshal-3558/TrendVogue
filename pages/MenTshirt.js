import Link from "next/link";
import React from "react";
import Image from "next/image";

function MenTshirt({ products }) {
  console.log(products);
  return (
    <>
      {/* <section className="text-gray-600 body-font">
        <div className="container px-5 py-14 mx-auto">
          <div className="flex flex-wrap -m-4">
            {products.map((items) => {
              return (
                <div key={items._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <Link
                    href={`/product/${items.slug}`}
                    className="block relative h-96 rounded-lg overflow-hidden"
                  >
                    <Image
                      width={200}
                      height={50}
                      alt="ecommerce"
                      className="object-cover object-top w-full h-full block"
                      src={items.img}
                    ></Image>
                  </Link>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {items.brand}
                    </h3>
                    <h2 className="text-gray-900 title-font text-sm font-medium">
                      {items.description}
                    </h2>
                    <p className="mt-1">₹{items.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}
    </>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("http://localhost:3000/api/getProduct");
//   const products = await res.json();
//   return { props: products };
// }

export default MenTshirt;
