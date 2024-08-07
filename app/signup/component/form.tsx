"use client";
import { useState } from "react";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";

import Image from "next/image";


import Otp from "@/app/otp/page";


export default function Form() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const [email, setEmail] = useState<string | null>(null);
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("https://akil-backend.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          role: "User",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
      setEmail(data.email); // Store the email
      setIsSignupSuccessful(true); // Set signup success state
      reset(); 
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleGoogleSubmit = () => {
    console.log("Google login");
  };

  if (isSignupSuccessful && email) {
    return <Otp email={email} />; // Render OTP component if signup is successful
  }

  return (
    <div className="flex justify-center ">
      <div className="pt-12 w-[720px] flex flex-col justify-center  gap-4">
        <h1 className="text-3xl font-bold w-[80%]  text-center mb-6 text-[#25324B]">
          Sign Up Today!
        </h1>
        <div
          onClick={handleGoogleSubmit}
          className="border border-[#CCCCF5] w-[80%] h-12 flex gap-4 justify-center items-center hover:cursor-pointer"
        >
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={24}
            height={24}
          />
          Continue with Google
        </div>
        <div className="flex w-[80%] items-center gap-2 py-6 text-sm text-slate-600">
          <div className="h-px w-full bg-slate-200"></div>
          OR
          <div className="h-px w-full bg-slate-200"></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-[80%]">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              className="border rounded-md   h-12 border-[#CCCCF5] p-2"
              {...register("name", {
                required: {
                  value: true,
                  message: "Full name is required",
                },
              })}
            />
            <p style={{ color: "red" }}>{errors.name?.message?.toString()}</p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="border rounded-md  h-12 border-[#CCCCF5] p-2"
              {...register("email", {
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid",
                },
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
            />
            <p style={{ color: "red" }}>{errors.email?.message?.toString()}</p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="border rounded-md   h-12 border-[#CCCCF5] p-2"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
            <p style={{ color: "red" }}>
              {errors.password?.message?.toString()}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="border rounded-md   h-12 border-[#CCCCF5] p-2"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirm password is required",
                },
              })}
            />
            <p style={{ color: "red" }}>
              {errors.confirmPassword?.message?.toString()}
            </p>
          </div>
          <button type="submit" className="border w-full rounded-3xl h-12 bg-[#4640DE] text-white font-semibold my-4" >
            Send
          </button>
        </form>
        <div>
          Already have an account?{" "}
          <span className="text-[#2D298E] font-semibold">Sign In</span>
        </div>
        <div className="w-[80%]">
          By clicking Continue, you agree to our{" "}
          <span className="text-[#2D298E] font-semibold">Terms of Service</span>{" "}
          and <span className="text-[#2D298E] font-semibold">Privacy Policy</span>
        </div>
      </div>
    </div>
  );
}