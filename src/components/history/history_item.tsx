'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { HistoryItemProps } from '@/types/types';

import { TableCell, TableRow } from '../ui/table';

export const HistoryItem: React.FC<HistoryItemProps> = ({ request }) => {
  const [type, setRequsetType] = useState('');
  const router = useRouter();

  useEffect(() => {
    const parts = request.restfulUrl.split('/');
    const type = parts[2];
    setRequsetType(type);
  }, [request.restfulUrl]);

  return (
    <TableRow
      data-testid="link-button"
      key={request.executedAt}
      className="grid grid-cols-[2fr_1fr_3fr] gap-2 hover:bg-amber-200 hover:cursor-pointer active:bg-lime-200"
      onClick={() => router.push(`${request.restfulUrl}`)}
    >
      <TableCell className="flex items-center justify-center">
        {`${new Date(request.executedAt).toDateString()} ${new Date(request.executedAt).toLocaleTimeString()}`}
      </TableCell>
      <TableCell className="flex items-center justify-center">{type}</TableCell>
      <TableCell className="flex items-center justify-end">
        {request.apiUrl}
      </TableCell>
    </TableRow>
  );
};
