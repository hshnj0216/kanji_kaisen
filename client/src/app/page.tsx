"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import MainMenu from "@/app/_components/MainMenu";

const Home = () => {
  return (
    <div className="flex justify-center items-center border border-purple-300 ">
      <MainMenu></MainMenu>
    </div>
  )
}

export default Home;