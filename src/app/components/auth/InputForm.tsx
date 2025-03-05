import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";

interface InputFormParams {
  label: string;
  inputId: string;
  inputType: string;
}

export default function InputForm({}: InputFormParams) {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
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
        <p className="text-red-400">{errors.password.message as string}</p>
      )}
    </div>
  );
}
