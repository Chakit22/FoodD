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
import { useForm } from "react-hook-form";

export default function ResetPassword() {
  //    use form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   const { signIn } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    console.log("form Data:", data);

    try {
      //   await signIn(data.email, data.password);
    } catch (error) {
      console.error("Error : ", error);
    }
  });

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
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

        {/* New Password */}
        <div>
          <Label htmlFor="password">New Password</Label>
          <Input
            id="new_password"
            type="password"
            placeholder="New Password"
            {...register("new_password", {
              required: "New Password is required",
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
          {errors.new_password && (
            <p>{errors.new_password.message as string}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <Label htmlFor="confirm_new_password">Confirm New Password</Label>
          <Input
            id="confirm_new_password"
            type="password"
            placeholder="Confirm New Password"
            {...register("confirm_new_password", {
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
          {errors.confirm_new_password && (
            <p>{errors.confirm_new_password.message as string}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
