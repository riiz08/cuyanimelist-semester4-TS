export const getCommentsResponseByEmail = async (email: string | null) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_USER}/comment?email=${email}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();

  return data;
};

export const getCommentsResponseById = async (id: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_USER}/comment?id=${id}`
  );
  const data = await response.json();

  return data;
};

export const getCommentsResponse = async (id: any, email: any) => {
  if (id.length > 1) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_USER}/comment?id=${id}`
    );
    const data = await response.json();

    return data;
  } else {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_USER}/comment?email=${email}`
    );
    const data = await response.json();

    return data;
  }
};
