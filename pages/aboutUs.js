import React from "react";
import Image from "next/image";

function aboutUs() {
  return (
    <section class="bg-white ">
      <div class="container px-6 py-10 mx-auto">
        <div class="lg:-mx-6 lg:flex lg:items-center">
          <Image
            width={1200}
            height={500}
            class="object-cover object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[36rem]"
            src="https://images.unsplash.com/photo-1586880244406-556ebe35f282?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          ></Image>

          <div class="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
            <h1 class="text-2xl font-semibold text-gray-800  lg:text-3xl lg:w-96">
              Our Journey: From Passion to Purpose
            </h1>

            <p class="max-w-lg mt-6 text-gray-500  ">
              Welcome to TrendVogue! We’re not just another online store;
              we’re a community of dreamers, doers, and fashion enthusiasts. Our
              story began with a simple idea: to curate stylish, high-quality
              products that inspire confidence and elevate everyday moments.
              Whether you’re seeking timeless elegance or bold statements, we’ve
              got you covered. But it’s not just about what we sell; it’s about
              who we are. We’re the late-night brainstormers, the perfectionists
              behind every pixel, and the believers in making shopping an
              experience. So go ahead, explore our collections, and join us on
              this fashionable journey. Because at TrendVogue, style
              isn’t just a choice—it’s a statement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default aboutUs;
