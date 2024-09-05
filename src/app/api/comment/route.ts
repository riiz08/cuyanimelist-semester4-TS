import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user_email = req.nextUrl.searchParams.get("email");
  const anime_id = req.nextUrl.searchParams.get("id");

  try {
    if (anime_id) {
      const comments = await prisma.comment.findMany({
        where: {
          anime_id,
        },
      });

      if (comments) return NextResponse.json(comments);
    } else if (user_email) {
      const comments = await prisma.comment.findMany({
        where: {
          user_email,
        },
      });

      if (comments) return NextResponse.json(comments);
    } else {
      return NextResponse.json(
        { message: "Something went wrong, try again later" },
        { status: 500 }
      );
    }
  } catch (err) {
    return NextResponse.json({ err });
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      user_name,
      user_image,
      user_email,
      anime_id,
      comment_text,
      anime_name,
    } = await req.json();

    const createComment = await prisma.comment.create({
      data: {
        comment_text,
        anime_id,
        anime_name,
        user_email,
        user_image,
        user_name,
      },
    });

    if (createComment) {
      return NextResponse.json(
        { message: "Success", data: createComment },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "something wrong",
        },
        { status: 404 }
      );
    }
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
