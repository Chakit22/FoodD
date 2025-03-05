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

export default function ConfirmSignUp() {
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
      <CardFooter className="flex justify-end">
        <Button onClick={onSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
