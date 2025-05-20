/* eslint-disable react/no-unescaped-entities */
import { Separator } from "@/components/ui/separator";
import React from "react";
import AutoPayslipGeneratorForm from "./auto-payslip-generator-form";

const Page = () => {
  return (
    <main className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="font-medium text-lg">Auto Payslip Generator</h3>
        <p className="text-muted-foreground text-sm">
          Manage your organization's automated payslip generation and email
          settings.
        </p>
      </div>
      <Separator />
      <AutoPayslipGeneratorForm />
    </main>
  );
};

export default Page;
