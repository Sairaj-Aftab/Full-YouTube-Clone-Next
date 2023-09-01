"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import profileImg from "@/public/profile.jpg";
import { BiDislike, BiLike } from "react-icons/bi";
import Comments from "../Comments";
import ProfileDescSection from "../ProfileDescSection";

function LeftSide() {
  return (
    <>
      <video
        // ref={ref}
        src="./video.mp4"
        autoPlay={true}
        controls={true}
        className="w-full"
      ></video>
      {/* Profile and Title Section */}
      <h1 className="px-2 sm:px-0 line-clamp-2 text-lg md:text-2xl font-semibold text-white">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum
        delectus, quia cupiditate, cumque consequatur quisquam ducimus, aliquid
        repellendus repudiandae reprehenderit aspernatur? Qui
      </h1>
      {/* Profile and Description Section */}
      <ProfileDescSection />
      {/* Comment Section */}
      <Comments />
    </>
  );
}

export default LeftSide;
