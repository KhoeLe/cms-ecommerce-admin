"use client"

import { formatter } from "@/lib/utils";
import { Card, Title, BarChart, Subtitle, Flex, Metric, ProgressBar, Text } from "@tremor/react";

import React, { use, useEffect, useState } from 'react'


interface Props {
  data: any[]
};

export const TARGET_SALE = 2500;

function Overview({ data }: Props) {

  const [target, setTarget] = useState<number>(0);

  const calculateTotalSales = () => {
    const total = data.reduce((accumulator, item) => accumulator + item.total, 0);
    return total;
  }


  useEffect(() => {
    const targetPercentage = () => {
      let target = (calculateTotalSales() / TARGET_SALE) * 100

      return setTarget(Number(target.toFixed(2)))
    }

    targetPercentage()

  }, [data])


  const dataFormatter = (number: number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
  };

  return (
    <div className="space-y-4 ">
      <Card className="max-w-sm">
        <Text>Sales</Text>
        <Metric>{formatter.format(calculateTotalSales())}</Metric>
        <Flex className="mt-4">
          <Text>{target}% of annual target</Text>
          <Text>$ {TARGET_SALE}</Text>
        </Flex>
        <ProgressBar value={target} className="mt-2" />
      </Card>

      <Card>
        <Title>Sales Overview (2023)</Title>
        <Subtitle>
          Display an overview of sales data, including revenue, total orders, average order value, and top-selling products.
        </Subtitle>
        <BarChart
          className="mt-6"
          data={data}
          index="name"
          categories={["total"]}
          colors={["blue"]}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
        />
      </Card>
    </div>

  )
}

export default Overview
