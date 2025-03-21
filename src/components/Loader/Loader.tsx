// "use client";
// import React from "react";

// const Loader: React.FC = () => {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="relative w-16 h-16">
//         {/* Outer ripple */}
//         <div className="absolute inset-0 rounded-full border-4 border-orange-500 opacity-75 animate-ping"></div>
//         {/* Inner circle */}
//         <div className="absolute inset-0 rounded-full border-4 border-orange-500"></div>
//       </div>
//     </div>
//   );
// };

// export default Loader;
"use client";
import React from "react";

const CircleLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"
        style={{ animationDuration: "2s" }} // Rotates slowly (2 seconds per spin)
      ></div>
    </div>
  );
};

export default CircleLoader;
