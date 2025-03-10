"use client";
import { useUser } from "@/app/components/User-Provider";
import { useAuth } from "@/app/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignInForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    watch,
  } = useForm();

  const emailEntered: string = watch("email");

  const { signIn } = useAuth();

  const { setEmail } = useUser();

  const onSubmit = handleSubmit(async (data) => {
    console.log("form Data:", data);

    try {
      await signIn(data.email, data.password);

      // Set the email property in the provider
      setEmail(data.email);

      toast("User sucesfully signed In");

      // Navigate to the main page
      router.replace("/home");
    } catch (error) {
      console.error("Error : ", error);
      toast.error("Incorrect Username or password!");
      resetField("password");
    }
  });

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Email ID */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && <p>{errors.email.message as string}</p>}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && <p>{errors.password.message as string}</p>}
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link
            href={`/auth/reset-password?email=${emailEntered}`}
            className="text-blue-400"
            replace={true}
          >
            Forgot password
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center">
        <div className="text-sm">
          New User ?{" "}
          <span>
            <Link href={"/auth/signup"} replace={true}>
              Sign Up
            </Link>
          </span>
        </div>
        <Button onClick={onSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
