import { Typography } from "@/components/typography";
import React, { Suspense } from "react";
import EmployeeListTable from "./data-table";

const EmployeeListPage = () => {
  return (
    <main className="container mx-auto section-padding w-full py-8 md:py-10">
      <Typography variant="Bold_H3" className="text-primary">
        Employee List
      </Typography>
      <div className="mt-6">
        <Suspense fallback={<div>Loading...</div>}>
          <EmployeeListTable />
        </Suspense>
      </div>
    </main>
  );
};

export default EmployeeListPage;
