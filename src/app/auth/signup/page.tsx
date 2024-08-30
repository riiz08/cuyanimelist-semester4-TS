import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormSignUp from "@/components/ui/formsignup";
import Image from "next/image";

export default function Page() {
  return (
    <main>
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-80 bg-white/20 backdrop-blur-sm rounded-tr-none rounded-br-none">
          <CardHeader>
            <CardTitle className="font-bold text-center">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <FormSignUp />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
