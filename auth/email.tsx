"use client";

import Spinner from "@/components/ui/spinner";
import showToast from "@/utils/show-toast";
import { RPCError, RPCErrorCode } from "magic-sdk";
import { useMagic } from "../provider/magic-provider";

import Card from "@/components/ui/card";
import FormInput from "@/components/ui/form-input";
import useStore from "@/store";
import { saveToken } from "@/utils/common";
import { useState } from "react";

const EmailOTP = () => {
  const { token, setToken } = useStore();
  const { magic } = useMagic();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isLoginInProgress, setLoginInProgress] = useState(false);

  const handleLogin = async () => {
    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setEmailError(true);
    } else {
      try {
        setLoginInProgress(true);
        setEmailError(false);
        const account = await magic?.auth.loginWithEmailOTP({
          email,
          showUI: true,
        });
        if (account) {
          saveToken(account, setToken, "EMAIL");
          setEmail("");
        }
      } catch (e) {
        console.log("login error: " + JSON.stringify(e));
        if (e instanceof RPCError) {
          switch (e.code) {
            case RPCErrorCode.MagicLinkFailedVerification:
            case RPCErrorCode.MagicLinkExpired:
            case RPCErrorCode.MagicLinkRateLimited:
            case RPCErrorCode.UserAlreadyLoggedIn:
              showToast({ message: e.message, type: "error" });
              break;
            default:
              showToast({
                message: "Something went wrong. Please try again",
                type: "error",
              });
          }
        }
      } finally {
        setLoginInProgress(false);
      }
    }
  };

  return (
    <>
      <Card>
        <div>
          <FormInput
            onChange={(e) => {
              if (emailError) setEmailError(false);
              setEmail(e.target.value);
            }}
            placeholder={token.length > 0 ? "Already logged in" : "Email"}
            value={email}
          />
          {emailError && <span className="error">Enter a valid email</span>}
          <button
            className="login-button"
            disabled={
              isLoginInProgress ||
              (token.length > 0 ? false : email.length == 0)
            }
            onClick={() => handleLogin()}
          >
            {isLoginInProgress ? <Spinner /> : "Log in / Sign up"}
          </button>
        </div>
      </Card>
    </>
  );
};

export default EmailOTP;
