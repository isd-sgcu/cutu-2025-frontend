/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/stats.ts
import dayjs from 'dayjs';
import { User } from '../libs/interface';

export const processStats = (data: User[]) => {
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
  }, {} as Record<string, number>);

  const todaysCheckIns = data.filter(
    user => dayjs(user.lastEntered).format('YYYY-MM-DD') === today,
  );

  return { statusStatistics, dailyRegistrations, todaysCheckIns };
};

export const chartOptions = {
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
        label: (context: any) => `${context.dataset.label}: ${context.raw} คน`,
      },
    },
  },
};