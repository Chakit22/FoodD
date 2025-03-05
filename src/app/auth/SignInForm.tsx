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
import { useForm } from "react-hook-form";

export default function SignInForm() {
  //    use form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    console.log("form Data:", data);

    try {
      await signIn(data.email, data.password);
    } catch (error) {
      console.error("Error : ", error);
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
          <Label htmlFor="password">Email</Label>
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
          {errors.password && <p>{errors.password.message as string}</p>}
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link href={{
            pathname: "/auth/reset-password",
            query: {email: }
          }}>Forgot password</Link>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
