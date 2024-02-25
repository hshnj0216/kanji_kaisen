import { useState, useEffect } from "react";
import axios from "axios";
import MainMenu from "@/app/_components/MainMenu";

const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <MainMenu></MainMenu>
    </div>
  )
}

export default Home;