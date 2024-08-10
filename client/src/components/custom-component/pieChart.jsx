import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Text } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { browser: "Water Bottles", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "Sanitary Napkins", visitors: 200, fill: "var(--color-safari)" },
    { browser: "Blankets", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "Tents", visitors: 173, fill: "var(--color-edge)" },
    { browser: "Masks", visitors: 190, fill: "var(--color-other)" },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Water Bottles",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Sanitary Napkins",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Blankets",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Tents",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Masks",
        color: "hsl(var(--chart-5))",
    },
}

export function Component({ goodsTitle }) {
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    return (
        <Card className="flex flex-row justify-end items-center h-full w-[300px] gap-x-0 px-0 ">
            <CardHeader className="items-center pb-0  ">
                <CardTitle>{goodsTitle}</CardTitle>
                <CardDescription>March - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 px-0 ml-0  w-[100px]">
                <ChartContainer
                    config={chartConfig}
                    className="px-0 mx-auto aspect-square max-h-[200px] " 
                >
                    <PieChart height={50} width={50}  > 
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            height={100}
                            width={100}
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={40}
                            outerRadius={55}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-2xl font-bold " // Adjusted font size
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 20} // Adjusted y-position
                                                    className="fill-muted-foreground"
                                                >
                                                    Goods
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />

                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
