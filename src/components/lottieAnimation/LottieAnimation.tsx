'use client'
import React from 'react';
import animationData from '../../../public/Animation - 1741457497962.json';
import dynamic from 'next/dynamic';


const LottieAnimation = () => {
  const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} height={300} width={300} />;
};

export default LottieAnimation;
