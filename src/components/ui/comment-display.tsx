import {
  getCommentsResponseByEmail,
  getCommentsResponseById,
} from "@/services/getCommentsResponse";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";

type Props = {
  animeId?: number | null;
  email?: string | null;
};

const CommentDisplay = async (props: Props) => {
  const { animeId, email } = props;
  const comments = animeId
    ? await getCommentsResponseById(animeId)
    : await getCommentsResponseByEmail(String(email));

  return (
    <div className="px-4 flex gap-4 w-full flex-wrap">
      {comments.map((comment: any) => (
        <Card
          className="bg-white/20 backdrop-blur-sm max-w-sm mt-4"
          key={comment.id}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={comment.user_image} alt={comment.user_name} />
                <AvatarFallback>{comment.user_name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-bold text-sm">{comment.user_name}</h4>
                <p className="text-xs font-semibold">{comment.user_email}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs font-normal">{comment.comment_text}</p>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CommentDisplay;
