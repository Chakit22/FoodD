"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useAuth } from "../hooks/useAuth";
import React, { FormEvent } from "react";

interface SignUpFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignUpForm extends HTMLFormElement {
  readonly elements: SignUpFormElements;
}

export function Auth() {
  const { isAuthenticated, user, loading, signIn, signUp, signOut } = useAuth();

  async function handleSubmit(event: FormEvent<SignUpForm>) {
    event.preventDefault();
    const form = event.currentTarget;
    // ... validate inputs
    await signIn(form.elements.email.value, form.elements.password.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" name="email" />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" />
      <input type="submit" />
    </form>
  );
}
