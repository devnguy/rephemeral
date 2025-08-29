import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-dvh">
      <Link href="app/session">
        <Button size="lg">Start</Button>
      </Link>
    </div>
  );
}
