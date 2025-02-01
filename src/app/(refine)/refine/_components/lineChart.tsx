/* eslint-disable @typescript-eslint/no-explicit-any */
// components/LineChart.tsx
'use client';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

export const LineChart = ({
  data,
  options,
}: {
  data: any;
  options: ChartOptions<'line'>;
}) => {
  return <Line data={data} options={options} />;
};