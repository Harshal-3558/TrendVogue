import Link from "next/link";
import { React } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    Email: yup.string().email().required(),
    Name: yup.string().required(),
    Password: yup
      .string()
      .matches(
        /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9]).{6,}$/,
        "Password must be at least 6 characters long and contain at least one special character",
      )
      .required(),
  })
  .required();

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    const { Email, Name, Password } = data;
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email, Name, Password }),
    });
    let res = await response.json();
    if (res.success) {
      toast.success("Your account is created", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2002);
    } else {
      toast.error("User already exist", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
        />
        <div className="m-3 p-2 py-3 border my-16 bg-white rounded-lg shadow-lg w-full md:w-1/2 md:p-5">
          <div className="space-y-1 mb-3 md:space-y-3">
            <h1 className="text-2xl text-center font-bold md:text-3xl">
              Sign Up
            </h1>
            <p className="text-center font-semibold">
              Already have an account?{" "}
              <Link className="text-red-600" href={"/login"}>
                Login here
              </Link>
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            className="px-2 space-y-3 md:space-y-5 text-base md:text-lg"
          >
            <div>
              <label className="block" htmlFor="name">
                Email address
              </label>
              <input
                placeholder="john@example.com"
                {...register("Email")}
                className="border-2 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <span className="text-sm text-red-500">
                {errors.Email?.message}
              </span>
            </div>
            <div>
              <label className="block" htmlFor="name">
                Name
              </label>
              <input
                placeholder="Enter name"
                {...register("Name")}
                className="border-2 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <span className="text-sm text-red-500">
                {errors.Name?.message}
              </span>
            </div>
            <div>
              <label className="block" htmlFor="name">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                {...register("Password")}
                className="border-2 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <span className="text-sm text-red-500">
                {errors.Password?.message}
              </span>
            </div>
            <button
              type="submit"
              className=" w-full p-2 text-base bg-red-500 text-white rounded-lg md:text-lg"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
