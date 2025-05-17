// ** import core packages
import React from "react";

// ** import components
import { BarCharts } from "./bar-charts";
import { LineChartDots } from "./line-chats-dot";
import { RadialCharts } from "./radial-charts";

const ChartsSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <BarCharts />
        </div>
        <div className="lg:col-span-2">
          <RadialCharts />
        </div>
      </div>
      <div className="pt-6">
        <LineChartDots />
      </div>
    </section>
  );
};

export default ChartsSection;
