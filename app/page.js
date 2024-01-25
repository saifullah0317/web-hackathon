"use client"
import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useSearchParams } from "next/navigation";
export default function Home() {
  const searchParams = useSearchParams();
  const create = searchParams.get("create");
  console.log("env: ",process.env.NEXT_APP_CLOUD_NAME);
  return (
    <div>
      {/* <Navbar /> */}
      {create?(<Signup/>):(<Login/>)}

    </div>
  );
}
