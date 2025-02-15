import validateEmail from "@/app/helpers/validateEmail";
import validatePassword from "@/app/helpers/validatePassword";
import validateUsername from "@/app/helpers/validateUsername";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  // Read data off req body
  const body = await request.json();
  const { username, email, password } = body;

  // 🔹 Validate username
  if (!validateUsername(username)) {
    return Response.json(
      { 
        error:
          "*Username must be between 3-16 characters (letters, numbers, and underscores only).",
      },
      { status: 400 }
    );
  }

  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUsername) {
    return Response.json(
      { error: "*Username is already taken. Please choose another one." },
      { status: 400 }
    );
  }

  // 🔹 Validate email
  if (!validateEmail(email)) {
    return Response.json(
      { error: "*Invalid email format. Example: user@example.com" },
      { status: 400 }
    );
  }

  // 🔹 Validate password
  if (!validatePassword(password)) {
    return Response.json(
      {
        error:
          "*Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
      },
      { status: 400 }
    );
  }

  // 🔹 Hash password
  const hash = bcrypt.hashSync(password, 8);

  // 🔹 Check if email is already registered
  const existingUserEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUserEmail) {
    return Response.json(
      { error: "*Email is already registered. Please use a different email." },
      { status: 400 }
    );
  }

  // 🔹 Create user in the database
  await prisma.user.create({
    data: {
      username,
      email,
      password: hash,
    },
  });

  // 🔹 Return success response
  return Response.json(
    { message: "Account successfully created!" },
    { status: 201 }
  );
}
