"use client";

// ** import third party packages
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

// ** import components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 900 },
  { month: "April", desktop: 873 },
  { month: "May", desktop: 1000 },
  { month: "June", desktop: 614 },
  { month: "July", desktop: 245 },
  { month: "August", desktop: 321 },
  { month: "September", desktop: 464 },
  { month: "October", desktop: 798 },
  { month: "November", desktop: 275 },
  { month: "December", desktop: 329 },
];

const chartConfig = {
  desktop: {
    label: "Transcriptions",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BarCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-normal">Salary Distribution Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[440px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-chart-1)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
