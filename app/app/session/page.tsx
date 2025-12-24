import DrawingSession from "@/components/drawing-session";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // const cursor = (await searchParams).cursor;
  return <DrawingSession />;
}
