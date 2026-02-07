import PageLayout from "@/components/layout/page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { H1 } from "@/components/ui/typography";
import Link from "next/link";

export default function Privacy() {
  return (
    <PageLayout>
      <div className="py-6">
        <H1 className="text-left">Privacy Policy</H1>
      </div>
      <Card>
        <CardContent className="space-y-3 ">
          <p className="text-base">
            Rephemeral has no database. No personally identifiable information
            (PII) is collected. The app merely displays images hosted on
            Pinterest by utilizing the image&apos;s public Pinterest image url.
            Local images you use are not stored or saved.
          </p>
          <p>
            Cookies are used to keep your Pinterest account connected, and to
            persist your drawing session settings. No PII are stored in cookies.
          </p>
          <p>
            Vercel Analytics is used to measure site traffic, and report metrics
            on how the app is used so that changes made to the app can be
            informed by user activity. You can learn more about Vercel Analytics{" "}
            <Link
              href="https://vercel.com/docs/analytics/privacy-policy"
              target="_blank"
              className="hover:underline"
            >
              here
            </Link>
            . If you wish to do so, you can block analytics with an ad blocker.
          </p>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
