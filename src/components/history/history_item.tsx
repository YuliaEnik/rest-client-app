'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { HistoryItemProps } from '@/types/types';

import { TableCell, TableRow } from '../ui/table';

export const HistoryItem: React.FC<HistoryItemProps> = ({ request }) => {
  const [type, setRequsetType] = useState('');
  const [decodedUrl, setDecodedUrl] = useState('');
  const [jsonData, setJsonData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const parts = request.restfulUrl.split('/');
    console.log(parts);
    const type = parts[2];
    const urlEncoded = parts[3];
    const jsonEncoded = parts[4]?.split('?')[0];

    const decodeUrl = atob(urlEncoded);
    if (jsonEncoded) {
      const decodedJson = atob(jsonEncoded);
      const parsedJsonData = JSON.parse(decodedJson);
      setJsonData(parsedJsonData);
    }

    setRequsetType(type);
    setDecodedUrl(decodeUrl);

    console.log(type, decodedUrl, jsonData);
  }, [decodedUrl, jsonData, request.restfulUrl]);

  return (
    <TableRow
      key={request.executedAt}
      className="grid grid-cols-[2fr_1fr_3fr] gap-2 hover:bg-amber-200 hover:cursor-pointer active:bg-primary-light"
      onClick={() => router.push('/restful')}
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
