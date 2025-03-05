"use client";

import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    console.log("Form data : ", data);

    try {
      // SignUp
      await signUp(data.email, data.password);
    } catch (error) {
      console.error("error", error);
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
            <Input
              id="password"
              type="password"
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
      <CardFooter className="flex flex-col items-center justify-center">
        <div className="text-sm">Already have an account ? </div>
        <Button onClick={onSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
