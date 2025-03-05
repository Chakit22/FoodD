import {
  AuthUser,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
  resetPassword,
} from "aws-amplify/auth";
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function checkUser() {
    try {
      const user = await getCurrentUser();
      console.log("user :");
      console.log(user);
      setIsAuthenticated(true);
      setUser(user);
    } catch (error) {
      console.error("Invalid session", error);
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }

  async function handleSignIn(email: string, password: string) {
    try {
      const { isSignedIn } = await signIn({ username: email, password });
      if (isSignedIn) {
        await checkUser();
      }
      return isSignedIn;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  }

  async function handleSignUp(email: string, password: string) {
    try {
      const { isSignUpComplete } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });
      return isSignUpComplete;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  }

  async function handleResetPassword() {
    try {
      // await res;
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  }

  return {
    isAuthenticated,
    user,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
  };
};
