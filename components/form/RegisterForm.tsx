"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      password: form.password.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.ok) {
      const responseData = await result.json();

      if (responseData.status) {
        form.reset();
        setIsLoading(false);
        setError("");
        router.push("/auth/login");
      } else {
        setError(responseData.message);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="shadow-2xl rounded-md w-2/5">
        <div className="px-10 py-10">
          <h1 className="text-center mb-10 font-bold text-2xl">Register</h1>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label htmlFor="fullname" className="font-semibold">
                  Fullname:
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  required
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                  placeholder="Enter your fullname"
                ></input>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-semibold">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                  placeholder="Enter your email"
                ></input>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="font-semibold">
                  Phone:
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                  placeholder="Enter your phone"
                ></input>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="font-semibold">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                  placeholder="Enter your password"
                ></input>
              </div>
              <button
                type="submit"
                className="w-full my-10 bg-blue-500 rounded text-white py-2 hover:bg-blue-400"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>
            <p className="text-center">
              Have an Account? Sign in
              <Link href="/auth/login" className="text-blue-500">
                {" "}
                here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
