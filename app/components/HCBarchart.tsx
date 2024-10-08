"use client";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { BarChartData } from "../common/constants";
interface HCBarchart {
  prefix: string;
}

const chartConfig = {
  budgetedHC: {
    label: "Budgeted HC",
    color: "#2563eb",
  },
  actualHC: {
    label: "Actaul HC",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const HCBarchart = ({ prefix }: HCBarchart) => {
  const [chartData, setChartData] = useState([] as BarChartData[]);
  useEffect(() => {
    const fetchData = async () => {
      const req = new Request(`/api/roster?range=Sheet5!C4:E32`);
      await fetch(req, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const data = res.data.values;
          const chartData = data.map((r: string[]) => ({
            baseProject: r[0],
            budgetedHC: Number(r[1]),
            actualHC: Number(r[2]),
          })).filter((o:BarChartData)=>(o.baseProject||'').startsWith(prefix));
          setChartData(chartData.slice(0, 15));
          return res.data.values;
        });
    };
    fetchData();
  }, [prefix]);
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="baseProject"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <YAxis />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="budgetedHC"
          fill="var(--color-budgetedHC)"
          radius={4}
          label={{ position: "top" }}
        />
        <Bar
          dataKey="actualHC"
          fill="var(--color-actualHC)"
          radius={4}
          label={{ position: "top" }}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default HCBarchart;
