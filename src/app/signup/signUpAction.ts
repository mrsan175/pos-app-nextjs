"use server";

import { redirect } from "next/navigation";

export default async function signupAction(
  currentState: unknown,
  formData: FormData
): Promise<string> {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch(process.env.ROOT_URL + "/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const json = await res.json();
  console.log(json);

  if (res.ok) {
    redirect("/");
  } else {
    return json.error;
  }
}
