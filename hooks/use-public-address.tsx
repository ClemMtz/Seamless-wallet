"use client";
import { useMagic } from "@/provider/magic-provider";
import { useEffect, useState } from "react";

export const usePublicAddress = () => {
  // const [publicAddress, setPublicAddress] = useState<string>("");
  const [publicAddress, setPublicAddress] = useState(
    localStorage.getItem("user")
  );

  const { magic } = useMagic();

  useEffect(() => {
    const checkPublicAddress = async () => {
      try {
        const metadata = await magic?.user.getInfo();
        if (metadata) {
          const userAddress = metadata.publicAddress;
          localStorage.setItem("user", userAddress as string);
          setPublicAddress(userAddress as string);
        }
      } catch (e) {
        console.error("Error in fetching address: " + e);
      }
    };

    checkPublicAddress();
  }, [magic]);

  return publicAddress;
};
