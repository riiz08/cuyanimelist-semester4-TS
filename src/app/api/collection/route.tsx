import { authSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (email) {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });

      if (user) {
        const collection = await prisma.collection.findMany({
          where: {
            userId: user.id,
          },
          select: {
            anime_id: true,
            anime_image: true,
            anime_name: true,
          },
        });

        if (!collection) {
          return NextResponse.json(
            { message: "User dont have collection" },
            { status: 204 }
          );
        }

        return NextResponse.json({ collection });
      }

      if (!user)
        return NextResponse.json(
          { message: "user not found" },
          { status: 404 }
        );
    }

    if (!email)
      return NextResponse.json({ message: "email required" }, { status: 500 });
  } catch (e) {
    return NextResponse.json({ e });
  }
}

export async function POST(req: NextRequest) {
  const user = await authSession();
  const { anime_id, anime_name, anime_image }: any = await req.json();

  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.email!,
    },
    select: {
      id: true,
    },
  });

  if (!existingUser)
    return NextResponse.json({ message: "user not found" }, { status: 404 });

  try {
    const collectionUser = await prisma.collection.upsert({
      where: {
        userId_anime_id: {
          userId: existingUser.id,
          anime_id,
        },
      },
      update: {},
      create: {
        userId: existingUser.id,
        anime_id,
        anime_name,
        anime_image,
      },
    });

    return NextResponse.json(collectionUser);
  } catch (err) {
    return NextResponse.json(
      { message: "failed to add colecction" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("anime-id");

    if (!id) {
      return NextResponse.json({ message: "id required" }, { status: 500 });
    }

    if (id) {
      const collection = await prisma.collection.delete({
        where: {
          anime_id: Number(id),
        },
      });

      if (collection) {
        return NextResponse.json(
          { message: "success delete collection" },
          { status: 200 }
        );
      } else {
        return NextResponse.json({ message: "failed deleted collection" });
      }
    }
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
