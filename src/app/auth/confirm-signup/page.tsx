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
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ConfirmSignUp() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");
  //    use form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { confirmSignUp, resendSignUpCode } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    console.log("form Data:", data);

    // console.log("email");
    // console.log(email);

    try {
      await confirmSignUp(email!, data.code);

      toast("User sucesfully signed Up!");

      // Navigate to signIn page
      router.replace("/auth/signin");
    } catch (error) {
      console.error("Error : ", error);
      toast.error("Error signing up. Please try again later!");
    }
  });

  const handleResendConfirmationCode = async () => {
    try {
      await resendSignUpCode(email!);

      toast("Check your email for confirmation Code!");
    } catch (error) {
      console.error("error", error);
      toast.error("Error signing up. Please Check your code and try again!");
    }
  };

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Confirm Sign Up</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Verfification Code */}
        <div>
          <Label htmlFor="code">Verfification Code</Label>
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
        <div
          className="text-sm text-blue-300 hover:cursor"
          onClick={handleResendConfirmationCode}
        >
          Resend Code
        </div>
        <Button onClick={onSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
