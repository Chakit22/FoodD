"use client";

import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../../hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { useUser } from "@/components/User-Provider";
import axios from "axios";

export default function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const { signUp } = useAuth();

  const { setUser } = useUser();

  const onSubmit = handleSubmit(async (data) => {
    console.log("Form data : ", data);

    try {
      // SignUp
      await signUp(data.email, data.password);

      // Sent confirmation code on email
      toast("Check your email for confirmation Code!");

      // Set the user
      setUser({
        firstName: data.first_name,
        lastName: data.last_name,
        phone: data.phone,
        email: data.email,
        role: "user",
      });

      // Add the user into the user's database
      await axios.post("/api/users", {
        firstName: data.first_name,
        lastName: data.last_name,
        phone: data.phone,
        email: data.email,
        role: "user",
      });

      // Navigate to the new page using router
      router.replace(`/auth/confirm-signup?email=${data.email}`);
    } catch (error) {
      console.error("error", error);

      // No current user
      setUser(null);

      toast.error("Error signing up. Please try again later!");
    }
  });

  return (
    <Card className="p-2">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-center gap-4">
          {/* First Name */}
          <div className="flex flex-col gap-2 justify-center">
            <Label htmlFor="firstName" className="text-bold">
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="First Name"
              {...register("first_name", {
                required: "First Name is required",
                minLength: {
                  value: 3,
                  message: "First Name must be at least 3 characters",
                },
              })}
            />
            {errors.first_name && (
              <p className="text-red-400">
                {errors.first_name.message as string}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2 justify-center">
            <Label htmlFor="lastName" className="text-bold">
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Last Name"
              {...register("last_name", { required: "Last Name is required!" })}
            />
            {errors.last_name && (
              <p className="text-red-400">
                {errors.last_name.message as string}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 justify-center">
            <Label htmlFor="email" className="text-bold">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required!",
              })}
            />
            {errors.email && (
              <p className="text-red-400">{errors.email.message as string}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 justify-center">
            <Label htmlFor="password" className="text-bold">
              Password
            </Label>
            <div className="flex justify-between gap-2 items-center relative">
              <Input
                id="password"
                type={isPasswordVisible ? "password" : "text"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                })}
              />
              <div onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                {isPasswordVisible ? (
                  <FaEye className="absolute top-1/2 transform -translate-y-1/2 right-3" />
                ) : (
                  <FaEyeSlash className="absolute top-1/2 transform -translate-y-1/2 right-3" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-400">
                {errors.password.message as string}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2 justify-center">
            <Label htmlFor="confirm_password" className="text-bold">
              Confirm Password
            </Label>
            <Input
              id="confirm_password"
              placeholder="Confirm Password"
              type="password"
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: (value, formValues) => {
                  // console.log(value);
                  // console.log(formValues.password);
                  if (value !== formValues.password) {
                    return "Passwords do not match!";
                  }
                },
              })}
            />
            {errors.confirm_password && (
              <p className="text-red-400">
                {errors.confirm_password.message as string}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center gap-2">
        <div className="text-sm">
          Already have an account ?{" "}
          <span>
            <Link href={"/auth/signin"} replace={true}>
              Sign In
            </Link>
          </span>
        </div>
        <Button onClick={onSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
