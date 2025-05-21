// ** imports core packages
import { Suspense } from "react";

// ** imports components
import { DateRangePicker } from "@/components/date-range-picker";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import InfoSection from "./_components/info-section";
import ChartsSection from "./_components/charts-section";

const DashboardPage = () => {
  return (
    <main className="container mx-auto section-padding w-full py-8 md:py-10">
      {/* Header */}
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="Bold_H3" className=" text-primary">
              Dashboard
            </Typography>
          </div>
          <div className="flex items-center gap-4">
            <DateRangePicker triggerClassName="w-60" />
            <Button>Download Report</Button>
          </div>
        </div>
      </Suspense>

      {/* Info Section */}
      <InfoSection />

      {/* Chart Section */}
      <ChartsSection />
    </main>
  );
};

export default DashboardPage;
