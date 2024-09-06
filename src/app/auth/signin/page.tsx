import FormSignIn from "@/components/form/form-sigin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <main>
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-80 bg-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-bold text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <FormSignIn />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
