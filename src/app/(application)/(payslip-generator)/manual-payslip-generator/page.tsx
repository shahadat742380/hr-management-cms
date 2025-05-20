import { Separator } from "@/components/ui/separator";
import React from "react";
import ManualPayslipGeneratorForm from "./manual-payslip-generator-form";

const Page = () => {
  return (
    <main className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="font-medium text-lg">Manual Payslip Generator</h3>
        <p className="text-muted-foreground text-sm">
          Manually generate payslips for selected employees, roles
        </p>
      </div>
      <Separator />
      <ManualPayslipGeneratorForm />
    </main>
  );
};

export default Page;
