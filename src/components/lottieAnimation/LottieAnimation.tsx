// components/LottieAnimation.tsx
import React from 'react';
// import Lottie from 'react-lottie';
import animationData from '../../../public/Animation - 1741457497962.json';
import dynamic from 'next/dynamic';


const LottieAnimation = () => {
  // Dynamically requiring the animation data
  const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

  const defaultOptions = {
    loop: true,
    autoplay: true, // Set to false if you want the animation to play only once
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} height={300} width={300} />;
};

export default LottieAnimation;
