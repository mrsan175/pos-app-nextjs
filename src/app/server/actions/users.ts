"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signupAction(
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

  if (res.ok) {
    redirect("/");
  } else {
    return json.error;
  }
}

export async function logoutAction() {
  (await cookies()).set("Authorization", "", {
    expires: new Date(0),
    path: "/",
  });

  redirect("/");
}

export async function loginAction(
  currentState: unknown,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
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

    return { success: true, message: "Login berhasil!" };
  } else {
    return {
      success: false,
      message: json.error || "Terjadi kesalahan saat login.",
    };
  }
}
