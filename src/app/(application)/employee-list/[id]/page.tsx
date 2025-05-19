import { Typography } from "@/components/typography";
import React, { Suspense } from "react";
import EmployeeTable from "./data-table";
import { IcoHome } from "@/assets/icons";
import { ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EmployeePage = () => {
  return (
    <main className="container mx-auto section-padding w-full py-8 md:py-10">
      <div>
        <Tabs defaultValue="attendance" className="w-full">
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
              <Suspense fallback={<div>Loading...</div>}>
                <EmployeeTable />
              </Suspense>
            </TabsContent>
            <TabsContent value="salary">
              <Suspense fallback={<div>Loading...</div>}>
                <EmployeeTable />
              </Suspense>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
};

export default EmployeePage;
