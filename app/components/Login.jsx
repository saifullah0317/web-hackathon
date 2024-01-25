"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Branding from "./Branding";
import Message from "./Message";
export default function Login() {
    const router=useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  function doLogin() {
    if(!email || !password){
        setAlert({
            type:"Error",
            message:"Please enter credentials to login."
        })
    }
    else{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          email,
          password,
        });
    
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
          credentials: "include",
        };
    
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, requestOptions)
          .then(async (response) => {
            const data = await response.json();
            if(data.token){
                router.push("/dashboard");
            }
            else{
                setAlert({type:"Error", message:JSON.stringify(data)});
            }
            console.log("data: ",data);
          })
          .catch((error) => {
            setAlert({ type: "Error", message: error });
          });
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
              Login to your account
            </span>
            <div />
          </div>
          <div class="relative z-0 w-64 mb-5 group">
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
          <div className="text-sm text-blue-700 font-medium mt-5 flex justify-between">
            <div />
            <span>Forgot password?</span>
            <div />
          </div>
          <div className="flex items-center justify-between mt-14">
            <button className="text-blue-700 font-semibold">
              Create account
            </button>
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={doLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
