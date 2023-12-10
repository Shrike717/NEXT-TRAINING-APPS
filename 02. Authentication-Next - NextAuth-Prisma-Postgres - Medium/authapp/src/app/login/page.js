"use client";
import React, { useEffect, useState } from "react";
// import { validateEmail } from "../../lib/utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailInPutError, setEmailInputError] = useState(false);
  const [passwordInPutError, setPasswordInputError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // validate();
  }, [email, password]);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`,
      redirect: false,
    });

    if (res?.ok) {
      // toast success
      console.log("success");
      return;
    } else {
      // Toast failed
      setError("Failed! Check you input and try again.");
      // return;
      console.log("Failed", res);
    }
    return res;
  }

  //   function validate() {
  //     const emailIsValid = validateEmail(email);

  //     if (!emailIsValid) {
  //       setEmailInputError(true);
  //       return;
  //     }
  //     if (password.length < 6) {
  //       setPasswordInputError(true);
  //     } else {
  //       setEmailInputError(false);
  //       setPasswordInputError(false);
  //     }
  //   }
  return (
    <div className="m-auto flex items-center justify-center p-3">
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        style={{ width: "400px" }}
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`border-${
              emailInPutError ? "red-500" : ""
            } focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none`}
            id="email"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={` border-${
              passwordInPutError ? "red-500" : ""
            } focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none`}
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p className="text-xs italic text-red-500">
            Please choose a password.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline  rounded bg-blue-500 px-4 py-2  font-bold text-white  hover:bg-blue-700  focus:outline-none"
            type="submit"
            disabled={!!isLoading}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>
          <a
            className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
