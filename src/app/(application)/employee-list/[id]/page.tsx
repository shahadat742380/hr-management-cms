"use client";

import React, { Suspense, useState } from "react";
import SalaryDetailsTable from "./salary-details-data-table";
import { Typography } from "@/components/typography";
import { IcoHome } from "@/assets/icons";
import { ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AttachmentDetails from "./attendance-details-data-table";

const EmployeePage = () => {
  const [activeTab, setActiveTab] = useState("attendance");
  return (
    <main className="container mx-auto section-padding w-full py-8 md:py-10">
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IcoHome />
              <ChevronRight className="text-muted-foreground" />
              <Typography variant="Regular_P" className="text-muted-foreground">
                Employee List
              </Typography>
              <ChevronRight className="text-primary" />
              <Typography variant="Medium_P" className="text-primary">
                Employee Name
              </Typography>
            </div>

            <TabsList className="h-12">
              <TabsTrigger
                value="attendance"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground !py-2"
              >
                Attendance Details
              </TabsTrigger>
              <TabsTrigger
                value="salary"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground !py-2"
              >
                Salary Slips Details
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="mt-4">
            <TabsContent value="attendance">
              <Suspense fallback={<div>Loading Attachment Details...</div>}>
                <AttachmentDetails />
              </Suspense>
            </TabsContent>
            <TabsContent value="salary">
              <Suspense fallback={<div>Loading Employee Table...</div>}>
                <SalaryDetailsTable />
              </Suspense>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
};

export default EmployeePage;
