import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import Collection from "../Collection";

const TabsUser = async () => {
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
            <span>This comment tabs</span>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabsUser;
