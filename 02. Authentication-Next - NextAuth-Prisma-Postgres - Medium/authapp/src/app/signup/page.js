"use client";
import React, { useEffect, useState } from "react";

function SignIn() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [passError, setPassError] = useState(false);

  useEffect(() => {
    validatePassword(password, confirmPassword);
  }, [password, confirmPassword]);

  function validatePassword(pass, confirmPass) {
    const isValid = confirmPass === pass;
    if (!isValid) {
      setPassError(true);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };

    // Make call to backend to create user:
    const res = await fetch("http://localhost:3000/user/create", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log("[Signup Form] Response data:", data);

      // registration success
    } else {
      // registration faled
    }
  }
  return (
    <div className="m-auto flex items-center justify-center gap-4 p-3">
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        style={{ width: "400px" }}
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none`}
            id="name"
            type="text"
            placeholder="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none`}
            id="email"
            type="email"
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
            className={`focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none`}
            id="password"
            type="password"
            placeholder="***********"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="confirm-password"
          >
            Confirm Password
          </label>
          <input
            className={`focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none`}
            id="confirm-password"
            type="password"
            placeholder="***********"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          {passError && (
            <p className="text-xs italic text-red-500">
              Password do not match!
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline  rounded bg-blue-500 px-4 py-2  font-bold text-white  hover:bg-blue-700  focus:outline-none"
            type="submit"
          >
            Sign Up
          </button>
          <a
            className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
            href="#"
          >
            Have an account? Sign in
          </a>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
