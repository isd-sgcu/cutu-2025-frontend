/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/page.tsx
'use client';
import { useTable } from '@refinedev/core';
import { useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import { User } from './libs/interface';
import { DashboardHeader } from '../refine/_components/header';
import { LineChart } from '../refine/_components/lineChart';
import { CheckInList } from '../refine/_components/checkInList';
import { processStats, chartOptions } from '../refine/libs/stat';
import { ScanLine, UserCheck } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

const CHECK_IN_PAGE_SIZE = 5;

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const Dashboard = () => {
  const [checkInPage, setCheckInPage] = useState(1);
  const { tableQuery } = useTable({
    resource: 'users',
  });
  const data = ((tableQuery?.data?.data as User[]) || []).filter(
    (user: User) => user.role === 'member',
  );
  const total = tableQuery?.data?.total || 0;

  const { dailyRegistrations, todaysCheckIns } = processStats(
    data as User[],
  );

  // Chart data preparations

  const lineData = {
    labels: Object.keys(dailyRegistrations)
      .sort()
      .map(date => dayjs(date).format('DD/MM')),
    datasets: [
      {
        label: 'ผู้ลงทะเบียน',
        data: Object.values(
          Object.fromEntries(
            Object.entries(dailyRegistrations).sort(([dateA], [dateB]) =>
              dateA.localeCompare(dateB),
            ),
          ),
        ),
        borderColor: '#DF729F',
        backgroundColor: '#E9B0CC',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-4">
      <DashboardHeader total={total}>
        <Link
          href="/refine/dashboard"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          <span className="text-sm">ดูข้อมูลทั้งหมด</span>
        </Link>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <UserCheck className="h-6 w-6 text-pink-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              แนวโน้มการลงทะเบียนรายวัน
            </h2>
          </div>
          <div className="h-64">
            <LineChart
              data={lineData}
              options={{
                ...chartOptions,
                scales: {
                  x: {
                    grid: { display: false },
                    ticks: { color: '#6b7280' },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value: any) => `${value} คน`,
                      stepSize: 1,
                      color: '#6b7280',
                    },
                    grid: { color: '#f3f4f6' },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <Users className="h-6 w-6 text-pink-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              สถิติตามสถานะ
            </h2>
          </div>
          <div className="h-64">
            <DoughnutChart
              data={doughnutData}
              options={{
                ...chartOptions,
                cutout: '65%',
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    ...chartOptions.plugins.legend,
                    labels: {
                      ...chartOptions.plugins.legend.labels,
                      color: '#6b7280',
                    },
                  },
                },
              }}
            />
          </div>
        </div> */}
      </div> 

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <ScanLine className="h-6 w-6 text-pink-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            สถานการณ์วันนี้
          </h2>
        </div>
        <CheckInList
          checkIns={todaysCheckIns}
          page={checkInPage}
          pageSize={CHECK_IN_PAGE_SIZE}
          setPage={setCheckInPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
