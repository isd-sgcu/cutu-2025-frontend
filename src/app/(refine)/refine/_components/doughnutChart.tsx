/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DoughnutChart.tsx
'use client';
import { Doughnut } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

export const DoughnutChart = ({
  data,
  options,
}: {
  data: any;
  options: ChartOptions<'doughnut'>;
}) => {
  return <Doughnut data={data} options={options} />;
};