export const postComment = async ({ email, anime_id, comment_text }: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_USER}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email, anime_id, comment_text),
      }
    );

    if (response.status === 200) {
      return response.json();
    } else return null;
  } catch (err) {
    return err;
  }
};
