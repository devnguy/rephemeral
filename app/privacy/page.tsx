import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { H1 } from "@/components/ui/typography";
import { SessionProvider } from "next-auth/react";

export default function Privacy() {
  return (
    <SessionProvider>
      <div className="px-4 md:px-16 pb-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="w-full">
            <Header />
            <div className="flex justify-center">
              <div className="w-[740px]">
                <div className="py-6">
                  <H1 className="text-left">Privacy Policy</H1>
                </div>
                {/* children */}
                <Card>
                  <CardContent>test</CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </SessionProvider>
  );
}
