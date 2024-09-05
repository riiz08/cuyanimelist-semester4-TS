import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import Collection from "../Collection";
import CommentDisplay from "./comment-display";

type Props = {
  email: string;
};

const TabsUser = (props: Props) => {
  return (
    <Tabs defaultValue="collection" className="w-full justify-center">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="collection">Collection</TabsTrigger>
        <TabsTrigger value="comment">Comment</TabsTrigger>
      </TabsList>
      <TabsContent value="collection">
        <Card className="bg-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle>My Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <Collection />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="comment">
        <Card className="bg-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Comment</CardTitle>
          </CardHeader>
          <CardContent>
            <CommentDisplay email={props.email} dashboard={true} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabsUser;
