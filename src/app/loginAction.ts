"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function loginAction(
  currentState: unknown,
  formData: FormData
): Promise<string> {
  const identifier = formData.get("identifier"); // Bisa username atau email
  const password = formData.get("password");

  const res = await fetch(process.env.ROOT_URL + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier, password }), // Kirim identifier
  });

  const json = await res.json();

  if (res.ok) {
    (await cookies()).set("Authorization", json.token, {
      secure: true,
      httpOnly: true,
      expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
      path: "/",
      sameSite: "strict",
    });

    redirect("/dashboard");
  } else {
    return json.error;
  }
}
