import { ReactNode } from 'react';

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="w-1/4 p-4 bg-gray-100 h-screen overflow-y-auto">
      {children}
    </aside>
  );
}
