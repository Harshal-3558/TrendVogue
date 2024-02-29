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
    Password: yup
      .string()
      .matches(
        /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9]).{6,}$/,
        "Password must be at least 6 characters long and contain at least one special character",
      )
      .required(),
  })
  .required();

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    const { Email, Password } = data;
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email, Password }),
    });
    let res = await response.json();
    if (res.success == "true") {
      localStorage.setItem("token", res.token);
      toast.success("Your are successfully logged in", {
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
        router.push("/");
      }, 2002);
    } else if (res.error === "User not exist") {
      toast.error("User does not exist", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("Please enter valid details", {
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
        <div className="m-3 p-2 py-4 border my-16 bg-white rounded-lg shadow-lg w-full md:w-1/2 md:p-5">
          <div className="space-y-1 mb-3">
            <h1 className="text-2xl text-center font-bold md:text-3xl">
              Log In
            </h1>
            <p className="text-center font-semibold">
              New on TrendVogue ?{" "}
              <Link className="text-red-600" href={"/signUp"}>
                Sign up here
              </Link>
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            className="px-2 space-y-5 text-base md:text-lg"
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
            <div>
              <Link
                className="text-red-600 text-base font-bold"
                href={"/forgetPassword"}
              >
                Forgot your password ?
              </Link>
            </div>

            <button
              type="submit"
              className=" w-full p-2 text-base bg-red-500 text-white rounded-lg md:text-lg"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
