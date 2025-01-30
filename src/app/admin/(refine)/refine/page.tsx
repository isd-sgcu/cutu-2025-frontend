/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useTable } from '@refinedev/core';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  ScanLine,
  UserCheck,
  Users,
  Download,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import dayjs from 'dayjs';
import { useState } from 'react';
import Link from 'next/link';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
);

const CHECK_IN_PAGE_SIZE = 5;

const Dashboard = () => {
  const [checkInPage, setCheckInPage] = useState(1);
  const { tableQueryResult } = useTable({
    resource: 'users',
  });

  const data = tableQueryResult?.data?.data || [];
  const total = tableQueryResult?.data?.total || 0;

  // CSV Export Handler
  const handleExportCSV = () => {
    const csvContent = [
      'ID,Name,Email,Phone,University,Status,LastEntered',
      ...data.map(user =>
        [
          user.id,
          `"${user.name.replace(/"/g, '""')}"`,
          user.email,
          user.phone,
          `"${user.university}"`,
          user.status,
          dayjs(user.lastEntered).format('YYYY-MM-DD HH:mm'),
        ].join(','),
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `registrants.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Process statistics
  const processStats = () => {
    const today = dayjs().format('YYYY-MM-DD');

    const statusStatistics = {
      currentStudent: data.filter(u => u.status === 'chula_student').length,
      alumni: data.filter(u => u.status === 'alumni').length,
      generalPublic: data.filter(u => u.status === 'general_student').length,
      otherStudents: data.filter(
        u => !['chula_student', 'alumni', 'general_student'].includes(u.status),
      ).length,
    };

    const dailyRegistrations = data.reduce((acc, user) => {
      const date = dayjs(user.registeredAt).format('YYYY-MM-DD');
      if (date) acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const todaysCheckIns = data.filter(
      user => dayjs(user.lastEntered).format('YYYY-MM-DD') === today,
    );

    return { statusStatistics, dailyRegistrations, todaysCheckIns, today };
  };

  const { statusStatistics, dailyRegistrations, todaysCheckIns } =
    processStats();

  // Paginate today's check-ins
  const paginatedCheckIns = todaysCheckIns.slice(
    (checkInPage - 1) * CHECK_IN_PAGE_SIZE,
    checkInPage * CHECK_IN_PAGE_SIZE,
  );

  // Chart Data
  const doughnutData = {
    labels: ['นิสิตปัจจุบัน', 'ศิษย์เก่า', 'บุคคลทั่วไป', 'นักศึกษาอื่น'],
    datasets: [
      {
        label: 'จำนวนผู้ลงทะเบียน',
        data: Object.values(statusStatistics),
        backgroundColor: ['#708FCE', '#DF729F', '#9BCDEB', '#757575'],
        borderWidth: 0,
      },
    ],
  };

  const sortedEntries = Object.entries(dailyRegistrations).sort((a, b) =>
    a[0].localeCompare(b[0]),
  );
  const sortedData = Object.fromEntries(sortedEntries);

  const lineData = {
    labels: Object.keys(sortedData).map(date => dayjs(date).format('DD/MM')),
    datasets: [
      {
        label: 'ผู้ลงทะเบียน',
        data: Object.values(sortedData),
        borderColor: '#DF729F',
        backgroundColor: '#E9B0CC',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: { size: 14 },
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.dataset.label}: ${context.raw} คน`,
        },
      },
    },
  };

  return (
    <div className="min-h-screen space-y-6 bg-mid-gray p-4">
      {/* Header Section */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-dark-blue md:text-3xl">
              แดชบอร์ดลงทะเบียน
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <Users className="h-5 w-5 text-dark-pink" />
              <span className="text-sm text-dark-gray md:text-base">
                ผู้ลงทะเบียนทั้งหมด:{' '}
                <strong className="text-dark-blue">{total}</strong> คน
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/refine/dashboard"
              className="flex h-12 items-center gap-2 rounded-full bg-mid-blue px-5 text-white transition hover:bg-mid-blue/90"
            >
              <span className="text-sm">ดูข้อมูลทั้งหมด</span>
            </Link>
            <button
              onClick={handleExportCSV}
              className="flex h-12 items-center gap-2 rounded-full bg-dark-pink px-5 text-white transition hover:bg-dark-pink/90"
            >
              <Download className="h-5 w-5" />
              <span className="text-sm">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Daily Registration Trend */}
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-dark-pink" />
            <h2 className="text-xl font-semibold text-dark-blue">
              แนวโน้มการลงทะเบียนรายวัน
            </h2>
          </div>
          <div className="h-64">
            <Line
              data={lineData}
              options={{
                ...chartOptions,
                scales: {
                  x: { grid: { display: false } },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value: any) => `${value} คน`,
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Status Distribution */}
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-dark-pink" />
            <h2 className="text-xl font-semibold text-dark-blue">
              สถิติตามสถานะ
            </h2>
          </div>
          <div className="h-64">
            <Doughnut data={doughnutData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Today's Check-ins */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <ScanLine className="h-6 w-6 text-dark-pink" />
          <h2 className="text-xl font-semibold text-dark-blue">
            สถานการณ์วันนี้
          </h2>
        </div>

        <div className="mb-6 rounded-xl bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-base text-dark-blue">
              เช็คอินวันนี้: {todaysCheckIns.length} คน
            </span>
          </div>

          {/* List with better contrast */}
          <ul className="mt-4 space-y-3">
            {paginatedCheckIns.map(user => (
              <li
                key={user.id}
                className="flex items-center justify-between rounded-lg bg-gray-200 p-3"
              >
                <div className="text-sm font-medium text-dark-gray">
                  {user.name}
                </div>
                <div className="text-xs font-semibold text-dark-pink">
                  {dayjs(user.lastEntered).format('HH:mm')}
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination (keeping previous improvements) */}
          {todaysCheckIns.length > CHECK_IN_PAGE_SIZE && (
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-dark-gray">
                หน้า {checkInPage} จาก{' '}
                {Math.ceil(todaysCheckIns.length / CHECK_IN_PAGE_SIZE)}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCheckInPage(p => Math.max(1, p - 1))}
                  disabled={checkInPage === 1}
                  className="rounded-lg border border-gray-200 bg-white p-2 text-dark-pink transition hover:bg-gray-50 disabled:border-gray-100 disabled:bg-gray-100 disabled:text-dark-pink/50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCheckInPage(p => p + 1)}
                  disabled={
                    checkInPage >=
                    Math.ceil(todaysCheckIns.length / CHECK_IN_PAGE_SIZE)
                  }
                  className="rounded-lg border border-gray-200 bg-white p-2 text-dark-pink transition hover:bg-gray-50 disabled:border-gray-100 disabled:bg-gray-100 disabled:text-dark-pink/50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
