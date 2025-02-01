// components/ExportButton.tsx
'use client';
import { Download } from 'lucide-react';
import { FieldEntry, User } from '../../libs/interface';
import dayjs from 'dayjs';

export const ExportButton = ({ data }: { data: User[] }) => {
  // Define fields to export (all User fields except imageUrl)
  const fieldEntries: FieldEntry[] = [
    { label: 'ID', field: 'id' },
    { label: 'UID', field: 'uid' },
    { label: 'Name', field: 'name' },
    { label: 'Email', field: 'email' },
    { label: 'Phone', field: 'phone' },
    { label: 'University', field: 'university' },
    { label: 'Size Jersey', field: 'sizeJersey' },
    { label: 'Food Limitation', field: 'foodLimitation' },
    { label: 'Invitation Code', field: 'invitationCode' },
    { label: 'Age', field: 'age' },
    { label: 'Chronic Disease', field: 'chronicDisease' },
    { label: 'Drug Allergy', field: 'drugAllergy' },
    { label: 'Status', field: 'status' },
    { label: 'Graduated Year', field: 'graduatedYear' },
    { label: 'Faculty', field: 'faculty' },
    { label: 'Last Entered', field: 'lastEntered' },
    { label: 'Registered At', field: 'registeredAt' },
    { label: 'Role', field: 'role' },
    { label: 'Education', field: 'education' },
  ];

  const handleExportCSV = () => {
    const headers = fieldEntries.map(f => f.label).join(',');
    
    const csvContent = [
      headers,
      ...data.map(user => 
        fieldEntries.map(({ field }) => {
          const value = user[field];
          // Handle date fields
          if (field === 'lastEntered' || field === 'registeredAt') {
            return dayjs(value).isValid() 
              ? dayjs(value).format('YYYY-MM-DD HH:mm')
              : '';
          }
          // Escape quotes in string fields
          return typeof value === 'string' 
            ? `"${value.replace(/"/g, '""')}"` 
            : value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `users_export_${dayjs().format('YYYYMMDD_HHmmss')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExportCSV}
      className="flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-white transition-colors hover:bg-pink-700"
    >
      <Download className="h-5 w-5" />
      <span className="text-sm">Export</span>
    </button>
  );
}