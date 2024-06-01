"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useState, useEffect } from "react";

const SigninForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("/");

  useEffect(() => {
    const callbackUrlParam = searchParams.get("callbackUrl");
    if (callbackUrlParam) {
      setCallbackUrl(callbackUrlParam);
    }
  }, [searchParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        router.push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("email or password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setError("email or password is incorrect");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="shadow-2xl rounded-md w-2/5">
        <div className="px-10 py-10">
          <h1 className="text-center mb-10 font-bold text-2xl">Login</h1>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <form onSubmit={handleSubmit}>
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
                {isLoading ? "Loading..." : "Login"}
              </button>
            </form>
            <p className="text-center">
              Don{"'"}t have an account? Register
              <Link href="/auth/register" className="text-blue-500">
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

export default SigninForm;
