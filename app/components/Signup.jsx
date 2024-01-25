"use client";
import React from "react";
import Branding from "./Branding";
import Message from "./Message";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadImage from "./UploadImage";
export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const [buttontext, setButtontext] = useState("next");

  function register() {
    if (buttontext == "next") {
      if (!email || !password || !confirmpassword || !firstname) {
        setAlert({
          type: "Error",
          message: "Please fill all required fields.",
        });
      } else if (password != confirmpassword) {
        setAlert({
          type: "Error",
          message: "You have not confirmed the password correctly",
        });
      } else {
        setButtontext("Sign up");
      }
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        email,
        password,
        name: firstname + " " + lastname,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include",
      };

      fetch("http://localhost:8000/auth/signup", requestOptions)
        .then(async (response) => {
          const data = await response.json();
          if (data.token) {
            router.push("/dashboard");
          } else {
            setAlert({ type: "Error", message: JSON.stringify(data) });
          }
        })
        .catch((error) =>
          setAlert({
            type: "Error",
            message: JSON.stringify(error),
          })
        );
    }
  }
  return (
    <div>
      <div className={alert.type ? "" : "hidden"}>
        <Message type={alert.type} message={alert.message} />
      </div>
      <div className="h-screen flex items-center justify-center">
        <div class="shadow-xl w-fit px-5 py-5 mx-auto rounded-lg">
          <div className="flex items-center justify-between">
            <div />
            <Branding />
            <div />
          </div>
          <div className="flex justify-between mt-2 mb-14">
            <div />
            <span className="text-lg font-medium text-blue-700">
              Create new account
            </span>
            <div />
          </div>
          {/* form */}
          <div className={buttontext == "next" ? "" : "hidden"}>
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="floating_password"
                id="floating_password"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <label
                for="floating_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="repeat_password"
                id="floating_repeat_password"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={confirmpassword}
                onChange={(e) => {
                  setConfirmpassword(e.target.value);
                }}
                required
              />
              <label
                for="floating_repeat_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm password
              </label>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                  required
                />
                <label
                  for="floating_first_name"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  First name
                </label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="floating_last_name"
                  id="floating_last_name"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                  required
                />
                <label
                  for="floating_last_name"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Last name
                </label>
              </div>
            </div>
          </div>
          {/* form */}
          {/* upload image */}
          <div className={"space-y-3 "+(buttontext == "next" ? "hidden" : "")}>
            <span className="text-gray-500">Upload profile photo (optional)</span>
            <UploadImage />
          </div>
          {/* upload image */}
          <div className="flex items-center justify-between mt-10">
            <button className="text-blue-700 font-semibold">
              Login instead
            </button>
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={register}
            >
              {buttontext}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
