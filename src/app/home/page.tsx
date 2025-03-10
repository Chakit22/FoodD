"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../components/User-Provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Home() {
  const { signOut } = useAuth();
  const { email } = useUser();
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut();

      //   Router to signup page
      router.replace("/auth/signup");
    } catch (error) {
      console.error("Error during signing out!", error);
      toast.error("Error during signing out. Please try again later!");
    }
  };

  return (
    <div className="flex gap-2 justify-between">
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
}
