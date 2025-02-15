"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logoutAction() {
  (await cookies()).set("Authorization", "", {
    expires: new Date(0),
    path: "/",
  });

  redirect("/");
}
