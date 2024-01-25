"use client";
import React from "react";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Writepost from "../components/Writepost";
export default function Page() {
  const noImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  const [user, setUser] = useState({});
  useEffect(() => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      credentials: "include",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`, requestOptions)
      .then(async (response) => {
        const userData = await response.json();
        setUser(userData);
      })
      .catch((error) => alert(JSON.stringify(error)));
  }, [setUser]);
  return (
    <section>
      <Sidebar loggedUser={user} />
      <div className="p-4 sm:ml-64 mt-14">
        <Writepost loggedUser={user}/>
      </div>
    </section>
  );
}
