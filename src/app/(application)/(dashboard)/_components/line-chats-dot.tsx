"use client";

// ** import third party packages
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

// ** import components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// ** Chart data
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 245, mobile: 160 },
  { month: "August", desktop: 321, mobile: 210 },
  { month: "September", desktop: 264, mobile: 180 },
  { month: "October", desktop: 198, mobile: 150 },
  { month: "November", desktop: 275, mobile: 170 },
  { month: "December", desktop: 329, mobile: 220 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function LineChartDots() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-normal">
            Document analysis
          </CardTitle>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-white w-40 hover:bg-white/80 justify-between"
              >
                {format(new Date(), "dd MMM yyyy")}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={new Date()}
                onSelect={() => {}}
                initialFocus
                
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent className="h-[440px] w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 20,
              bottom: 20,
            }}
            height={200}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-chart-1)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-chart-1)",
              }}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              dataKey="mobile"
              type="natural"
              stroke="var(--color-chart-2)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-chart-2)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
