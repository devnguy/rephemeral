import { Header, Nav } from "@/components/header";
import { SessionConfig } from "@/components/session-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBoards } from "@/lib/api/pinterest/queries";

export default async function Page() {
  const boardsPromise = getBoards();

  // fake data so you don't use up all your requests
  // const boardsData = await Promise.resolve(fakeBoardsData);

  // console.log({ boardsData });

  return (
    <div className="w-full">
      <Header />
      <div className="flex justify-center">
        <div className="pt-6 w-[640px]">
          <Card>
            <CardHeader>
              <CardTitle>Drawing Session</CardTitle>
            </CardHeader>
            <CardContent>
              <SessionConfig boardsPromise={boardsPromise} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
