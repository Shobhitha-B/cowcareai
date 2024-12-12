import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function NavLink({ to, icon, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}