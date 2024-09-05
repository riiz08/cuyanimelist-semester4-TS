"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { signIn } from "next-auth/react";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { SignUpForm } from "@/types/user";
import { signUpFormSchema } from "@/utils/validation";
import { Separator } from "../ui/separator";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const FormSignUp = () => {
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
  });
  const [inputPassword, setInputPassword] = useState("password");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("password");
  const router = useRouter();
  const { toast } = useToast();

  const handleButtonPassword = () => {
    if (inputPassword === "password") setInputPassword("text");
    if (inputPassword === "text") setInputPassword("password");
  };
  const handleButtonConfirmPassword = () => {
    if (inputConfirmPassword === "password") setInputConfirmPassword("text");
    if (inputConfirmPassword === "text") setInputConfirmPassword("password");
  };

  const handleSubmit = async (data: SignUpForm) => {
    try {
      const { email, name, password } = data;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_AUTH_BASE_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ email, name, password }),
        }
      );

      if (response.ok) {
        toast({
          variant: "default",
          title: "Success Sign UP",
          description: "Wait a second you will be redirect to dashboard page",
        });

        setTimeout(async () => {
          const login = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });

          if (login?.ok) router.push("/user/dashboard");
        }, 1500);
      } else {
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";

      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage || "An unexpected error occurred.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={inputPassword} {...field} />
                  <Button
                    onClick={handleButtonPassword}
                    className="absolute transition-all right-0 top-0"
                    variant={"ghost"}
                    type="button"
                    tabIndex={-1}
                  >
                    {" "}
                    {inputPassword === "password" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={inputConfirmPassword} {...field} />
                  <Button
                    onClick={handleButtonConfirmPassword}
                    className="absolute transition-all right-0 top-0"
                    variant={"ghost"}
                    type="button"
                    tabIndex={-1}
                  >
                    {" "}
                    {inputConfirmPassword === "password" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-sm mt-2">
          have account?{" "}
          <Link href={"/auth/signup"} className="underline underline-offset-2">
            Sign in here
          </Link>
        </p>

        <Button variant={"secondary"} type="submit" className="mt-4 w-full">
          Sign Up
        </Button>
      </form>

      <div className="mt-4 flex items-center">
        <Separator className="w-[50%]" />
        <p className="font-bold text-secondary-foreground text-sm">OR</p>
        <Separator className="w-[50%]" />
      </div>

      <Button onClick={() => signIn("github")} className="mt-2 w-full">
        <FaGithub className="mr-2" /> Sign up with Github
      </Button>
    </Form>
  );
};

export default FormSignUp;
