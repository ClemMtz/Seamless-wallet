// import { useEffect, useState } from "react";

// export const UsePublicAddress = () => {
//   const [publicAddress, setPublicAddress] = useState("");

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedUser = localStorage.getItem("user");
//       setPublicAddress(storedUser as string);
//     }
//   }, []);

//   return publicAddress;
// };

import { useState } from "react";

export const UsePublicAddress = () => {
  const [publicAddress, setPublicAddress] = useState(
    localStorage.getItem("user")
  );
  return publicAddress;
};
