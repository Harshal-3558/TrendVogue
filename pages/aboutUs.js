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
            src="https://avatars.githubusercontent.com/u/139840722?v=4"
            alt=""
          ></Image>

          <div class="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
           

            <h1 class="text-2xl font-semibold text-gray-800  lg:text-3xl lg:w-96">
              Help us improve our productivity
            </h1>

            <p class="max-w-lg mt-6 text-gray-500  ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Tempore quibusdam ducimus libero ad tempora doloribus expedita
              laborum saepe voluptas perferendis delectus assumenda rerum, culpa
              aperiam dolorum, obcaecati corrupti aspernatur a.
            </p>

            <h3 class="mt-6 text-lg font-medium text-blue-500">Harshal Patil</h3>
            <p class="text-gray-600 ">Student at Pillai College of Engineering</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default aboutUs;
