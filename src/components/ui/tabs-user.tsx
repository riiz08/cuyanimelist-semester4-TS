import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const TabsUser = () => {
  return (
    <Tabs
      defaultValue="collection"
      className="w-full justify-center items-center"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="collection">Collection</TabsTrigger>
        <TabsTrigger value="comment">Comment</TabsTrigger>
        <TabsTrigger value="post">Post</TabsTrigger>
      </TabsList>
      <TabsContent value="collection">
        <Card className="bg-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <span>This collection tabs</span>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="comment">
        <Card className="bg-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Comment</CardTitle>
          </CardHeader>
          <CardContent>
            <span>This comment tabs</span>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="post">
        <Card className="bg-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Post</CardTitle>
          </CardHeader>
          <CardContent>
            <span>This post tabs</span>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabsUser;
