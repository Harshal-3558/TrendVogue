import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

function Account({  }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [prePassword, setPrePassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [executionCount, setExecutionCount] = useState(0);

  useEffect(() => {
    const getUserDetails = async () => {
      const item = localStorage.getItem("token");
      const decoded = await jwtDecode(item);
      setEmail(decoded.email);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/getUserDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );
      const res = await response.json();
      const value = await res.Users[0];
      if (value) {
        setAddress(value.address);
        setPhone(value.phone);
        setName(value.name);
      }
    };
    if (executionCount < 5) {
      getUserDetails();
      setExecutionCount(executionCount + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executionCount]);

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "pre_password") {
      setPrePassword(e.target.value);
    } else if (e.target.name == "new_password") {
      setNewPassword(e.target.value);
    }
  };

  const changePassword = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, prePassword, newPassword }),
    });
    const res = await response.json();
    console.log(res)
  };

  const initiateChange = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/updateUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, address, phone }),
      },
    );
    const res = await response.json();
  };
  return (
    <div className="bg-slate-100 py-12 flex justify-center">
      <div className="border rounded-lg p-5 shadow-xl bg-white space-y-12 w-[1000px]">
        {/*Heading*/}
        <div>
          <p className="text-2xl font-extrabold">Account Settings</p>
          <p>Manage your name, password and account settings.</p>
        </div>
        <div className="space-y-6">
          {/*Profile Details*/}
          <div className="space-y-4">
            <div>
              <p className="text-xl font-extrabold">1. Profile Details</p>
            </div>
            <div className="flex space-x-6 items-center">
              <p className="font-bold w-36">Full Name</p>
              <input
                onChange={handleChange}
                value={name}
                type="text"
                name="name"
                className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-2 rounded-lg w-1/2"
                placeholder="Full Name"
              ></input>
            </div>

            <div className="flex space-x-6 items-center">
              <p className="font-bold w-36">Email</p>
              <input
                value={email}
                disabled
                className="disabled:bg-slate-50 disabled:text-slate-500 border-2 border-slate-300 focus:outline-none focus:border-red-400 p-2 rounded-lg w-1/2"
                placeholder="Email"
              ></input>
            </div>

            <div className="flex space-x-6 items-center">
              <p className="font-bold w-36">Address</p>
              <textarea
                onChange={handleChange}
                value={address}
                rows="5"
                cols="20"
                type="textarea"
                name="address"
                className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-2 rounded-lg w-1/2"
                placeholder="Full Name"
              ></textarea>
            </div>

            <div className="flex space-x-6 items-center">
              <p className="font-bold w-36">Phone</p>
              <input
                onChange={handleChange}
                value={phone}
                type="text"
                name="phone"
                className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-2 rounded-lg w-1/2"
                placeholder="Phone"
              ></input>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={initiateChange}
                className="bg-red-500 mt-6 md:mt-0 px-7 py-2 text-white text-base rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/*Change Password*/}
          <div className="space-y-4">
            <div>
              <p className="text-xl font-extrabold">2. Change Password</p>
            </div>

            <div className="flex space-x-6 items-center">
              <p className="font-bold w-36">Password</p>
              <input
                onChange={handleChange}
                type="password"
                name="pre_password"
                className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-2 rounded-lg w-1/2"
                placeholder="Enter your previous password"
              ></input>
            </div>

            <div className="flex space-x-6 items-center">
              <p className="font-bold w-36">New Password</p>
              <input
                className="border-2 border-slate-300 focus:outline-none focus:border-red-400 p-2 rounded-lg w-1/2"
                placeholder="Enter your new password"
              ></input>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={changePassword}
                className="bg-red-500 mt-6 md:mt-0 px-7 py-2 text-white text-base rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
