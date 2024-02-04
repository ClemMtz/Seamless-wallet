"use client";

import Card from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import useStore from "@/store";
import { saveToken } from "@/utils/common";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMagic } from "../provider/magic-provider";

const Google = () => {
  const { token, setToken } = useStore();
  const { magic } = useMagic();
  const [isAuthLoading, setIsAuthLoading] = useState<string | null>(null);

  useEffect(() => {
    setIsAuthLoading(localStorage.getItem("isAuthLoading"));
  }, []);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        if (magic) {
          const result = await magic?.oauth.getRedirectResult();
          saveToken(result.magic.idToken, setToken, "SOCIAL");
          setLoadingFlag("false");
        }
      } catch (e) {
        console.log("social login error: " + e);
        setLoadingFlag("false");
      }
    };

    checkLogin();
  }, [magic, setToken]);

  const login = async () => {
    setLoadingFlag("true");
    await magic?.oauth.loginWithRedirect({
      provider: "google",
      redirectURI: window.location.origin,
    });
  };

  const setLoadingFlag = (loading: string) => {
    localStorage.setItem("isAuthLoading", loading);
    setIsAuthLoading(loading);
  };

  return (
    <>
      <Card>
        {isAuthLoading && isAuthLoading !== "false" ? (
          <Spinner />
        ) : (
          <div>
            <button
              className="social-login-button"
              onClick={() => {
                if (token.length == 0) login();
              }}
              disabled={false}
            >
              <Image
                src="/assets/Google.svg"
                alt="Google"
                height={24}
                width={24}
                className="mr-6"
              />
              <div className="text-xs font-semibold text-centerw-full">
                Continue with Google
              </div>
            </button>
          </div>
        )}
      </Card>
    </>
  );
};
export default Google;
