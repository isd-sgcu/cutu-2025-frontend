import Protect from '@/components/protect';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Protect roles={['admin', 'staff']}>{children}</Protect>;
}
