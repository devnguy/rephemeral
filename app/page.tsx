import { cookies } from "next/headers";
import { auth } from "@/auth";
import PageLayout from "@/components/layout/page-layout";
import { SessionConfig } from "@/components/session-config";
import { H1 } from "@/components/ui/typography";
import { getBoards } from "@/lib/api/pinterest/queries";

export default async function Page() {
  const boardsPromise = getBoards();
  const sessionPromise = auth();
  const cookie = await cookies()
  const maybeSavedFormData = cookie.get("savedFormData")
  const savedFormData = maybeSavedFormData ? JSON.parse(maybeSavedFormData.value) : undefined

  return (
    <PageLayout>
      <div className="py-6">
        <H1 className="text-left">Drawing Session</H1>
      </div>
      <SessionConfig
        boardsPromise={boardsPromise}
        sessionPromise={sessionPromise}
        savedFormData={savedFormData}
      />
    </PageLayout>
  );
}
