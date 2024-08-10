"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Image from 'next/image';
import { useSearchParams } from "next/navigation";
import Link from 'next/link'

export default function Form() {
    const { register, handleSubmit, formState, reset } = useForm();
    const { errors } = formState;
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || "/";

    const onSubmit = async (data: any) => {
        try {
            await signIn("credentials", {
                redirect: true,
                callbackUrl,
                email: data.email,
                password: data.password,
            });
            reset();
        } catch (error) {
            console.error("Network response was not ok");
        }
    };

    const handleGoogleSubmit = () => {
        signIn("google", { callbackUrl, redirect: true });
    };

    return (
        <div className="flex justify-center mx-6 my-12 mt-36 lg:grid grid-cols-2">
            <div className="hidden lg:block ">
                <h1></h1>
            </div>
            <div className="container w-[70%] xl:w-[70%]">
                <h1 className="text-3xl font-bold text-center mb-4 text-[#25324B]">Welcome Back</h1>
                <div onClick={handleGoogleSubmit} className="border border-[#CCCCF5] w-full h-12 flex gap-4 justify-center items-center hover:cursor-pointer">
                    <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={24} height={24} />
                    Continue in with Google
                </div>
                <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                    <div className="h-px w-full bg-slate-200"></div>
                    OR
                    <div className="h-px w-full bg-slate-200"></div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="border rounded-md w-full h-12 border-[#CCCCF5] p-2"
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
                            className="border rounded-md w-full h-12 border-[#CCCCF5] p-2"
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
                    <button
                        type="submit"
                        className="border w-full rounded-3xl h-12 bg-[#4640DE] text-white font-semibold my-4"
                    >
                        Continue
                    </button>
                    <div>
                        Don’t have an account? <Link href="/auth/signup"><span className="text-[#4640DE] font-semibold">Sign Up</span></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
