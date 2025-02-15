import validatePassword from "@/app/helpers/validatePassword";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import * as jose from "jose";

export async function POST(request: Request) {
  try {
    // Read data from request body
    const { identifier, password } = await request.json(); // `identifier` bisa berupa email atau username

    // Pastikan password valid
    if (!validatePassword(password)) {
      return Response.json(
        { error: "Invalid email/username or password" },
        { status: 400 }
      );
    }

    // Cari user berdasarkan email atau username
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) {
      return Response.json(
        { error: "Invalid email/username or password" },
        { status: 400 }
      );
    }

    // Bandingkan password (async)
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return Response.json(
        { error: "Invalid email/username or password" },
        { status: 400 }
      );
    }

    // Pastikan JWT secret tersedia
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    // Buat JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(user.id.toString())
      .sign(secret);

    // Kirim token sebagai respons
    return Response.json({ token: jwt });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
