import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, password } = data;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      const passwordHash = await hash(password, 12);
      const newUser = await prisma.user.upsert({
        where: {
          email,
        },
        update: {
          email,
        },
        create: {
          email,
          password: passwordHash,
        },
      });
      return NextResponse.json({
        message: "success user created!",
      });
    }
    if (user)
      return NextResponse.json({
        message: "user cannot using duplicated email",
      });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return NextResponse.json(
      { message: "error", error: errorMessage },
      { status: 400 }
    );
  }
}
