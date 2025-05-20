import { Separator } from "@/components/ui/separator";
import React, { Suspense } from "react";
import PayslipTable from "./payslip-data-table";

const Page = () => {
  return (
    <main className="space-y-6">
      <div>
        <h3 className="font-medium text-lg">Payslip Generation Logs</h3>
        <p className="text-muted-foreground text-sm">
          Track and review all payslip generation activities, including auto and
          manual processes.
        </p>
      </div>
      <Separator />
      <Suspense fallback={<div>Loading...</div>}>
        <PayslipTable />
      </Suspense>
    </main>
  );
};

export default Page;
