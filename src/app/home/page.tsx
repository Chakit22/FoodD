"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { signOut, checkUser } = useAuth();
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

  const isLoggedIn = async () => {
    try {
      const user = await checkUser();
      return true;
    } catch (error) {
      console.error("Error", error);
      // Redorect to signIn page
      router.replace("/auth/signup");
      return false;
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <div className="flex gap-2 justify-between">
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
}
