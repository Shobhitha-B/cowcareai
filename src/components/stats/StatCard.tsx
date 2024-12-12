import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  bgColor: string;
  textColor: string;
}

export function StatCard({ title, value, bgColor, textColor }: StatCardProps) {
  return (
    <div className={`${bgColor} p-4 rounded-lg`}>
      <h3 className={`text-lg font-medium ${textColor}`}>{title}</h3>
      <p className={`text-3xl font-bold ${textColor.replace('-800', '-600')}`}>
        {value}
      </p>
    </div>
  );
}