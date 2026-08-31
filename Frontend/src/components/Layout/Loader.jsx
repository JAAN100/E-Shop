import React from 'react'
import { useLottie } from "lottie-react";
import animationData from "../../assets/animations/Shopping-Cart-Loader.json";

export default function Loader() {
  return (
    <div>
      <Success />
    </div>
  )
}


const Success = () => {
  const options = {
    animationData,
    loop: false,
    autoplay: true,
  };

  const { View } = useLottie(options); // no style arg needed

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-[300px] h-[300px] mx-auto">{View}</div>
    </div>
  );
};