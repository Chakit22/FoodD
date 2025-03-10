"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

export function Auth() {
  return (
    <Authenticator
      initialState="signUp" // Forces the initial view to be signup
      components={{
        Header() {
          return (
            <div className="text-center p-4">
              <h1 className="text-2xl font-bold">Create Account</h1>
            </div>
          );
        },
      }}
    >
      {({ user, signOut }) => (
        <div className="p-4 text-center">
          <h2 className="text-xl">Successfully signed up!</h2>
          <p>Welcome {user?.username}</p>
          <button
            onClick={signOut}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      )}
    </Authenticator>
  );
}
