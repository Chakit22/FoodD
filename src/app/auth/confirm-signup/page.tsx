"use client";

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
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ConfirmSignUp() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");
  const [isResendButtonVisible, setIsResendButtonVisible] = useState<boolean>(
    false
  );
  const [timer, setTimer] = useState<number>(60);

  //    use form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { confirmSignUp, resendSignUpCode } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    console.log("form Data:", data);

    try {
      await confirmSignUp(email!, data.code);

      toast("User sucesfully signed Up!");

      // Navigate to signIn page
      router.replace("/auth/signin");
    } catch (error) {
      console.error("Error : ", error);
      toast.error(
        "Error signing up. Please check your code and try again later!"
      );
    }
  });

  const handleResendConfirmationCode = async () => {
    try {
      await resendSignUpCode(email!);

      toast("Check your email for confirmation Code!");

      // Disable resendConfirmationCode button
      setIsResendButtonVisible((prev) => !prev);
    } catch (error) {
      console.error("error", error);
      toast.error("Error signing up. Please Check your code and try again!");
    }
  };

  useEffect(() => {
    // console.log("timer!");
    if (timer == 0) {
      setIsResendButtonVisible((prev) => !prev);
      setTimer(60);
    } else if (!isResendButtonVisible) {
      const timer_ = setTimeout(() => setTimer((prev) => prev - 1), 1000);

      clearTimeout(timer_);
    }
  }, [timer, isResendButtonVisible]);

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Confirm Sign Up</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Verfification Code */}
        <div>
          <Label htmlFor="code">Verification Code</Label>
          <Input
            id="code"
            type="number"
            placeholder="Code"
            {...register("code", {
              required: "Code is required",
            })}
          />
          {errors.code && <p>{errors.code.message as string}</p>}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center gap-2">
        <button
          className="text-sm text-blue-300 hover:cursor"
          onClick={handleResendConfirmationCode}
          disabled={!isResendButtonVisible}
        >
          {isResendButtonVisible ? "Resend Code" : `Resend Code in ${timer}s`}
        </button>
        <Button onClick={onSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
