"use client";
import React from "react";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Writepost from "../components/Writepost";
import Viewpost from "../components/Viewpost";
export default function Page() {
  const [posts, setPosts] = useState([]);
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

    var myHeaders1 = new Headers();
    var requestOptions1 = {
      method: "GET",
      headers: myHeaders1,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/socialpost/all`,
      requestOptions1
    )
      .then(async (response) => {
        const postsData=await response.json();
        setPosts(postsData);
      })
      .catch((error) => console.log("error", error));
  }, [setUser, setPosts]);
  return (
    <section>
      <Sidebar loggedUser={user} />
      <div className="p-4 sm:ml-64 mt-14">
        <Writepost loggedUser={user} />
        {
          posts.map((post,index)=>(
            <div key={index}>
            <Viewpost
              title={post.title}
              content={post.content}
              image={post.image}
              username={user.name}
              profileimage={user.image}
            />
            </div>
          ))
        }
      </div>
    </section>
  );
}
