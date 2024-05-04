"use client";
import React from "react";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

// Define form schema
const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be less than 100 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be less than 100 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;
const Page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Form submit handler
  const onSubmit: SubmitHandler<FormData> = async (values) => {
    if (values.password === values.confirmPassword) {
      try {
        const url: string =
          process.env.NEXT_PUBLIC_BASE_URL + "users/register" || "";
        const data = JSON.stringify({
          email: values.email,
          password: values.password,
        });
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        await axios.post(url, data, config).then((response) => {
          if (response.status === 201) {
            console.log("Account created successfully");
            router.push("/login");
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p className="lg:text-4xl underline space-y-10 ">Register</p>
      <div className="flex flex-col justify-center gap-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full items-center"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
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
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
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
                    <Input
                      placeholder="Enter your password again"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
            <div className="p-2">
              <p className="text-center text-sm">
                {"Already have an account? "}
                <a href="/login" className="text-blue-500">
                  Login
                </a>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
